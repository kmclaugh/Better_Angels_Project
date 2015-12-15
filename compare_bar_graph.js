var max_cdf_surge = 30;
var max_cdf_standard_dev = Math.round(max_cdf_surge/5);
var number_of_drivers = 100
var margin = {
        top: 30,
        right: 0,
        bottom: 300,
        left: 200
    };
var width = 900 - margin.right - margin.left;
var height = 550 - margin.top - margin.bottom;
var current_data = 'death_total';

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
        
        $('#change_graph').click(function(){
            //Update all rects
            if (current_data == 'death_total') {
                //change to relative
                var svg = d3.select('#graph')
                var yRange = d3.scale.linear()
                    .range([height, 0])
                    .domain([0, 450]);
                var yAxis = d3.svg.axis()
                    .scale(yRange)
                    .tickSize(5)
                    .orient('left')
                    .tickSubdivide(true);
                svg.selectAll("rect")
                   .data(the_data)
                   .transition()
                   .attr("y", function(d) { return yRange(d.Relative/1000000); })
                   .attr("height", function(d) { return height - yRange(d.Relative/1000000); });
                svg.selectAll("g.y.axis")
                    .transition()
                    .call(yAxis)
                var graph_title = d3.select('#graph_title');
                graph_title.text('Death Toll - 1950 Equivalent');
                current_data = 'relative';
            }
            else if (current_data == 'relative') {
                //change to death total
                var svg = d3.select('#graph')
                var yRange = d3.scale.linear()
                    .range([height, 0])
                    .domain([0, 55]);
                var yAxis = d3.svg.axis()
                    .scale(yRange)
                    .tickSize(5)
                    .orient('left')
                    .tickSubdivide(true);
                svg.selectAll("rect")
                   .data(the_data)
                   .transition()
                   .attr("y", function(d) { return yRange(d.Death_Total/1000000); })
                   .attr("height", function(d) { return height - yRange(d.Death_Total/1000000); });
                svg.selectAll("g.y.axis")
                    .transition()
                    .call(yAxis)
                var graph_title = d3.select('#graph_title');
                graph_title.text('Absolute Death Toll');
                current_data = 'death_total';
            }
            
        })
        
        var column_width = $('#graph_column').width();
        margin = {
            top: 30,
            right: 0,
            bottom: 300,
            left: 60
        };
        width = column_width - margin.right - margin.left;
        height = 550 - margin.top - margin.bottom;
        current_data = 'death_total';
        draw_graph(the_data);
        
    });
});

function draw_graph(the_data){
    
    
    
    var svg = d3.select('#graph')
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");
    
    //Add the graph title
    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", (0 - margin.top/2))
        .attr("text-anchor", "middle")  
        .style("font-size", "16px")
        .attr('id', 'graph_title')
        .text("Absolute Death Toll");
                
    var xRange = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1)
        .domain(the_data.map(function(d) {
                return [d.Cause, d.Century_String];
            })
        );
      
    var yRange = d3.scale.linear()
        .range([height, 0])
        .domain([0, 55]);
    
    var xAxis = d3.svg.axis()
        .scale(xRange)
        .orient("bottom")
        .tickFormat('');
        
      
    var yAxis = d3.svg.axis()
        .scale(yRange)
        .tickSize(5)
        .orient('left')
        .tickSubdivide(true);
  
    //add the x-axis
    svg.append('svg:g')
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr('class', 'tick_labels')
            .text(function(d){
                if (d[0] == 'Mao Zedong') {
                    return d[0] + ' - ' + '(' + d[1] + ' Century)';
                }
                else{
                    return d[0] + ' - ' + '(' + d[1] + ')';
                }
            })
            .attr("transform", function(){
                var text_height = $('.tick_labels').height();
                if (text_height > xRange.rangeBand()) {
                    var rotate_angle_radians = Math.PI/2;
                    var dx = 0;
                    var dy = 0;
                }
                else{
                    var x0 = xRange.rangeBand()/2 + margin.left;
                    var text_length = $('.tick_labels').width();
                    var rotate_angle_radians = Math.cos(x0/text_length) + 0.2*Math.cos(x0/text_length);
                    var dx = text_height/2 * Math.cos(rotate_angle_radians)
                    var dy = text_height/2 * Math.sin(rotate_angle_radians);
                }
                var rotate_angle_degrees = rotate_angle_radians * 180/Math.PI;
                
                return "rotate(-"+rotate_angle_degrees+") translate("+dy+","+dx+")"
            });
    
    
    //Add the y-axis
    svg.append('svg:g')
        .attr('class', 'y axis')
        .call(yAxis)
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .attr('id', 'y_axis_label')
        .text("Millions of Deaths");
    

    var bar = svg.selectAll("bar")
      .data(the_data)
    .enter().append("rect")
      .style("fill", "red")
      .attr("x", function(d) { return xRange([d.Cause, d.Century_String]); })
      .attr("width", xRange.rangeBand())
      .attr("y", function(d) { return yRange(d.Death_Total/1000000); })
      .attr("height", function(d) { return height - yRange(d.Death_Total/1000000); });
      
    
}
