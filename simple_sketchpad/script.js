// Variables for referencing the canvas and 2dcanvas context
var canvas,ctx;
var canvas_color,ctx_color;
var dia, r, g, b, a; a=255;

// Variables to keep track of the mouse position and left-button status 
var mouseX,mouseY,mouseDown=0;

var options = {  
    year: "numeric", month: "numeric", day: "numeric", 
    hour: "numeric", minute: "numeric", second: "numeric"  
};  

// Draws a dot at a specific position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
function drawDot(ctx,x,y,size) {
    // Select a fill style
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

    // Draw a filled circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();

    if(ctx.canvas.id == "sketchpad"){
        if(x && y)
            $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + '> (' + x + ", " + y + ")<br />");
    }
} 

// Clear the canvas context using the canvas width and height
function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
    mouseDown=1;
    drawDot(ctx,mouseX,mouseY,dia);
}

// Keep track of the mouse button being released
function sketchpad_mouseUp() {
    mouseDown=0;
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) { 
    // Update the mouse co-ordinates when moved
    getMousePos(e);

    // Draw a dot if the mouse button is currently being pressed
    if (mouseDown==1) {
        drawDot(ctx,mouseX,mouseY,dia);
    }
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
    if (!e)
        var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
 }


// Set-up the canvas and add our event handlers after the page has loaded
function init() {
    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    r=$("#r").val(); g=$("#g").val(); b=$("#b").val();

    dia = $("#dia").val();
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        canvas.width = 5000;
        canvas.height = 5000;
    }


    // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);
    }

    canvas_color = document.getElementById('color');
    if (canvas_color.getContext){
        ctx_color = canvas_color.getContext('2d');
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
    }
    if (ctx_color) {
    }
    drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2,dia) 
}

function to_image(){
    $("#result").prepend("<image id='theimage'></image>");
    document.getElementById("theimage").src = canvas.toDataURL();
    // Canvas2Image.saveAsPNG(canvas);
}

$(document).ready(function(){
    $("#r").val(Math.random()*100);
    $("#g").val(Math.random()*100);
    $("#b").val(Math.random()*100);

    $("#clear").click(function() {
        clearCanvas(canvas,ctx);
        $("#theimage").remove();
        $("#console_box").empty();
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Empty<br />");
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set diameter: " + dia + "<br />");
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Red: " + r + "<br />");
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Green: " + g + "<br />");
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Blue: " + b + "<br />");
    });
    $('#dia').change( function() { 
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
        dia = $(this).val();
        drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2, dia); 
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set diameter: " + dia + "<br />");
    });
    $('#r').change( function() { 
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
        r = $(this).val();
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2, dia); 
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Red: " + r + "<br />");
    });
    $('#g').change( function() { 
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
        g = $(this).val();
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2, dia); 
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Green: " + g + "<br />");
    });
    $('#b').change( function() { 
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
        b = $(this).val();
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2, dia); 
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Blue: " + b + "<br />");
    });
});