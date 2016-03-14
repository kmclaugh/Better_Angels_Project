var line_graph;

$(window).load(function () {
    
    $(document).ready(function () {
        
        
        var the_data = [
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
            ]},
            {'Country':'Scandinavia', 'name':'scandinavia', 'display':'hidden', 'values':[
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
            {'Country':'!Kung', 'name':'kung', 'display':'hidden', 'values':[{x:1250, y:42}]}
        ]
        
        //When the window resizes, resize the graph
        $( window ).resize(function() {
            line_graph.resize();
        });
        $(document).on("click", '.legend_button', function() {
            line_graph.update_data($(this).attr('data_index'));
        });
        $(document).on("click", '#log_scale_homocide_rates_graph', function() {
            line_graph.toggle_scale();
        });
        $(document).on("click", '#save', function() {
            save_graph_object_to_image(line_graph, 1170, 500);
        });
        
        //Init the graph
        var graph_source_code = 'https://github.com/kmclaugh/Better_Angels_Project/tree/master/Homocide_Rates_for_Western_Europe_and_Prestate_Societies';
        var graph_note = '<sup>1</sup>Nonstate Average is a geometric mean of 26 societies, not including Semai, Inuit, and !Kung</br>';
        graph_note += '<sup>2</sup>European Average is a geometric mean of five regions with missing data interpolated.';
        var data_source = '<strong><i>The Better Angels of Our Nature</i> Sources:</strong> <p> European Data: </p> <p> <a href="https://books.google.com/books?id=J7ATQb6LZX0C&lpg=PT80&dq=%22FIGURE%203%E2%80%93%203.%20Homicide%20rates%20in%20five%20Western%20European%20regions%2C%201300%E2%80%93%202000%22&pg=PT81#v=onepage&q=%22FIGURE%203%E2%80%93%203.%20Homicide%20rates%20in%20five%20Western%20European%20regions,%201300%E2%80%93%202000%22&f=false" target="_blank"> Figure 3-3 in The Better Angels of Our Nature. Page 63, Kindle Location 1629. </a> </p> <p> <a href="https://books.google.com/books?id=J7ATQb6LZX0C&lpg=PT82&dq=%22FIGURE%203%E2%80%93%204.%20Homicide%20rates%20in%20Western%20Europe%2C%201300%E2%80%93%202000%22&pg=PT82#v=onepage&q=%22FIGURE%203%E2%80%93%204.%20Homicide%20rates%20in%20Western%20Europe,%201300%E2%80%93%202000%22&f=false" target="_blank"> Figure 3-4 in The Better Angels of Our Nature. Page 64, Kindle Location 1649. </a> </p> <p> Non-state Data: </p> <p> <a href="https://books.google.com/books?id=J7ATQb6LZX0C&lpg=PT82&dq=%22FIGURE%203%E2%80%93%204.%20Homicide%20rates%20in%20Western%20Europe%2C%201300%E2%80%93%202000%22&pg=PT82#v=onepage&q=%22FIGURE%203%E2%80%93%204.%20Homicide%20rates%20in%20Western%20Europe,%201300%E2%80%93%202000%22&f=false" target="_blank"> Figure 2-3 in The Better Angels of Our Nature. Page 53, Kindle Location 1459. </a> </p> <p> <a href="https://books.google.com/books?id=J7ATQb6LZX0C&lpg=PT82&dq=%22FIGURE%203%E2%80%93%204.%20Homicide%20rates%20in%20Western%20Europe%2C%201300%E2%80%93%202000%22&pg=PT82#v=onepage&q=%22FIGURE%203%E2%80%93%204.%20Homicide%20rates%20in%20Western%20Europe,%201300%E2%80%93%202000%22&f=false" target="_blank"> Figure 2-4 in The Better Angels of Our Nature. Page 55, Kindle Location 1503. </a> </p> <p> <strong>Original Sources:</strong> </p> <p> European Data: </p> <p> 1300-1984 from <a href="https://soci.ucalgary.ca/brannigan/sites/soci.ucalgary.ca.brannigan/files/long-term-historical-trends-of-violent-crime.pdf#page=13" target="_blank"> Table 1 in Manual Eisner (2003) - Long-Term Historical Trends in Violent Crime. In Crime and Justice. Page 99. </a> </p> <p> 2010 from <a href="http://www.unodc.org/gsh/en/data.html" target="_blank"> Homicide counts and rates, time series 2000-2012. By United Nations Office on Drugs and Crime. </a> </p> <p> <i>via:</i> <a href="http://ourworldindata.org/data/violence-rights/homicides/#homicide-rates-in-five-western-european-regions-1300-2010-max-roserref" target="_blank"> Max Roser (2015) - "Homicides". At OurWorldInData.org. </a> </p> <p> Non-state Data: </p> <p> Kung! and Inuit from <a href="http://www.amazon.com/War-Human-Civilization-Azar-Gat-ebook/dp/B006QV81C6/ref=mt_kindle?_encoding=UTF8&me=" target="_blank"> Azar Gat (2008) - War in Human Civilization. </a> </p> <p> Semai and average from <a href="http://www.amazon.com/War-before-Civilization-Lawrence-Keeley-ebook/dp/B005JC0PTK/ref=mt_kindle?_encoding=UTF8&me=" target="_blank"> Keeley (1997) - War Before Civilization: The Myth of the Peaceful Savage. </a> </p> <p> <i>via:</i> <a href="http://ourworldindata.org/data/violence-rights/ethnographic-and-archaeological-evidence-on-violent-deaths/#rate-of-violent-deaths-in-non-state-societies-max-roserref" target="_blank"> Max Roser (2015) - "Rate of Violent Deaths in State and Non-State Societies". At OurWorldInData.org. </a> </p>';
        var graph_title = 'Homocide Rates for Western Europe and Prestate Societies'
        var graph_decription = 'Long term homocide rates for Western Europe 1300-200 compared to prestate societies'
        var graph_slug = 'Homocide_Rates_for_Western_Europe_and_Prestate_Societies';
        var image = 'graph.png';
        var csv_file = 'data.csv';
        line_graph = new line_graph_class(the_data, 'homocide_rates_graph', graph_title, graph_slug, graph_note, graph_source_code, data_source, graph_decription, image, csv_file, false, false);
        line_graph.draw();
        //save_graph_object_to_image(line_graph, 1170, 500)
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

function line_graph_class(the_data, graph_container_id, title_text, slug, notes, source_code, data_source, description, image, csv_file, min_height, fixed_height){
    /*Class for the line graph*/
    
    var self = this;
    self.margin = {
        top: 10,
        right: 10,
        bottom: 20,
        left: 50
    };
    self.current_scale = 'log';
    self.slug = slug;
    self.data = the_data;
    self.graph_container_id = graph_container_id;
    self.graph_element = $('#'+self.graph_container_id);
    self.title_text = title_text;
    self.notes = notes;
    self.source_code = source_code;
    self.data_source = data_source;
    self.description = description;
    self.image = image;
    self.csv_file = csv_file;
    self.min_height = false;
    self.fixed_height = false;
    
    this.update_self = function(){
        self = this;
    }

    self.toggle_scale = function(){
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
                line.transition().attr("d", self.homocide_line_function(self.data[i].values));
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
                line.transition().attr("d", self.homocide_line_function(self.data[i].values));
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
                .attr("d", self.homocide_line_function(self.data[i].values))
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
        
        //Get the new graph dimensions
        set_graph_dimensions(self);
        
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
        self.y_axis_label
            .attr("y", 0 - self.margin.left)
            .attr("x",0 - (self.height / 2))
        
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
        set_graph_dimensions(self);
        //Create Graph SVG
        self.svg = d3.select('#'+self.graph_container_id)
            .append("svg")
                .attr('id', 'svg_'+self.graph_container_id)
                .attr("width", self.width + self.margin.left + self.margin.right)
                .attr("height", self.height + self.margin.top + self.margin.bottom);
        
        //Add a layer to the svg
        self.svg_g = self.svg.append("g")
            .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");
                    
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
        self.homocide_line_function = d3.svg.line()
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
                .attr("d", self.homocide_line_function(country.values));
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
            .text("Homocides per 100,000 per year");
        
        //Create Graph legend
        self.graph_element.prepend('<div class="row legend_row" id=legend_row_'+self.graph_container_id+'>')
        self.legend_row = $('#legend_row_'+self.graph_container_id);
        self.legend_row.append('<div class="col-xs-12 col-sm-2 scale_col" id=scale_col_'+self.graph_container_id+'></div>')
        self.scale_col = $('#scale_col_'+self.graph_container_id);
        self.legend_row.append('<div class="col-xs-12 col-sm-10" id=legend_col_'+self.graph_container_id+'></div>')
        self.legend_col = $('#legend_col_'+self.graph_container_id);
        var i = 0;
        self.data.forEach(function(datum){
            var legend_element = '<button class="legend_button" data_index='+i+' id=legend_id'+i+'><svg width="15" height="14" style="vertical-align: middle"><circle id=circle_id'+i+' class="legend series visibility_'+datum.display+' '+datum.name+'" r="5" cx="6" cy="7"></circle></svg>'+datum.Country+'</button>';
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


function order_of_magnitude(n) {
    /*Return the order of magnitude of n*/
    var order = Math.floor(Math.log(n) / Math.LN10
                       + 0.000000001); // because float math sucks like that
    return Math.pow(10,order);
}
