
function create_graph_title_footer(graph_object){
    /*Creates the graph title, and footer with data sources notes, and downloads*/
    
    //Create Graph Title
    graph_object.graph_element.prepend('<div class="row title_row" id=title_row_'+graph_object.graph_container_id+'>');
    graph_object.title_row = $('#title_row_'+graph_object.graph_container_id);
    graph_object.title_row.prepend('<div class="graph_title" id="title_'+graph_object.graph_container_id+'">'+graph_object.title_text+'</div>');
    graph_object.title = $('#title_'+graph_object.graph_container_id);
    
    //Create Graph Notes, Sources
    graph_object.graph_element.append('<div class="row source_row" id=source_row_'+graph_object.graph_container_id+'>');
    graph_object.source_row = $('#source_row_'+graph_object.graph_container_id);
    //Display row
    graph_object.graph_element.append('<div class="row display_source_row" id=display_source_row_'+graph_object.graph_container_id+'></div>');
    graph_object.display_source_row = $('#display_source_row_'+graph_object.graph_container_id);
    graph_object.display_source_row.hide()
    
    //Notes
    var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Notes</h4></div>';
    var modal_body = '<div class="modal-body">'+graph_object.notes+'</div>';
    var modal = '<div class="modal fade" id="notes_modal_'+graph_object.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
    graph_object.data_modal = $('#notes_modal_'+graph_object.graph_container_id);
    graph_object.source_row.append('<div class="col-xs-6 col-sm-3"><a id=notes_link_'+graph_object.graph_container_id+' data-toggle="modal" data-target="#notes_modal_'+graph_object.graph_container_id+'">Graph Notes</a></div>'+modal);
    graph_object.data_source_link = $('#notes_link_'+graph_object.graph_container_id);
    //Notes display
    graph_object.display_source_row.append('<p>'+graph_object.notes+'</p>');
    
    //Data
    var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Data Sources</h4></div>';
    var modal_body = '<div class="modal-body">'+graph_object.data_source+'</div>';
    var modal = '<div class="modal fade" id="data_source_modal_'+graph_object.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
    graph_object.data_modal = $('#data_source_modal_'+graph_object.graph_container_id);
    graph_object.source_row.append('<div class="col-xs-6 col-sm-3"><a id=data_source_link_'+graph_object.graph_container_id+' data-toggle="modal" data-target="#data_source_modal_'+graph_object.graph_container_id+'">Data Sources</a></div>'+modal);
    graph_object.data_source_link = $('#data_source_link_'+graph_object.graph_container_id);
    //Data display
    graph_object.display_source_row.append('<p>Interactive graph and data source available at: <a>www.countingcalculi.com/better_angels_project/'+graph_object.slug+'</a></p>');
    
    //Code
    graph_object.source_row.append('<div class="col-xs-6 col-sm-3"><a class="source code" target="_blank" href='+graph_object.source_code+'>Source Code</a></div>');
    //Code display
    graph_object.display_source_row.append('<p>Code available at: <a>'+graph_object.source_code+'</a></p>');
    
    //Downloads
    var image_link = '<a href="'+graph_object.image+'" download>static image</a>'
    var json_data = JSON.stringify(graph_object.data);
    var json_link = '<a href="data:text/json;charset=utf-8,'+encodeURIComponent(json_data)+'" download="data.json"" target="_blank">JSON data</a>';
    var csv_link = '<a href="'+graph_object.csv_file+'" download>CSV Data</a>';
    var current_image_link = '<a id="save">Save as Image</a>';
    
    var modal_header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Downloads</h4></div>';
    var modal_body = '<div class="modal-body"><p>'+image_link+'</p><p>'+json_link+'</p><p>'+csv_link+'</p><p>'+current_image_link+'</p></div>';
    var modal = '<div class="modal fade" id="downloads_modal_'+graph_object.graph_container_id+'" role="dialog"><div class="modal-dialog"><div class="modal-content">'+modal_header+modal_body+'</div></div>';
    graph_object.downloads_modal = $('#downloads_modal_'+graph_object.graph_container_id);
    graph_object.source_row.append('<div class="col-xs-6 col-sm-3"><a id=downloads_link_'+graph_object.graph_container_id+' data-toggle="modal" data-target="#downloads_modal_'+graph_object.graph_container_id+'">Downloads</a></div>'+modal);
    graph_object.data_source_link = $('#downloads_link_'+graph_object.graph_container_id);
}

function save_graph_object_to_image(graph_object, image_width, image_height){
    /*Saves the given graph object to an image by reseting the viewport the given size, saving the image,
     *and returning the viewport and graph to it's original size*/

    //resize the window and graph to get a better size image
    var viewport_tag = $('#viewport_tag')[0].outerHTML;
    $('#viewport_tag').attr('content', 'width='+image_width+1+' initial-scale=0, maximum-scale=1.0, minimum-scale=0.25, user-scalable=yes')
    $('.container').attr('style', 'width: '+image_width+'px; max-width: none!important; height: '+image_height+'px;');
    
    //Set the width
    graph_object.graph_element.parent().width(image_width);
    add_class(graph_object.graph_element, 'force-sm');
    graph_object.resize();
    toggle_source_display(graph_object);
    
    //Set the height
    var non_graph_height = graph_object.graph_element.height() - $('#svg_'+graph_object.graph_container_id).height();
    graph_object.fixed_height = image_height - non_graph_height;
    graph_object.resize();
    
    //Save the image
    save_graph_to_image(graph_object.graph_element, graph_object.slug, image_width, image_height);
    
    //Return the window and graph to their original size
    $('#viewport_tag').remove();
    $('head').prepend(viewport_tag);
    $('.container').attr('style', '');
    graph_object.graph_element.parent().css('width', '');
    remove_class(graph_object.graph_element, 'force-sm');
    toggle_source_display(graph_object);
    graph_object.fixed_height = false;
    graph_object.resize();
}

function toggle_source_display(graph_object){
    /*Toggles the display of the source row from links to display or vise-versa*/
    if (graph_object.display_source_row.is(':visible')) {
        graph_object.display_source_row.hide()
        graph_object.source_row.show();
    }
    else{
        graph_object.display_source_row.show();
        graph_object.source_row.hide()
    }
}

function set_graph_dimensions(graph_object){
    /*Resets the heighth, width and margins based on the containing width and height*/
    var graph_container_height
    if (graph_object.fixed_height == false){
        graph_container_height = $( window ).height()*.75;
        if (graph_object.min_height != false && graph_container_height < graph_object.min_height){
            graph_container_height = graph_object.min_height;
        }
    }
    else {
        graph_container_height = graph_object.fixed_height;
    }
    var graph_container_width = graph_object.graph_element.width();
    graph_object.width = graph_container_width - graph_object.margin.right - graph_object.margin.left;
    graph_object.height = graph_container_height - graph_object.margin.top - graph_object.margin.bottom;
}

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
