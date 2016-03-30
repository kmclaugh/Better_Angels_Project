
function worst_atrocities_graph_class(the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file){
    /*Class for the worst atrocities graph*/
    
    var self = this;
    var min_height = 390,
        fixed_height = false,
        margin = {top: 30, right: 0, bottom: 200, left: 50};
    self.current_data = 'death_total';
    
    graph_class.call(this, the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file, min_height, fixed_height, margin);
    
    $(document).on("click", '#change_releative_absolute', function() {
        self.update_data();
    });

    self.update_data = function(){
        /*Switches the data from absolute to relative dataset or visa-versa*/
        
        //change to relative
        if (self.current_data == 'death_total') {
            self.current_data = 'relative';
            
            //change the button
            $('#change_releative_absolute').text('Switch to Absolute');
            
            //Update the y axis
            self.yRange.domain([0, 450]);
            self.yAxis.scale(self.yRange);
            self.y_axis
                .transition()
                .call(self.yAxis);
            
            //Update the bars with the new data
            self.svg.selectAll("rect")
                .data(self.data)
                .transition()
                .attr("y", function(d) { return self.y_data_function(d); })
                .attr("height", function(d) { return self.height - self.y_data_function(d)});
            
            //Update the graph title
            self.title.text('21 Worst Atrocities in History - 1950 Equivalent Death Toll');
        }
        
        //change to absolute
        else if (self.current_data == 'relative') {
            self.current_data = 'death_total';
            
            //change the button
            $('#change_releative_absolute').text('Switch to 1950 Equivalent');
            
            //Update the y axis
            self.yRange.domain([0, 55]);
            self.yAxis.scale(self.yRange);
            self.y_axis
                .transition()
                .call(self.yAxis);
            
            //Update the bars with the new data
            self.svg.selectAll("rect")
                .data(self.data)
                .transition()
                .attr("y", function(d) { return self.y_data_function(d); })
                .attr("height", function(d) { return self.height - self.y_data_function(d)});
            
            //Update the graph title
            self.title.text('21 Worst Atrocities in History - Absolute Death Toll');
        }
    }
    
    self.resize = function(){
        /*Resizes the graph due to a window size change*/
        
        self.start_resize();
        
        //Rescale the range and axis functions to account for the new dimensions
        self.xRange
            .rangeRoundBands([0, self.width], .1);
        self.xAxis
            .scale(self.xRange);
        self.yRange
            .range([self.height, 0]);
        self.yAxis
            .ticks(Math.max(self.height/20, 2))
            .scale(self.yRange);
        
        //resize the x-axis
        self.x_axis
            .attr("transform", "translate(0," + self.height + ")")
            .call(self.xAxis)
                .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", "-.55em")
                    .attr('class', 'tick_labels')
                    .text(self.x_labels_data_function)
                    .attr("transform", self.x_labels_transform_function());
        
        //resize the y-axis
        self.y_axis
            .call(self.yAxis);
        
        //Update the position of the y axis label
        self.y_axis_label
            .attr("y", 0 - self.margin.left)
            .attr("x",0 - (self.height / 2))
        
        //Update the actual bar rectangles
        self.svg.selectAll("rect")
            .attr("x", function(d) { return self.xRange([d.Cause, d.Century_String]); })
            .attr("width", self.xRange.rangeBand())
            .attr("y", function(d) { return self.y_data_function(d); })
            .attr("height", function(d) { return self.height - self.y_data_function(d)});
    
    }//end resize
    
    self.draw = function(){
        /*Draws the graph according to the size of the graph element*/
        
        self.start_draw();
                    
        self.xRange = d3.scale.ordinal()
            .rangeRoundBands([0, self.width], .1)
            .domain(self.data.map(function(d) {
                    return [d.Cause, d.Century_String];
                })
            );
            
        self.yRange = d3.scale.linear()
            .range([self.height, 0])
            .domain(function(){
                if (self.current_data == 'death_total') {
                    return [0, 55]
                }
                else{
                    return [0, 450]
                }
            }());
        
        self.xAxis = d3.svg.axis()
            .scale(self.xRange)
            .orient("bottom")
            .tickFormat('');
            
          
        self.yAxis = d3.svg.axis()
            .scale(self.yRange)
            .orient('left')
            .ticks(Math.max(self.height/20, 2))
            .tickSubdivide(true);
      
        //add the x-axis
        self.x_axis = self.svg_g.append('svg:g')
            .attr("class", "x axis")
            .attr("transform", "translate(0," + self.height + ")");
        self.x_axis.call(self.xAxis)
            .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", "-.55em")
                .attr('class', 'tick_labels')
                .text(self.x_labels_data_function)
                .attr("transform", self.x_labels_transform_function());
        
        //Add the y-axis
        self.y_axis = self.svg_g.append('svg:g')
            .attr('class', 'y axis');
        self.y_axis.call(self.yAxis);
        
        //Add the y axis label
        self.y_axis_label = self.svg_g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - self.margin.left)
            .attr("x",0 - (self.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Millions of Deaths");
    
        var bar = self.svg_g.selectAll("bar")
            .data(self.data)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return self.xRange([d.Cause, d.Century_String]); })
                .attr("width", self.xRange.rangeBand())
                .attr("y", function(d) { return self.y_data_function(d); })
                .attr("height", function(d) { return self.height - self.y_data_function(d)});
        
        create_graph_title_footer(self);
        
        //Add the change button
        $('#'+self.graph_container_id+'_controls').prepend('<div class="row change_button_row"><button class="btn btn-primary" type="button" id="change_releative_absolute">Switch to 1950 Equivalent</button></div>');
    
    }//End draw graph
    
    /* Reusable functions********************/
    self.x_labels_data_function = function(d){
        /*Returns the correct label for the x axis*/
        if (d[0] == 'Mao Zedong') {
            return d[0] + ' - ' + '(' + d[1] + ' Century)';
        }
        else{
            return d[0] + ' - ' + '(' + d[1] + ')';
        }
    }
    
    self.y_data_function = function(d){
        /* returns the correct value for y depending on which data set is needed*/
        if (self.current_data == 'death_total') {
            return self.yRange(d.Death_Total/1000000);
        }
        else {
            return self.yRange(d.Relative/1000000);
        }
    }
    
    self.x_labels_transform_function = function(){
        /*transforms the labels with the right angel*/
        var text_height = 15//$('.tick_labels').height(); HACK the height function doesn't work in FF but it's alway 15 so who cares
        if (text_height > self.xRange.rangeBand()) {
            var rotate_angle_radians = Math.PI/2;
            var dx = 0;
            var dy = 0;
        }
        else{
            var x0 = self.xRange.rangeBand()/2 + self.margin.left;
            var text_element = $('.tick_labels')
            var text_length = text_element[0].getComputedTextLength();
            
            var rotate_angle_radians = Math.cos(x0/text_length) + 0.2*Math.cos(x0/text_length);
            var dx = text_height/2 * Math.cos(rotate_angle_radians)
            var dy = text_height/2 * Math.sin(rotate_angle_radians);
        }
        var rotate_angle_degrees = rotate_angle_radians * 180/Math.PI;
        
        return "rotate(-"+rotate_angle_degrees+") translate("+dy+","+dx+")"
    }
}
worst_atrocities_graph_class.prototype = Object.create(graph_class.prototype); // See note below
worst_atrocities_graph_class.prototype.constructor = worst_atrocities_graph_class;


