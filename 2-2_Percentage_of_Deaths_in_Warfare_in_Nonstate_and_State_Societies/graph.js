var Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies;

$(window).load(function () {
    $(document).ready(function () {
        if (auto_create_graph == true){
            Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies = new Percentage_of_Deaths_in_Warfare_class(the_data, graph_container_id, graph_title, graph_slug, graph_note, graph_source_code, data_source, graph_decription, image, csv_file);
            Percentage_of_Deaths_in_Warfare_in_Nonstate_and_State_Societies.draw();
            d3.selectAll(".tick")
                .on("click", function(d) {
                    if (d[3] != null) {
                        window.open(d[3], '_blank');
                    }
                });
        }
    
    });
});

function Percentage_of_Deaths_in_Warfare_class(the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file){
    /*Class for the percentage of deaths in warfare bar graph graph*/
    
    var self = this;
    var min_height = 390,
        fixed_height = false,
        margin = {top: 0, right: 20, bottom: 20, left: 200};
    self.max_value = .65;
    
    graph_class.call(this, the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file, min_height, fixed_height, margin);
    var groups = d3.map(self.data, function(d){ return d.Group}).keys();
    self.display_dictionary = {};
    groups.forEach(function(group){
        self.display_dictionary[group.replace(/ /g , "_")] = {'visible':true, 'display_name':group};
    });
    
     $(document).on("click", '.legend_button.'+self.graph_container_id, function() {
        self.update_data($(this).attr('data_name'));
    });

    self.update_data = function(group){
        /*Hide or shows the group*/
        
        //Toggle the display visibility for the group
        var display_values = self.display_dictionary[group];
        if (display_values.visible == true){
            self.display_dictionary[group].visible = false;
        }
        else if(display_values.visible == false){
            self.display_dictionary[group].visible = true;
        }
        
        //Update the visible data
        self.visible_data = [];
        self.max_value = 0;
        self.data.forEach(function(datum){
            if (self.display_dictionary[datum.Group.replace(/ /g , "_")].visible == true){
                self.visible_data.push(datum)
                if (datum['Percentage of Deaths from Warfare'] > self.max_value){
                    self.max_value = datum['Percentage of Deaths from Warfare'];
                }
            }
        });
        
        //Update the range and axis
        self.xRange
            .domain([0,self.max_value]);
        self.yRange
            .domain(self.visible_data.map(function(d) {
                    return [d.ID, d.Name, d.Location, d['Source Link']];
                })
            );
        self.y_axis.transition().call(self.yAxis);
        self.x_axis.transition().call(self.xAxis);
        
        //Update the data bars
        self.svg.selectAll("rect")
                .data(self.data)
                .transition()
                .attr('visibility', function(d){
                    if (self.display_dictionary[d.Group.replace(/ /g , "_")].visible == true){
                        return 'visible';
                    }
                    else{
                        return 'hidden';
                    }
                })
                .attr("y", function(d) { return self.yRange([d.ID, d.Name, d.Location, d['Source Link']]); })
                .attr("width", function(d) {
                    return self.xRange(d['Percentage of Deaths from Warfare'])
                })
                .attr("x", 0)
                .attr("height", self.yRange.rangeBand())
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
                    if (self.display_dictionary[d.Group.replace(/ /g , "_")].visible == true){
                        return [d.ID, d.Name, d.Location, d['Source Link']];
                    }
                })
            );
            
        self.xRange = d3.scale.linear()
            .range([0, self.width])
            .domain([0,self.max_value]);
        
        var formatPercent = d3.format(".0%");
        self.xAxis = d3.svg.axis()
            .scale(self.xRange)
            .tickFormat(formatPercent)
            .orient("bottom");
            
        self.yAxis = d3.svg.axis()
            .scale(self.yRange)
            .tickFormat(self.y_label_format)
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
        self.y_axis.selectAll('text').each(function(){
            if (this.textContent.substring(0,7) == 'Average'){//HACK from data
                this.classList.add("Average_tick");
            }
            else{
                this.classList.add("source_tick");
            }
        });
        
        //Add the y axis label
        self.y_axis_label = self.svg_g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - self.margin.left)
            .attr("x",0 - (self.height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Society (click for source)");
        
        self.tooltip_lines = self.svg_g.selectAll("bar")
            .data(self.data)
            .enter().append("line")
                .attr("class", "tooltip_line")
                .attr("x1", self.xRange(0))
                .attr("y1", function(d) { return self.yRange([d.ID, d.Name, d.Location, d['Source Link']]) + self.yRange.rangeBand()/2; })
                .attr("x2", self.xRange(self.max_value)/2+self.xRange(self.max_value)/3)
                .attr("y2", function(d) { return self.yRange([d.ID, d.Name, d.Location, d['Source Link']]) + self.yRange.rangeBand()/2; });
        
        self.data_bars = self.svg_g.selectAll("bar")
            .data(self.data)
            .enter().append("rect")
                .attr("class", function(d) { return 'bar ' + d.Group.replace(/ /g , "_"); })
                .attr('id', function(d) { return 'bar'+d.ID} )
                .attr("y", function(d) { return self.yRange([d.ID, d.Name, d.Location, d['Source Link']]); })
                .attr("width", function(d) {
                    return self.xRange(d['Percentage of Deaths from Warfare'])
                })
                .attr("x", 0)
                .attr("height", self.yRange.rangeBand())
            
        self.hover_bars = self.svg_g.selectAll("bar")
            .data(self.data)
            .enter().append("rect")
                .attr("class", "hover_bar")
                .attr("y", function(d) { return self.yRange([d.ID, d.Name, d.Location, d['Source Link']]); })
                .attr("width", function(d) {
                    return self.xRange(self.max_value)
                })
                .attr("x", 0)
                .attr("height", self.yRange.rangeBand())
                .on('mouseover', function(d){
                    self.show_tip(d);
                })
                .on("mouseout", function(d){
                    self.hide_tip(d);
                });
                
        //Create the grouping labels
        self.text1 = self.svg_g.append('text')
            .attr('class', 'group_label')
            .attr('id', 'test')
            .attr('x', function() { return self.xRange(.60) })
            .attr('y', function() { return self.yRange([self.data[9].ID, self.data[9].Name, self.data[9].Location, self.data[9]['Source Link']]); })
            .attr('text-anchor', 'end')
            .text('Prehistoric Archaeological Sites');
        
        self.text2 = self.svg_g.append('text')
            .attr('class', 'group_label')
            .attr('x', function() { return self.xRange(.30) })
            .attr('y', function() { return self.yRange([self.data[26].ID, self.data[26].Name, self.data[26].Location, self.data[26]['Source Link']]); })
            .attr('text-anchor', 'end')
            .text('Hunter-gathers');
        
        self.text3 = self.svg_g.append('text')
            .attr('class', 'group_label')
            .attr('x', function() { return self.xRange(.60) })
            .attr('y', function() { return self.yRange([self.data[37].ID, self.data[37].Name, self.data[37].Location, self.data[37]['Source Link']]); })
            .attr('text-anchor', 'end')
            .text('Hunter-horticultururalists and Other Tribal Groups');
        
        self.text4 = self.svg_g.append('text')
            .attr('class', 'group_label')
            .attr('x', function() { return self.xRange(.05) })
            .attr('y', function() { return self.yRange([self.data[48].ID, self.data[48].Name, self.data[48].Location, self.data[48]['Source Link']]); })
            .attr('text-anchor', 'end')
            .text('States');
        
        //Create Graph legend
        self.graph_element.prepend('<div class="row legend_row" id=legend_row_'+self.graph_container_id+'>')
        self.legend_row = $('#legend_row_'+self.graph_container_id);
        self.legend_row.append('<div class="col-xs-12 col-sm-2 scale_col" id=scale_col_'+self.graph_container_id+'></div>')
        self.scale_col = $('#scale_col_'+self.graph_container_id);
        self.legend_row.append('<div class="col-xs-12 col-sm-10" id=legend_col_'+self.graph_container_id+'></div>')
        self.legend_col = $('#legend_col_'+self.graph_container_id);
        var i = 0;
        for (var group in self.display_dictionary){
            var value = self.display_dictionary[group];
            var legend_element = '<button class="legend_button '+self.graph_container_id+'" data_name="'+group+'"><svg width="15" height="14" style="vertical-align: middle"><circle class="legend series visible_'+value.visible+' '+group+'" r="5" cx="6" cy="7"></circle></svg>'+value.display_name+'</button>';
            self.legend_col.append('<div class="legend_button_wrapper">'+legend_element+'</div>');       
            i++;
        };
        
        create_graph_title_footer(self);
        
        //Add the change button
        $('#'+self.graph_container_id+'_controls').prepend('<div class="row change_button_row"><button class="btn btn-primary" type="button" id="change_releative_absolute">Switch to 1950 Equivalent</button></div>');
    
        self.init_tooltip();
    }//End draw graph
    
    self.init_tooltip = function(){
        /*Initializes the tootltip for the graph*/
        self.tool_tip = d3.tip()
            .attr('class', 'd3-tip')
            .attr('id', 'd3_tip_'+self.slug)
            .html(function(d) {
                html_string = '<div>';
                //Name
                var name = self.y_label_format([d.ID, d.Name, d.Location, d['Source Link']], true);
                if (name.substring(0,7) == 'Average'){//HACK from data
                    name = "Average - " + d.Group;
                }
                html_string += '<span class="tip_title">'+name+'</span>';
                html_string += '</br>';
                //Date
                if (d["Date String"] != null){
                    html_string += d['Date String'] + '</br>';
                }
                //Source
                if (d["Source Name"] != null){
                    html_string += '<span class="source">'+d['Source Name'] + '</span></br>';
                }
                //Value
                var decimal = d["Percentage of Deaths from Warfare"]*100;
                html_string += '<span class="value">'+decimal.toPrecision(2)+ "%</span></br>";
                html_string += "</div>";
                return html_string;
            });
        
        self.svg_g.call(self.tool_tip);
    }
    
    self.show_tip = function(hover_target){
        if (hover_target.Name == null || hover_target.Name.substring(0,1) != " " ){//HACK from data
            var hover_bar = self.hover_bars[0][hover_target.ID-1];
            var tooltip_line = self.tooltip_lines[0][hover_target.ID-1];
            var data_bar = self.data_bars[0][hover_target.ID-1];
            add_class(d3.select(data_bar), 'highlight');
            add_class(d3.select(tooltip_line), 'highlight');
            self.tool_tip.offset(function() {
                if (hover_target["Percentage of Deaths from Warfare"] < self.max_value/2+self.max_value/3){
                    return [self.yRange.rangeBand()/2-9, self.xRange(self.max_value)/3];
                }
                else{
                    return [-9, self.xRange(self.max_value)/3];
                }
            })
            self.tool_tip.show(hover_target, hover_bar);
        }
    }
    
    self.hide_tip = function(hover_target){
        
        var data_bar = self.data_bars[0][hover_target.ID-1];
        var tooltip_line = self.tooltip_lines[0][hover_target.ID-1];
        remove_class(d3.select(data_bar), 'highlight')
        remove_class(d3.select(tooltip_line), 'highlight')
        self.tool_tip.hide()
    }
    
    /********Reusable functions**************/
    self.y_label_format = function(d, tooltip){
        /*Returns the y label. Used for both y-axis tick labels and the tooltip title. Little HACKy*/
        var label_string = '';
        if (d[1] != null){
            label_string += d[1]
        }
        if (d[1] != null && d[2] != null){
            label_string += ', ';
        }
        if (d[2] != null){
            label_string += d[2];
        }
        //The below code is complete bullshit HACK
        if (tooltip != true){
            if (d[0] >= 45 && d[1].substring(0,7) != 'Average'){//HACK from data
                label_string += ', ' + self.data[d[0]-1]['Date String'];
            }
        }
        return label_string;
    }

}
Percentage_of_Deaths_in_Warfare_class.prototype = Object.create(graph_class.prototype); // See note below
Percentage_of_Deaths_in_Warfare_class.prototype.constructor = Percentage_of_Deaths_in_Warfare_class;