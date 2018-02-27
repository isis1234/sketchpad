var canvas,ctx;
var canvas_color,ctx_color;
var dia, r, g, b, a; a=255;
var mouseX,mouseY,mouseDown=0;
var isDrawing, lastPoint;
var options = {  
    year: "numeric", month: "numeric", day: "numeric", 
    hour: "numeric", minute: "numeric", second: "numeric"  
};  

function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) 
            + Math.pow(point2.y - point1.y, 2));
}

function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x
                    , point2.y - point1.y );
}

function sketchpad_mouseDown(e){
    isDrawing = true;
    lastPoint = { x: e.clientX, y: e.clientY };
}

function sketchpad_mouseMove(e){
    if (!isDrawing) return;

    var currentPoint = { x: e.clientX, y: e.clientY };
    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);

    for (var i = 0; i < dist; i+=5) {
        x = lastPoint.x + (Math.sin(angle) * i);
        y = lastPoint.y + (Math.cos(angle) * i);
        ctx.beginPath();
        ctx.arc(x, y, dia, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        // ctx.stroke();
    }

    lastPoint = currentPoint;
}

function sketchpad_mouseUp(){
    //check drawing
    isDrawing = false;
}

function drawDot(ctx,x,y,size) {
    // Select a fill style
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

    // Draw a filled circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2, true); 
    ctx.closePath();
    ctx.fill();

    // $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + '> (' + x + ", " + y + ")<br />");
} 

function clearCanvas(canvas,ctx) {
    ctx.clearRect(0, 0, 
        canvas.width, canvas.height);
}

function defineSketchpad(){
    canvas = document.getElementById('sketchpad');
    if (canvas.getContext){
        ctx = canvas.getContext('2d');
        canvas.width = 5000;
        canvas.height = 5000;
    }
    if (ctx) {
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);
    }
}

function defineColor(){
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

$(document).ready(function(){
    $("#r").val(Math.random()*100);
    $("#g").val(Math.random()*100);
    $("#b").val(Math.random()*100);    
    r = $("#r").val(); g=$("#g").val(); b=$("#b").val();
    dia = $("#dia").val();

    defineSketchpad();
    defineColor();

    $(document).on('input', '#dia', function() {
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
        dia = $(this).val();
        drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2, dia); 
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set diameter: " + dia + "<br />");
    });    

    $(document).on('input', '#b', function() {
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
        b = $(this).val();
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2, dia); 
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Blue: " + b + "<br />");
    });

    $(document).on('input', '#g', function() {
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
        g = $(this).val();
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2, dia); 
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Green: " + g + "<br />");
    });

    $(document).on('input', '#r', function() {
        canvas_color.width = $( "#colorside" ).width();
        canvas_color.height = $( "#colorside" ).height();
        r = $(this).val();
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
        drawDot(ctx_color,$( "#colorside" ).width()/2,$( "#colorside" ).height()/2, dia); 
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Set Red: " + r + "<br />");
    });

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

    $("#view").click(function(){
        $("#result").prepend("<image id='theimage' width='450' height='300'></image>");
        document.getElementById("theimage").src = canvas.toDataURL();
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> View Image<br />");
    });

    $("#download").click(function(){
        Canvas2Image.saveAsPNG(canvas);
        $("#console_box").prepend("<" + (new Date()).toLocaleTimeString("en-us", options) + "> Download Image<br />");
    });
});
