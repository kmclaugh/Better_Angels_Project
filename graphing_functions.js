
function set_graph_dimensions(graph_object, min_height){
    /*Resets the higheth width and margins based on the containing width and height*/
    var graph_container_width = graph_object.graph_element.width();
    var graph_container_height = graph_object.graph_element.height();
    if (graph_container_height < min_height){
        graph_container_height = min_height;
    }
    graph_object.width = graph_container_width - graph_object.margin.right - graph_object.margin.left;
    graph_object.height = graph_container_height - graph_object.margin.top - graph_object.margin.bottom;
}