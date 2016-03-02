
function create_graph_title_footer(graph_object){
    /*Creates the graph title, and footer with data sources notes, and dowloads*/
    
    //Create Graph Title
    graph_object.graph_element.prepend('<div class="row title_row" id=title_row_'+graph_object.graph_container_id+'>');
    graph_object.title_row = $('#title_row_'+graph_object.graph_container_id);
    graph_object.title_row.prepend('<div class="graph_title" id="title_'+graph_object.graph_container_id+'">'+graph_object.title_text+'</div>');
    graph_object.title = $('#title_'+graph_object.graph_container_id);
    
    //Create Graph Notes, Sources
    graph_object.graph_element.append('<div class="row source_row" id=source_row_'+graph_object.graph_container_id+'>');
    graph_object.source_row = $('#source_row_'+graph_object.graph_container_id);
    
    //Notes
    var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Notes</h4></div>';
    var modal_body = '<div class="modal-body">'+graph_object.notes+'</div>';
    var modal = '<div class="modal fade" id="notes_modal_'+graph_object.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
    graph_object.data_modal = $('#notes_modal_'+graph_object.graph_container_id);
    graph_object.source_row.append('<div class="col-xs-6 col-sm-3"><a id=notes_link_'+graph_object.graph_container_id+' data-toggle="modal" data-target="#notes_modal_'+graph_object.graph_container_id+'">Graph Notes</a></div>'+modal);
    graph_object.data_source_link = $('#notes_link_'+graph_object.graph_container_id);
    
    //Data
    var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Data Sources</h4></div>';
    var modal_body = '<div class="modal-body">'+graph_object.data_source+'</div>';
    var modal = '<div class="modal fade" id="data_source_modal_'+graph_object.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
    graph_object.data_modal = $('#data_source_modal_'+graph_object.graph_container_id);
    graph_object.source_row.append('<div class="col-xs-6 col-sm-3"><a id=data_source_link_'+graph_object.graph_container_id+' data-toggle="modal" data-target="#data_source_modal_'+graph_object.graph_container_id+'">Data Sources</a></div>'+modal);
    graph_object.data_source_link = $('#data_source_link_'+graph_object.graph_container_id);
    graph_object.graph_element.append('<div class="row controls_row" id=controls_row_'+graph_object.graph_container_id+'>');
    
    //Code
    graph_object.source_row.append('<div class="col-xs-6 col-sm-3"><a class="source code" target="_blank" href='+graph_object.source_code+'>Source Code</a></div>');
    
    //Downloads
    var image_link = '<a href="'+graph_object.image+'" download>static image</a>'
    var json_data = JSON.stringify(graph_object.data);
    var json_link = '<a href="data:text/json;charset=utf-8,'+encodeURIComponent(json_data)+'" download="data.json"" target="_blank">JSON data</a>';
    var csv_link = '<a href="'+graph_object.csv_file+'" download>CSV Data</a>';
    
    var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Downloads</h4></div>';
    var modal_body = '<div class="modal-body"><p>'+image_link+'</p><p>'+json_link+'</p><p>'+csv_link+'</p></div>';
    var modal = '<div class="modal fade" id="downloads_modal_'+graph_object.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
    graph_object.downloads_modal = $('#downloads_modal_'+graph_object.graph_container_id);
    graph_object.source_row.append('<div class="col-xs-6 col-sm-3"><a id=downloads_link_'+graph_object.graph_container_id+' data-toggle="modal" data-target="#downloads_modal_'+graph_object.graph_container_id+'">Downloads</a></div>'+modal);
    graph_object.data_source_link = $('#downloads_link_'+graph_object.graph_container_id);
}

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