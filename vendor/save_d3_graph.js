function save_graph_to_image(graph_element, file_name, image_width, image_height){
    /*Saves the given d3 graph element to a png file with the given dimensions and file_name*/
    
    //Create html copy element
    var html = graph_element.clone()[0].outerHTML;
    $('body').append('<div id="graph_copy_container" style="height:'+image_height+'px; width:'+image_width+'px;" ><div id="graph_copy"></div></div>')
    $('#graph_copy').html(html);
    //Add all css style to the both svg and any regular html
    $('#graph_copy').inlineStyler(svg_cssRules);
    $('#graph_copy').inlineStyler();
    
    //Convert the graph to canvas
    var imgsrc;
    html2canvas($("#graph_copy"), {
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            imgsrc = canvas.toDataURL("image/png");
            var img = '<img src="'+imgsrc+'">'; 
            var context = canvas.getContext("2d");
        
            //Create an image object
            var image = new Image;
            image.src = imgsrc;
            image.onload = function() {
                context.drawImage(image, 0, 0);
                
                //Store the image in a download link and click the link
                var a = document.createElement("a");
                a.download = file_name + "-custom.png";
                a.href = canvas.toDataURL("image/png");
                a.click();
            };
            
            //Delete the now unnecessar graph_copy_container
            $('#graph_copy_container').remove();
        },
        background: '#FFFFFF'
    });
    
};