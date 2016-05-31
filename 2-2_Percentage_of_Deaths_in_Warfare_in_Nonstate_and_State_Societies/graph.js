var Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies
$(window).load(function () {
    $(document).ready(function () {
        if (auto_create_graph == true){
            Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies = new Percentage_of_Deaths_in_Warfare_class(the_data, graph_container_id, graph_title, graph_slug, graph_note, graph_source_code, data_source, graph_decription, image, csv_file);
            Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies.draw();
        }
    
    });
});

function Percentage_of_Deaths_in_Warfare_class(the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file){
    /*Class for the percentage of deaths in warfare bar graph graph*/
    
      var self = this;
    var min_height = 390,
        fixed_height = false,
        margin = {top: 30, right: 20, bottom: 20, left: 300};
    self.current_data = 'death_total';
    
    graph_class.call(this, the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file, min_height, fixed_height, margin);
    
    $(document).on("click", '#change_releative_absolute', function() {
        self.update_data();
    });

    self.update_data = function(){
        /*Switches the data from absolute to relative dataset or visa-versa*/
        
        
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
        self.yRange = d3.scale.ordinal()
            .rangeBands([0, self.height], .15)
            .domain(self.data.map(function(d) {
                    return [d.ID, d.Name, d.Location];
                })
            );
            
        self.xRange = d3.scale.linear()
            .range([0, self.width])
            .domain([0,1]);
        
        var formatPercent = d3.format(".0%");
        self.xAxis = d3.svg.axis()
            .scale(self.xRange)
            .tickFormat(formatPercent)
            .orient("bottom");
        
        var y_label_format = function(d, i){
            var label_string = '';
            console.log(d[1], d[2], d[1] != null && d[2] != null)
            if (d[1] != null){
                label_string += d[1]
            }
            if (d[1] != null && d[2] != null){
                label_string += ', ';
            }
            if (d[2] != null){
                label_string += d[2];
            }
            return label_string;
        }
            
        self.yAxis = d3.svg.axis()
            .scale(self.yRange)
            .tickFormat(y_label_format)
            .orient('left');
      
        //add the x-axis
        self.x_axis = self.svg_g.append('svg:g')
            .attr("class", "x axis")
            .attr("transform", "translate(0," + self.height + ")");
        self.x_axis.call(self.xAxis);
        
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
            .text("Society");
    
        self.data_bars = self.svg_g.selectAll("bar")
            .data(self.data)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("y", function(d) { return self.yRange([d.ID, d.Name, d.Location]); })
                .attr("width", function(d) {
                    return self.xRange(d['Percentage of Deaths from Warfare'])
                })
                .attr("x", 0)
                .attr("height", self.yRange.rangeBand());
        
        self.hover_bars = self.svg_g.selectAll("bar")
            .data(self.data)
            .enter().append("rect")
                .attr("class", "hover_bar")
                .attr("y", function(d) { return self.yRange([d.ID, d.Name, d.Location]); })
                .attr("width", function(d) {
                    return self.xRange(1)
                })
                .attr("x", 0)
                .attr("height", self.yRange.rangeBand());
        
        create_graph_title_footer(self);
        
        //Add the change button
        $('#'+self.graph_container_id+'_controls').prepend('<div class="row change_button_row"><button class="btn btn-primary" type="button" id="change_releative_absolute">Switch to 1950 Equivalent</button></div>');
    
    }//End draw graph
    
    
}
Percentage_of_Deaths_in_Warfare_class.prototype = Object.create(graph_class.prototype); // See note below
Percentage_of_Deaths_in_Warfare_class.prototype.constructor = Percentage_of_Deaths_in_Warfare_class;