var Homicide_Rates_for_Western_Europe_and_Prestate_Societies
$(window).load(function () {
    $(document).ready(function () {
        if (auto_create_graph == true){
            Homicide_Rates_for_Western_Europe_and_Prestate_Societies = new homicide_rates_line_graph_class(the_data, graph_container_id, graph_title, graph_slug, graph_note, graph_source_code, data_source, graph_decription, image, csv_file);
            Homicide_Rates_for_Western_Europe_and_Prestate_Societies.draw();
        }
    
    });
});

function homicide_rates_line_graph_class(the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file){
    /*Class for the homicide line graph*/
    
    var self = this;
    var min_height = 255,
        fixed_height = false,
        margin = {top: 10, right: 10, bottom: 20, left: 50};
    self.current_scale = 'log';
        
    graph_class.call(this, the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file, min_height, fixed_height, margin);
    
    $(document).on("click", '.legend_button.'+self.graph_container_id, function() {
        self.update_data($(this).attr('data_index'));
    });
    $(document).on("click", '#log_scale_'+self.graph_container_id, function() {
        self.toggle_scale();
    });

    self.toggle_scale = function(){
        /*Toggles the scale between linear and log*/
        if (self.current_scale == 'log'){
            self.current_scale = 'linear';
            
            //Rescale yRange range and doman for linear
            self.yRange = d3.scale.linear()
                .range([self.height, 0])
                .domain([0,d3.max(self.data, function(d) {return self.find_max_y(d, self.current_scale)})]);
            //Update the y-axis
            self.yAxis.scale(self.yRange);
            self.y_axis.transition().call(self.yAxis);
                
            //Update the actual lines
            i = 0;
            self.lines.forEach(function(line) {
                line.transition().attr("d", self.homicide_line_function(self.data[i].values));
                i++;
            });
            
            //Update the points
            self.svg.selectAll("circle")
                .transition()
                .attr("cx", function(d) {return self.xRange(d.x);})
                .attr("cy", function(d) {return self.yRange(d.y);});
        }
        
        else if (self.current_scale == 'linear'){
            self.current_scale = 'log';
            
            //Rescale yRange range and doman for log
            self.yRange = d3.scale.log()
                .range([self.height, 0])
                .domain([0.1, d3.max(self.data, function(d) {return self.find_max_y(d, self.current_scale)})]);
            //Update the y-axis
            self.yAxis.scale(self.yRange);
            self.y_axis.transition().call(self.yAxis);
                
            //Update the actual lines
            i = 0;
            self.lines.forEach(function(line) {
                line.transition().attr("d", self.homicide_line_function(self.data[i].values));
                i++;
            });
            
            //Update the points
            self.svg.selectAll("circle")
                .transition()
                .attr("cx", function(d) {return self.xRange(d.x);})
                .attr("cy", function(d) {return self.yRange(d.y);});
        }
    }
    
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
            d3.max(self.data, function(d) {return self.find_max_y(d,self.current_scale)})
        ]);
        
        self.y_axis.transition().call(self.yAxis);
        
        //Update the actual lines
        i = 0;
        self.lines.forEach(function(line) {
            line
                .transition()
                .attr("d", self.homicide_line_function(self.data[i].values))
                .attr('visibility', self.data[i].display);
            i++;
        });
        
        //Update the series
        $('g.series.'+self.data[update_index].name).attr('visibility', display_change);
        
        //Update the points
        self.svg.selectAll("circle")
            .transition()
            .attr("cx", function(d) {
                return self.xRange(d.x);
            })
            .attr("cy", function(d) {
                return self.yRange(d.y);
            })
    }
        
    self.resize = function(){
        /*Resizes the graph due to a window size change*/
        self.start_resize();
        
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
        self.y_axis_label
            .attr("y", 0 - self.margin.left)
            .attr("x",0 - (self.height / 2))
        
        //Update the actual lines
        i = 0;
        self.lines.forEach(function(line) {
            line.attr("d", self.homicide_line_function(self.data[i].values));
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
        
        self.start_draw();
        
        self.xRange = d3.scale.linear()
            .range([0, self.width]);
        
        if (self.current_scale == 'log') {
             self.yRange = d3.scale.log()
                .range([self.height, 0])
                .domain([0.1, d3.max(self.data, function(d) {return self.find_max_y(d, self.current_scale)})]);
        }
        else if (self.current_scale == 'linear') {
            self.yRange = d3.scale.linear()
                .range([self.height, 0])
                .domain([0,d3.max(self.data, function(d) {return self.find_max_y(d, self.current_scale)})]);
        }
        
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
        self.homicide_line_function = d3.svg.line()
            .x(function(d) { return self.xRange(d.x); })
            .y(function(d) { return self.yRange(d.y); });
            
        /*init tooltip for data points*/
        self.tool_tip = d3.tip()
            .offset([-10, 0])
            .attr('class', 'd3-tip')
            .html(function(d) {
                var country = d3.select(this.parentNode).datum().Country
                if (d.x != 1250){
                    var year_string = ' in '+d.x;
                }
                else{
                    var year_string = '';
                }
                return '<div class="data_tip"><div class=tip_title><strong>'+country+'</strong></div><div class="tip_data">'+d.y+year_string+'</div></div>';
            });
        
        self.svg_g.call(self.tool_tip);
              
        /*Create the path and points*/
        //path
        self.lines = [];
        self.points_lists = [];
        self.data.forEach(function(country) {
            
            var new_line = self.svg_g.append('svg:path')
                .attr("class", "line "+country.name)
                .attr('fill', 'none')
                .attr('visibility', country.display)
                .attr("d", self.homicide_line_function(country.values));
            self.lines.push(new_line);
    
        });
        //points
        self.points_lists= self.svg_g.selectAll(".series")
            .data(self.data)
            .enter().append("g")
                .attr("class", function(d){ return "series "+ d.name; })
                .attr('visibility', function(d){ return d.display })
                .selectAll(".point")
                    .data(function(d) { ;return d.values; })
                    .enter().append("circle")
                        .attr("class", "dot")
                        .attr('r', '5')
                        .on('mouseout', self.tool_tip.hide)
                        .on('mouseover', self.tool_tip.show)
                        .attr("cx", function(d) { return self.xRange(d.x); })
                        .attr("cy", function(d) { return self.yRange(d.y); });
        
         //Add the y axis label
        self.y_axis_label = self.svg_g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - self.margin.left)
            .attr("x",0 - (self.height / 2))
            .attr("dy", ".75em")
            .style("text-anchor", "middle")
            .text("Homicides per 100,000 per year");
        
        //Create Graph legend
        self.graph_element.prepend('<div class="row legend_row" id=legend_row_'+self.graph_container_id+'>')
        self.legend_row = $('#legend_row_'+self.graph_container_id);
        self.legend_row.append('<div class="col-xs-12 col-sm-2 scale_col" id=scale_col_'+self.graph_container_id+'></div>')
        self.scale_col = $('#scale_col_'+self.graph_container_id);
        self.legend_row.append('<div class="col-xs-12 col-sm-10" id=legend_col_'+self.graph_container_id+'></div>')
        self.legend_col = $('#legend_col_'+self.graph_container_id);
        var i = 0;
        self.data.forEach(function(datum){
            var legend_element = '<button class="legend_button '+self.graph_container_id+'" data_index='+i+' id=legend_id'+i+'><svg width="15" height="14" style="vertical-align: middle"><circle id=circle_id'+i+' class="legend series visibility_'+datum.display+' '+datum.name+'" r="5" cx="6" cy="7"></circle></svg>'+datum.Country+'</button>';
            self.legend_col.append('<div class="legend_button_wrapper">'+legend_element+'</div>');       
            i++;
        });
        
        //Create log button
        self.scale_col.append('<span class="scale"><input class="scale" type="checkbox" id="log_scale_'+self.graph_container_id+'" value="log" checked><label class="scale" for="log_scale_'+self.graph_container_id+'">&nbsplog scale<label></span>');
        self.scale_button = $('#log_scale_'+self.graph_container_id);
        
        create_graph_title_footer(self);
        
    }//End draw graph
    
    /* Reusable functions********************/
    self.find_max_y = function(d, log){
        /*Returns the max y value*/
        var max = 0
        if (d.display == 'visible') {
            max = d3.max(d.values, function(v) { return v.y; });
        }
        if (max > 0 && log == 'log') {
            max = order_of_magnitude(max) * 10;//set the max to next highest order of magnitude
        }
        return max;
    }
};
homicide_rates_line_graph_class.prototype = Object.create(graph_class.prototype);
homicide_rates_line_graph_class.prototype.constructor = homicide_rates_line_graph_class;