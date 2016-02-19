
$(window).load(function () {
    
    $(document).ready(function () {
        
        var the_data = [
            {'Country':'England', 'display':'visible', 'values':[
                {x : 1300, y: 23},
                {x : 1550, y: 7},
                {x : 1625, y: 6},
                {x : 1675, y: 4},
                {x : 1725, y: 2},
                {x : 1775, y: 1},
                {x : 1812, y: 2},
                {x : 1837, y: 1.7},
                {x : 1862, y: 1.6},
                {x : 1887, y: 0.8},
                {x : 1912, y: 0.8},
                {x : 1937, y: 0.8},
                {x : 1962, y: 0.7},
                {x : 1984, y: 1.2},
                {x : 2010, y: 1.2},
            ]},
            {'Country':'Average Non-State', 'display':'hidden', 'values':[{x:1250, y:518}, {x:1250, y:518}]}
        ]
        
        //When the window resizes, resize the graph
        $( window ).resize(function() {
            line_graph.resize();
        });
        $('#change_graph').click(function(){
            alert ('a')
        });
        $(document).on("click", '.legend_span', function() {
            alert('b '+$(this).attr('data_index'));
            line_graph.update_data($(this).attr('data_index'));
        })
        
        //Init the graph
        var line_graph = new line_graph_class(the_data, 'graph');
        line_graph.draw();
    });
});

function remove_class(object, class_to_remove){
    var current = object.attr('class');
    var new_classes = current.replace(class_to_remove, "");
    object.attr('class', new_classes);
}
function add_class(object, class_to_add){
    var current = object.attr('class').trim();
    var new_classes = current + ' ' + class_to_add;
    object.attr('class', new_classes);
}

function line_graph_class(the_data, graph_container_id){
    /*Class for the line graph*/
    
    var self = this;
    self.margin = {};
    self.current_data = 'linear';
    self.data = the_data;
    self.graph_container_id = graph_container_id

    self.update_data = function(update_index){
        /*Updates the graph to only display data that has display set to true*/
            
            var display_change = self.data[update_index]['display']
            if (display_change == 'hidden') {
                display_change = 'visible';
                remove_class($('#circle_id'+update_index), 'visibility_hidden');
                add_class($('#circle_id'+update_index), 'visibility_visible');
            }
            else{
                display_change = 'hidden';
                add_class($('#circle_id'+update_index), 'visibility_hidden');
                remove_class($('#circle_id'+update_index), 'visibility_visible');
            }
            self.data[update_index]['display'] = display_change;
            
            self.yRange.domain([
                0.1,
                d3.max(self.data, function(d) {return self.find_max_y(d)})
            ]);
            
            self.y_axis.transition().call(self.yAxis);
            
            //Update the actual lines
            i = 0;
            self.lines.forEach(function(line) {
                line
                    .transition()
                    .attr("d", self.homocide_line_function(self.data[i].values))
                    .attr('visibility', self.data[i].display);
                i++;
            });
            
            //Update the points
            self.svg.selectAll("circle")
                .transition()
                .attr("cx", function(d) {
                    return self.xRange(d.x);
                })
                .attr("cy", function(d) {
                    return self.yRange(d.y);
                })
            
            //Update the points complete HACK
            self.points_lists[update_index][0].forEach(function(point){
                $(point)
                    .attr('visibility', display_change);
            });
    }
    
    self.resize = function(){
        /*Resizes the graph due to a window size change*/
        
        //Get the new graph dimensions
        self.set_graph_dimensions();
        
        //Update the svg dimensions
        self.svg
            .attr("width", self.width + self.margin.left + self.margin.right)
            .attr("height", self.height + self.margin.top + self.margin.bottom);
        self.svg_g
            .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");
        
        //Rescale the range and axis functions to account for the new dimensions
        self.xRange
            .range([0, self.width]);
        self.xAxis
            .scale(self.xRange);
        self.yRange
            .range([self.height, 0]);
        self.yAxis
            .scale(self.yRange);
        
        //resize the x-axis
        self.x_axis
            .attr("transform", "translate(0," + self.height + ")")
            .call(self.xAxis);
        
        //resize the y-axis
        self.y_axis
            .call(self.yAxis);
        
        //Update the position of the y axis label
        //self.y_axis_label
        //    .attr("y", 0 - self.margin.left)
        //    .attr("x",0 - (self.height / 2))
        
        //Update the actual lines
        i = 0;
        self.lines.forEach(function(line) {
            line.attr("d", self.homocide_line_function(self.data[i].values));
            i++;
        });
        
        //Update the points
        self.svg.selectAll("circle")
            .attr("cx", function(d) {
                return self.xRange(d.x);
            })
            .attr("cy", function(d) {
                return self.yRange(d.y);
            })
    
    }//end resize
    
    self.draw = function(){
        /*Draws the graph according to the size of the graph element*/
        
        //Get the graph dimensions
        self.set_graph_dimensions();
        
        //Create Graph SVG
        self.svg = d3.select('#'+self.graph_container_id)
            .append("svg")
                .attr("width", self.width + self.margin.left + self.margin.right)
                .attr("height", self.height + self.margin.top + self.margin.bottom);
        
        //Add a layer to the svg
        self.svg_g = self.svg.append("g")
            .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");
                    
        self.xRange = d3.scale.linear()
            .range([0, self.width]);
          
        self.yRange = d3.scale.log().nice()
            .range([self.height, 0]);
        
        self.xAxis = d3.svg.axis()
            .scale(self.xRange)
            .tickFormat(d3.format("d"))
            .orient("bottom");
          
        self.yAxis = d3.svg.axis()
            .scale(self.yRange)
            .tickFormat(function (d) {
                return self.yRange.tickFormat(4,d3.format(",d"))(d)
            })
            .orient('left');
        
        self.xRange.domain([
            1200,
            2020
        ]);
        
        self.yRange.domain([
            0.1,
            d3.max(self.data, function(d) {return self.find_max_y(d)})
        ]);
        
        /*Add axis elements*/
        //add the x-axis
        self.x_axis = self.svg_g.append('svg:g')
            .attr("class", "x axis")
            .attr("transform", "translate(0," + self.height + ")");
        self.x_axis.call(self.xAxis);
        
        //Add the demand y-axis
        self.y_axis = self.svg_g.append('g')
            .attr("class", "y axis")
        self.y_axis.call(self.yAxis);
    
        /*Create the line function.*/
        self.homocide_line_function = d3.svg.line()
            .x(function(d) { return self.xRange(d.x); })
            .y(function(d) { return self.yRange(d.y); });
        
        /*Create the path and points*/
        self.lines = [];
        self.points_lists = [];
        self.data.forEach(function(country) {
            
            var new_line = self.svg_g.append('svg:path')
                .attr("class", "line "+country.Country.replace(" ","_"))
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('visibility', country.display)
                .attr("d", self.homocide_line_function(country.values));
            self.lines.push(new_line);
            
            var new_points = self.svg_g.selectAll(".point")
                .data(country.values)
                .enter().append("circle")
                    .attr("class", "dot "+country.Country.replace(" ","_"))
                    .attr('visibility', country.display)
                    .attr("r", 3.5)
                    .attr("cx", function(d) { return self.xRange(d.x); })
                    .attr("cy", function(d) { return self.yRange(d.y); });
            self.points_lists.push(new_points)
    
        });
        
        //Create Graph legend
        x = $('#'+self.graph_container_id).prepend('<div class="row legend_row" id=legend_row_'+self.graph_container_id+'></div><div class="row"><div class="col-xs-6" style="height:100px;">&nbsp</div></div>')
        self.legend_row = $('#legend_row_'+self.graph_container_id);
        var i = 0;
        self.data.forEach(function(datum){
           self.legend_row.prepend('<div class="col-xs-6 col-sm-3 col-md-2 pull-right"><button class="legend_span" data_index='+i+' id=legend_id'+i+'><svg width="12" height="10"><circle id=circle_id'+i+' class="legend dot visibility_'+datum.display+' '+datum.Country.replace(" ","_")+'" r="3.5" cx="4" cy="5"></circle></svg>'+datum.Country+'</button></div>'); 
            i++;
        });
        
    }//End draw graph
    
    /* Reusable functions********************/
    self.find_max_y = function(d){
        /*Returns the max y value*/
        var max = 0
        if (d.display == 'visible') {
            max = d3.max(d.values, function(v) { return v.y; });
        }
        if (max > 500) {
            max = 1000;
        }
        return max;
    }
    
    self.set_graph_dimensions = function(){
        /*Resets the higheth width and margins based on the column width*/
        var graph_container_width = $('#'+self.graph_container_id).width();
        var left_margin = function(){
            if (graph_container_width < 400){
                return 45;
            }
            else{
                return 50;
            }
        }
        self.margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: left_margin()
        };
        self.width = graph_container_width - self.margin.right - self.margin.left;
        self.height = 250 - self.margin.top - self.margin.bottom;
    }
}
