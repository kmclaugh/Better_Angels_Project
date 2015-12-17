
$(window).load(function () {
    
    $(document).ready(function () {
        
        var the_data = [
            {"Relative": 105000000.0, "Cause": "Fall of Rome", "Century_String": "3rd-5th", "Death_Total": 8000000.0, "Year": 350.0},
            {"Relative": 429000000.0, "Cause": "An Lushan Revolt", "Century_String": "8th", "Death_Total": 36000000.0, "Year": 763.0},
            {"Relative": 278000000.0, "Cause": "Mongol Conquests", "Century_String": "13th", "Death_Total": 40000000.0, "Year": 1227.0},
            {"Relative": 83000000.0, "Cause": "Mideast Slave Trade", "Century_String": "7th-19th", "Death_Total": 19000000.0, "Year": 1250.0},
            {"Relative": 100000000.0, "Cause": "Timur Lenk (Tamerlane)", "Century_String": "14th-15th", "Death_Total": 17000000.0, "Year": 1405.0},
            {"Relative": 14000000.0, "Cause": "French Wars of Religion", "Century_String": "16th", "Death_Total": 3000000.0, "Year": 1598.0},
            {"Relative": 23000000.0, "Cause": "Russia's Time of Troubles", "Century_String": "16th-17th", "Death_Total": 5000000.0, "Year": 1603.0},
            {"Relative": 112000000.0, "Cause": "Fall of the Ming Dynasty", "Century_String": "17th", "Death_Total": 25000000.0, "Year": 1644.0},
            {"Relative": 32000000.0, "Cause": "Thirty Years War", "Century_String": "17th", "Death_Total": 7000000.0, "Year": 1648.0},
            {"Relative": 92000000.0, "Cause": "Conquest of America", "Century_String": "15th-19th", "Death_Total": 20000000.0, "Year": 1790.0},
            {"Relative": 82000000.0, "Cause": "Atlantic Slave Trade", "Century_String": "15th-19th", "Death_Total": 18000000.0, "Year": 1795.0},
            {"Relative": 11000000.0, "Cause": "Napoleonic Wars", "Century_String": "19th", "Death_Total": 4000000.0, "Year": 1815.0},
            {"Relative": 40000000.0, "Cause": "Taiping Rebellion", "Century_String": "19th", "Death_Total": 20000000.0, "Year": 1864.0},
            {"Relative": 35000000.0, "Cause": "British India", "Century_String": "19th", "Death_Total": 17000000.0, "Year": 1879.0},
            {"Relative": 12000000.0, "Cause": "Congo Free State", "Century_String": "19th-20th", "Death_Total": 8000000.0, "Year": 1908.0},
            {"Relative": 15000000.0, "Cause": "First World War", "Century_String": "20th", "Death_Total": 15000000.0, "Year": 1918.0},
            {"Relative": 9000000.0, "Cause": "Russian Civil War", "Century_String": "20th", "Death_Total": 9000000.0, "Year": 1922.0},
            {"Relative": 55000000.0, "Cause": "World War II", "Century_String": "20th", "Death_Total": 55000000.0, "Year": 1945.0},
            {"Relative": 3000000.0, "Cause": "Chinese Civil Wars", "Century_String": "20th", "Death_Total": 3000000.0, "Year": 1950.0},
            {"Relative": 20000000.0, "Cause": "Josef Stalin", "Century_String": "20th", "Death_Total": 20000000.0, "Year": 1953.0},
            {"Relative": 40000000.0, "Cause": "Mao Zedong", "Century_String": "20th", "Death_Total": 40000000.0, "Year": 1975.0},
        ]
        
        //When the window resizes, resize the graph
        $( window ).resize(function() {
            compare_graph.resize();
        });
        
        $('#change_graph').click(function(){
            compare_graph.update_data();
        })
        
        //Init the graph
        var compare_graph = new compare_graph_class(the_data, 'graph');
        compare_graph.draw();
    });
});

function compare_graph_class(the_data, graph_container_id){
    /*Class for the compare graph*/
    
    var self = this;
    self.margin = {};
    self.current_data = 'death_total';
    self.data = the_data;
    self.graph_container_id = graph_container_id

    self.update_data = function(){
        /*Switches the data from absolute to relative dataset or visa-versa*/
            
            //change to relative
            if (self.current_data == 'death_total') {
                self.current_data = 'relative';
                
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
                self.graph_title.text('Death Toll - 1950 Equivalent');
            }
            
            //change to absolute
            else if (self.current_data == 'relative') {
                self.current_data = 'death_total';
                
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
                self.graph_title.text('Absolute Death Toll');
            }
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
        
        //Update the graph title position
        self.graph_title
            .attr("x", (self.width / 2))
            .attr("y", (0 - self.margin.top/2));
        
        //Rescale the range and axis functions to account for the new dimensions
        self.xRange
            .rangeRoundBands([0, self.width], .1);
        self.xAxis
            .scale(self.xRange);
        self.yRange
            .range([self.height, 0]);
        self.yAxis
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
        
        //Add the graph title
        self.graph_title = self.svg_g.append("text")
            .attr("x", (self.width / 2))             
            .attr("y", (0 - self.margin.top/2))
            .attr("text-anchor", "middle")
            .attr('id', 'graph_title')
            .text("Absolute Death Toll");
                    
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
            .tickSize(5)
            .orient('left')
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
    
    }//End draw graph
    
    /* Reusable functions********************/
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
            top: 30,
            right: 0,
            bottom: 300,
            left: left_margin()
        };
        self.width = graph_container_width - self.margin.right - self.margin.left;
        self.height = 550 - self.margin.top - self.margin.bottom;
    }
    
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
        var text_height = $('.tick_labels').height();
        if (text_height > self.xRange.rangeBand()) {
            var rotate_angle_radians = Math.PI/2;
            var dx = 0;
            var dy = 0;
        }
        else{
            var x0 = self.xRange.rangeBand()/2 + self.margin.left;
            var text_length = $('.tick_labels').width();
            var rotate_angle_radians = Math.cos(x0/text_length) + 0.2*Math.cos(x0/text_length);
            var dx = text_height/2 * Math.cos(rotate_angle_radians)
            var dy = text_height/2 * Math.sin(rotate_angle_radians);
        }
        var rotate_angle_degrees = rotate_angle_radians * 180/Math.PI;
        
        return "rotate(-"+rotate_angle_degrees+") translate("+dy+","+dx+")"
    }
}
