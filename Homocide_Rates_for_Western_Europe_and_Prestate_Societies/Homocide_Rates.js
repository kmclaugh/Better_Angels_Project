
$(window).load(function () {
    
    $(document).ready(function () {
        
        var the_data = [
            {'Country':'Scandinavia', 'name':'scandinavia', 'display':'hidden', 'values':[
                {x : 1300, y: 42},
                {x : 1450, y: 46},
                {x : 1550, y: 21},
                {x : 1625, y: 24},
                {x : 1675, y: 12},
                {x : 1725, y: 3},
                {x : 1775, y: 0.7},
                {x : 1812, y: 1},
                {x : 1837, y: 1.4},
                {x : 1862, y: 1.2},
                {x : 1887, y: 0.9},
                {x : 1912, y: 0.8},
                {x : 1937, y: 0.6},
                {x : 1962, y: 0.6},
                {x : 1984, y: 1.2},
                {x : 2010, y: 1.2}
            ]},
            {'Country':'Netherlands and Belgium',  'name':'netherlands_and_belgium', 'display':'hidden', 'values':[
                {x : 1300, y: 47},
                {x : 1450, y: 45},
                {x : 1550, y: 25},
                {x : 1625, y: 6},
                {x : 1675, y: 9},
                {x : 1725, y: 7},
                {x : 1775, y: 4},
                {x : 1812, y: 2},
                {x : 1837, y: 5},
                {x : 1862, y: 0.9},
                {x : 1887, y: 1.5},
                {x : 1912, y: 1.7},
                {x : 1937, y: 1.3},
                {x : 1962, y: 0.6},
                {x : 1984, y: 1.2},
                {x : 2010, y: 1.1}
            ]},
            {'Country':'England',  'name':'england', 'display':'hidden', 'values':[
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
            {'Country':'Germany and Switzerland', 'name':'germany_and_switzerland', 'display':'hidden', 'values':[
                {x : 1300, y: 37},
                {x : 1450, y: 16},
                {x : 1550, y: 11},
                {x : 1625, y: 11},
                {x : 1675, y: 3},
                {x : 1725, y: 7},
                {x : 1775, y: 8},
                {x : 1812, y: 3},
                {x : 1837, y: 4},
                {x : 1862, y: 2},
                {x : 1887, y: 2.2},
                {x : 1912, y: 2},
                {x : 1937, y: 1.4},
                {x : 1962, y: 0.9},
                {x : 1984, y: 1.2},
                {x : 2010, y: 0.8}
            ]},
            {'Country':'Italy', 'name':'italy', 'display':'hidden', 'values':[
                {x : 1300, y: 56},
                {x : 1450, y: 73},
                {x : 1550, y: 47},
                {x : 1625, y: 32},
                {x : 1675, y: 29},
                {x : 1725, y: 12},
                {x : 1775, y: 9},
                {x : 1812, y: 18},
                {x : 1837, y: 15},
                {x : 1862, y: 12},
                {x : 1887, y: 5.5},
                {x : 1912, y: 3.9},
                {x : 1937, y: 2.6},
                {x : 1962, y: 1.3},
                {x : 1984, y: 1.7},
                {x : 2010, y: 0.9}
            ]},
            {'Country':'Semai', 'name':'semai', 'display':'hidden', 'values':[{x:1250, y:30}]},
            {'Country':'Inuit', 'name':'inuit', 'display':'hidden', 'values':[{x:1250, y:100}]},
            {'Country':'!Kung', 'name':'kung', 'display':'hidden', 'values':[{x:1250, y:42}]},
            {'Country':'Average Non-State<sup>1</sup>', 'name':'average_non_state', 'display':'visible', 'values':[{x:1250, y:518}]},
            {'Country':'European Average<sup>2</sup>', 'name':'european_averages', 'display':'visible', 'values':[
                {x : 1300, y: 41},
                {x : 1450, y: 38.4},
                {x : 1550, y: 22.2},
                {x : 1625, y: 15.8},
                {x : 1675, y: 11.4},
                {x : 1725, y: 6.2},
                {x : 1775, y: 4.5},
                {x : 1812, y: 5.2},
                {x : 1837, y: 5.4},
                {x : 1862, y: 3.5},
                {x : 1887, y: 2.2},
                {x : 1912, y: 1.8},
                {x : 1937, y: 1.3},
                {x : 1962, y: .8},
                {x : 1984, y: 1.3},
                {x : 2010, y: 1},
            ]}
        ]
        
        //When the window resizes, resize the graph
        $( window ).resize(function() {
            line_graph.resize();
        });
        $(document).on("click", '.legend_button', function() {
            line_graph.update_data($(this).attr('data_index'));
        })
        
        //Init the graph
        var graph_source_code = 'https://github.com/kmclaugh/Better_Angels_Project/blob/master/Worst_Atrocities_Bar_Graph.js';
        var graph_note = '<sup>1</sup>Nonstate Average is a geometric mean of 26 societies, not including Semai, Inuit, and !Kung</br>';
        graph_note += '<sup>2</sup>European Average is a geometric mean of five regions with missing data interpolated.';
        var data_source = '<p>European Data: Figure 2 in Eisner (2003) – Long-Term Historical Trends in Violent Crime. In Crime and Justice, 30, 83–142.</p>'
        var graph_title = 'Homocide Rates for Western Europe and Prestate Societies'
        var graph_decription = 'Long term homocide rates for Western Europe 1300-200 compared to prestate societies'
        var image = 'homocide_rates.png';
        var line_graph = new line_graph_class(the_data, 'graph1', graph_title, graph_note, graph_source_code, data_source, graph_decription, image);
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

function line_graph_class(the_data, graph_container_id, title_text, notes, source_code, data_source, description, image){
    /*Class for the line graph*/
    
    var self = this;
    self.margin = {};
    self.current_data = 'linear';
    self.data = the_data;
    self.graph_container_id = graph_container_id;
    self.title_text = title_text;
    self.notes = notes;
    self.source_code = source_code;
    self.data_source = data_source;
    self.description = description;
    self.image = image;

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
                .attr("class", "line "+country.name)
                .attr('stroke-width', 2)
                .attr('fill', 'none')
                .attr('visibility', country.display)
                .attr("d", self.homocide_line_function(country.values));
            self.lines.push(new_line);
            
            var new_points = self.svg_g.selectAll(".point")
                .data(country.values)
                .enter().append("circle")
                    .attr("class", "dot "+country.name)
                    .attr('visibility', country.display)
                    .attr("r", 4)
                    .attr("cx", function(d) { return self.xRange(d.x); })
                    .attr("cy", function(d) { return self.yRange(d.y); });
            self.points_lists.push(new_points)
    
        });
        
         //Add the y axis label
        self.y_axis_label = self.svg_g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - self.margin.left)
            .attr("x",0 - (self.height / 2))
            .attr("dy", ".75em")
            .style("text-anchor", "middle")
            .text("Homocides per 100,000 per year");
        
        //Create Graph legend
        $('#'+self.graph_container_id).prepend('<div class="row legend_row" id=legend_row_'+self.graph_container_id+'>')
        self.legend_row = $('#legend_row_'+self.graph_container_id);
        var i = 0;
        self.data.forEach(function(datum){
            var legend_element = '<button class="legend_button" data_index='+i+' id=legend_id'+i+'><svg width="15" height="14" style="vertical-align: middle"><circle id=circle_id'+i+' class="legend dot visibility_'+datum.display+' '+datum.name+'" r="5" cx="6" cy="7"></circle></svg>'+datum.Country+'</button>';
            self.legend_row.prepend('<div class="legend_button_wrapper">'+legend_element+'</div>');       
            i++;
        });
        
        //Create Graph Title
        $('#'+self.graph_container_id).prepend('<div class="row title_row" id=title_row_'+self.graph_container_id+'>');
        self.title_row = $('#title_row_'+self.graph_container_id);
        self.title_row.prepend('<div class="graph_title">'+self.title_text+'</div>');
        
        //Create Graph Notes, Sources
        $('#'+self.graph_container_id).append('<div class="row source_row" id=source_row_'+self.graph_container_id+'>');
        self.source_row = $('#source_row_'+self.graph_container_id);
        //Notes
        var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Notes</h4></div>';
        var modal_body = '<div class="modal-body">'+self.notes+'</div>';
        var modal = '<div class="modal fade" id="notes_modal_'+self.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
        self.data_modal = $('#notes_modal_'+self.graph_container_id);
        self.source_row.append('<div class="col-xs-6 col-sm-3"><a id=notes_link_'+self.graph_container_id+' data-toggle="modal" data-target="#notes_modal_'+self.graph_container_id+'">Graph Notes<sup>1-2</sup></a></div>'+modal);
        self.data_source_link = $('#notes_link_'+self.graph_container_id);
        //Code
        self.source_row.append('<div class="col-xs-6 col-sm-3"><a class="source code" target="_blank" href='+self.source_code+'>Source Code</a></div>');
        //Data
        var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Data Sources</h4></div>';
        var modal_body = '<div class="modal-body">'+self.data_source+'</div>';
        var modal = '<div class="modal fade" id="data_source_modal_'+self.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
        self.data_modal = $('#data_source_modal_'+self.graph_container_id);
        self.source_row.append('<div class="col-xs-6 col-sm-3"><a id=data_source_link_'+self.graph_container_id+' data-toggle="modal" data-target="#data_source_modal_'+self.graph_container_id+'">Data Sources</a></div>'+modal);
        self.data_source_link = $('#data_source_link_'+self.graph_container_id);
        $('#'+self.graph_container_id).append('<div class="row controls_row" id=controls_row_'+self.graph_container_id+'>');
        //Downloads
        var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Downloads</h4></div>';
        var image_link = '<a href="'+self.image+'" download>static image</a>'
        var modal_body = '<div class="modal-body"><p>'+image_link+'</p></div>';
        var modal = '<div class="modal fade" id="downloads_modal_'+self.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
        self.downloads_modal = $('#downloads_modal_'+self.graph_container_id);
        self.source_row.append('<div class="col-xs-6 col-sm-3"><a id=downloads_link_'+self.graph_container_id+' data-toggle="modal" data-target="#downloads_modal_'+self.graph_container_id+'">Downloads</a></div>'+modal);
        self.data_source_link = $('#downloads_link_'+self.graph_container_id);
        
    }//End draw graph
    
    /* Reusable functions********************/
    self.find_max_y = function(d){
        /*Returns the max y value*/
        var max = 0
        if (d.display == 'visible') {
            max = d3.max(d.values, function(v) { return v.y; });
        }
        if (max > 0) {
            max = order_of_magnitude(max) * 10;//set the max to next highest order of magnitude
        }
        return max;
    }
    
    self.set_graph_dimensions = function(){
        /*Resets the higheth width and margins based on the column width*/
        var graph_container_width = $('#'+self.graph_container_id).width();
        var left_margin = 50;
        self.margin = {
            top: 10,
            right: 10,
            bottom: 20,
            left: 50
        };
        self.width = graph_container_width - self.margin.right - self.margin.left;
        self.height = 250 - self.margin.top - self.margin.bottom;
    }
}

function order_of_magnitude(n) {
    /*Return the order of magnitude of n*/
    var order = Math.floor(Math.log(n) / Math.LN10
                       + 0.000000001); // because float math sucks like that
    return Math.pow(10,order);
}
