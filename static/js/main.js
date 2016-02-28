var realWidth = 1000;
var realHeight = 1000;
var paper = new Raphael('drawboard');
var svg = paper.canvas;

svg.setAttribute('viewBox', '0 0 ' + realWidth + ' ' + realHeight);
svg.removeAttribute('width');
svg.removeAttribute('height');

function drawSpacer(x1, y1, x2, y2, size, width, height) {
    size = typeof size !== 'undefined' ? size : 4;
    width = typeof width !== 'undefined' ? width : 2.5*size;
    height = typeof height !== 'undefined' ? height : 3*size;

    var angle = Raphael.angle(x1, y1, x2, y2);
    var angle_diff_1 = Raphael.deg(Math.tan(width/2/height));
    var angle_diff_2 = Raphael.deg(Math.tan(size/2/height));
    var length_1 = Math.hypot(width/2, height);
    var length_2 = Math.hypot(size/2, height);

    var a_outer = Raphael.rad(angle-angle_diff_1);
    var a_outer_m = Raphael.rad(angle+angle_diff_1);
    var a_inner = Raphael.rad(angle-angle_diff_2);
    var a_inner_m = Raphael.rad(angle+angle_diff_2);
    var a_outer_r = Raphael.rad(angle-(180-angle_diff_1));
    var a_outer_r_m = Raphael.rad(angle+(180-angle_diff_1));
    var a_inner_r = Raphael.rad(angle-(180-angle_diff_2));
    var a_inner_r_m = Raphael.rad(angle+(180-angle_diff_2));

    var x_a = x1;
    var y_a = y1;
    var x_b = x1 + Math.cos(a_outer_r) * length_1;
    var y_b = y1 + Math.sin(a_outer_r) * length_1;
    var x_c = x1 + Math.cos(a_inner_r) * length_2;
    var y_c = y1 + Math.sin(a_inner_r) * length_2;
    var x_d = x2 + Math.cos(a_inner) * length_2;
    var y_d = y2 + Math.sin(a_inner) * length_2;
    var x_e = x2 + Math.cos(a_outer) * length_1;
    var y_e = y2 + Math.sin(a_outer) * length_1;
    var x_f = x2;
    var y_f = y2;
    var x_g = x2 + Math.cos(a_outer_m) * length_1;
    var y_g = y2 + Math.sin(a_outer_m) * length_1;
    var x_h = x2 + Math.cos(a_inner_m) * length_2;
    var y_h = y2 + Math.sin(a_inner_m) * length_2;
    var x_i = x1 + Math.cos(a_inner_r_m) * length_2;
    var y_i = y1 + Math.sin(a_inner_r_m) * length_2;
    var x_j = x1 + Math.cos(a_outer_r_m) * length_1;
    var y_j = y1 + Math.sin(a_outer_r_m) * length_1;
    return paper.path(
        "M"+x_a+" "+y_a+
        "L"+x_b+" "+y_b+
        "L"+x_c+" "+y_c+
        "L"+x_d+" "+y_d+
        "L"+x_e+" "+y_e+
        "L"+x_f+" "+y_f+
        "L"+x_g+" "+y_g+
        "L"+x_h+" "+y_h+
        "L"+x_i+" "+y_i+
        "L"+x_j+" "+y_j+
        "z"
    ).attr({'stroke': '0'});
}

function drawSpacerText(text, x, y) {
    return paper.text(x, y, text).attr({
        'font-size': 50
    });
}

function drawA(width, height, a, b) {
    paper.clear();

    var ratio = realWidth/Math.max(width, height);
    var alpha = Math.atan(2*height/width);
    // big shape
    var widthOffset1 = (width/2)*ratio;
    var widthOffset2 = (width/2-a)*ratio;
    var widthOffset3 = (width/2-a-b/Math.tan(alpha))*ratio;
    var heightOffset1 = (height/2)*ratio;
    var heightOffset2 = (height/2-b)*ratio;
    var dataPointsBig = new Array();
    dataPointsBig.push({'x': realWidth/2 - widthOffset1, 'y': realHeight/2 + heightOffset1});  // a
    dataPointsBig.push({'x': realWidth/2 - widthOffset2, 'y': realHeight/2 + heightOffset1});  // b
    dataPointsBig.push({'x': realWidth/2 - widthOffset3, 'y': realHeight/2 + heightOffset2}); // c
    dataPointsBig.push({'x': realWidth/2 + widthOffset3, 'y': realHeight/2 + heightOffset2}); // d
    dataPointsBig.push({'x': realWidth/2 + widthOffset2, 'y': realHeight/2 + heightOffset1}); // e
    dataPointsBig.push({'x': realWidth/2 + widthOffset1, 'y': realHeight/2 + heightOffset1}); // f
    dataPointsBig.push({'x': realWidth/2, 'y': realHeight/2 - heightOffset1}); // g

    // small hole
    var dataPointsSmall = new Array();
    var widthOffset4 = widthOffset3 - a*Math.sin(alpha)/Math.tan(alpha)*ratio;
    var heightOffset3 = height/2 - a/Math.tan(alpha)*ratio;
    var heightOffset4 = heightOffset2 - a*Math.sin(alpha)*ratio;
    dataPointsSmall.push({'x': realWidth/2, 'y': realHeight/2 + heightOffset3})
    dataPointsSmall.push({'x': realWidth/2 + widthOffset4, 'y': realHeight/2 + heightOffset4})
    dataPointsSmall.push({'x': realWidth/2 - widthOffset4, 'y': realHeight/2 + heightOffset4})

    var d = 'M' + $.map(dataPointsBig, function(el) { return el.x + ' ' + el.y}).join('L') + 'z';
    d += 'M' + $.map(dataPointsSmall, function(el) { return el.x + ' ' + el.y}).join('L') + 'z';

    p = paper.path(d);
    p.node.id = 'raphael-letter';
    p.attr({
        'stroke': 0
    });

    // a
    p = drawSpacer(
        realWidth/2 - (width/2-b/2/Math.tan(alpha))*ratio,
        realHeight/2 + (height/2-b/2)*ratio,
        realWidth/2 - (width/2-b/2/Math.tan(alpha)-a)*ratio,
        realHeight/2 + (height/2-b/2)*ratio);
    p.node.id = 'raphael-spacer-light';
    var t = drawSpacerText('a',
        realWidth/2 - (width/2-b/2/Math.tan(alpha)-a/2)*ratio,
        realHeight/2 + (height/2-b/2)*ratio - 30);
    t.node.id = 'raphael-text-light';

    // b
    p = drawSpacer(
        realWidth/2,
        realHeight/2 + (height/2-b)*ratio,
        realWidth/2,
        realHeight/2 + (height/2)*ratio);
    p.node.id = 'raphael-spacer-dark';
    t = drawSpacerText('b', realWidth/2 + 30, realHeight/2 + (height/2-b/2)*ratio);
    t.node.id = 'raphael-text-dark';
}

function calculatePerimeterA(width, height, a, b) {
    var alpha = Math.atan(2*height/width);
    var b1 = b/Math.sin(alpha)
    var c = Math.sqrt(height*height + width*width);
    var d = width-2*(a+Math.cos(alpha)*b)
    var f = width-2*(a+(b1*Math.sin(alpha)+a*Math.sin(alpha))/Math.tan(alpha))
    var e = Math.sqrt(Math.pow(height-b1*Math.sin(alpha)-a*Math.sin(alpha)-a*Math.tan(alpha), 2) + Math.pow(f/2, 2));
    var perimeter1 = (2*(a+b1+c)+d).toFixed(1);
    var perimeter2 = (2*e+f).toFixed(1);
    $('#perimeter').html('Umfang 1: ' + perimeter1 + 'cm<br/>Umfang 2: ' + perimeter2 + 'cm');
}

function drawE(width, height, a, b, c) {
    paper.clear();

    var ratio = realWidth/Math.max(width, height);
    // shape
    var dataPoints = new Array();
    var widthOffset1 = (width/2)*ratio;
    var widthOffset2 = (width/2-a)*ratio;
    var widthOffset3 = (width/2-c)*ratio;
    var heightOffset1 = (height/2)*ratio;
    var heightOffset2 = (height/2-b)*ratio;
    var heightOffset3 = (b/2)*ratio;
    dataPoints.push({'x': realWidth/2 - widthOffset1, 'y': realHeight/2 + heightOffset1});
    dataPoints.push({'x': realWidth/2 + widthOffset1, 'y': realHeight/2 + heightOffset1});
    dataPoints.push({'x': realWidth/2 + widthOffset1, 'y': realHeight/2 + heightOffset2});
    dataPoints.push({'x': realWidth/2 - widthOffset2, 'y': realHeight/2 + heightOffset2});
    dataPoints.push({'x': realWidth/2 - widthOffset2, 'y': realHeight/2 + heightOffset3});
    dataPoints.push({'x': realWidth/2 + widthOffset3, 'y': realHeight/2 + heightOffset3});
    dataPoints.push({'x': realWidth/2 + widthOffset3, 'y': realHeight/2 - heightOffset3});
    dataPoints.push({'x': realWidth/2 - widthOffset2, 'y': realHeight/2 - heightOffset3});
    dataPoints.push({'x': realWidth/2 - widthOffset2, 'y': realHeight/2 - heightOffset2});
    dataPoints.push({'x': realWidth/2 + widthOffset1, 'y': realHeight/2 - heightOffset2});
    dataPoints.push({'x': realWidth/2 + widthOffset1, 'y': realHeight/2 - heightOffset1});
    dataPoints.push({'x': realWidth/2 - widthOffset1, 'y': realHeight/2 - heightOffset1});

    var d = 'M' + $.map(dataPoints, function(el) { return el.x + ' ' + el.y}).join('L') + 'z';

    p = paper.path(d);
    p.node.id = 'raphael-letter';
    p.attr({
        'stroke': 0
    });

    // a
    p = drawSpacer(realWidth/2-(width/2*ratio), realHeight/2 - ((height/2*ratio)-(1.5*b*ratio))/2 - (b/2*ratio), realWidth/2-(width/2*ratio)+(a*ratio), realHeight/2 - ((height/2*ratio)-(1.5*b*ratio))/2 - (b/2*ratio));
    p.node.id = 'raphael-spacer-light';
    var t = drawSpacerText('a', realWidth/2-(width/2*ratio)+(a/2*ratio), realHeight/2 - ((height/2*ratio)-(1.5*b*ratio))/2 - (b/2*ratio) - 30);
    t.node.id = 'raphael-text-light';

    // b
    p = drawSpacer(realWidth/2+(width/2*ratio)-((width-a)/2*ratio), realHeight/2 - (height/2*ratio), realWidth/2+(width/2*ratio)-((width-a)/2*ratio), realHeight/2 - (height/2*ratio) + (b*ratio));
    p.node.id = 'raphael-spacer-light';
    t = drawSpacerText('b', realWidth/2+(width/2*ratio)-((width-a)/2*ratio)+30, realHeight/2 - (height/2*ratio) + (b/2*ratio));
    t.node.id = 'raphael-text-light';

    // c
    p = drawSpacer(realWidth/2+(width/2*ratio)-(c*ratio), realHeight/2, realWidth/2+(width/2*ratio),realHeight/2);
    p.node.id = 'raphael-spacer-dark';
    t = drawSpacerText('c', realWidth/2+(width/2*ratio)-(c/2*ratio), realHeight/2-30);
    t.node.id = 'raphael-text-dark';
}

function calculatePerimeterE(width, height, a, b, c) {
    var perimeter = (2*(width+height)+2*(width-a)+2*(width-a-c)).toFixed(1);
    $('#perimeter').html('Umfang: ' + perimeter + 'cm');
}

function recalculateA(width, height) {
    var a = parseFloat($('#a-side-a').val());
    var b = parseFloat($('#a-side-b').val());
    drawA(width, height, a, b);
    calculatePerimeterA(width, height, a, b);
}

function recalculateE(width, height) {
    var a = parseFloat($('#e-side-a').val());
    var b = parseFloat($('#e-side-b').val());
    var c = parseFloat($('#e-side-c').val());
    drawE(width, height, a, b, c);
    calculatePerimeterE(width, height, a, b, c);
}

function recalculate() {
    var selectedLetter = $('#letter-select').val();
    var height = parseFloat($('#height').val());
    var width = parseFloat($('#width').val());
    if (selectedLetter == 'a') {
        recalculateA(width, height);
    } else if (selectedLetter == 'e') {
        recalculateE(width, height);
    }
}

function resizeDrawboard() {
    var $wrapper = $('#drawboard-wrapper');
    var $drawboard = $('#drawboard');
    var width = $wrapper.get(0).getBoundingClientRect().width;
    var height = $wrapper.get(0).getBoundingClientRect().height - 32;
    var widthToSet = Math.min(width, height);
    $drawboard.css('width', widthToSet + 'px');
}

function changeInputs() {
    var selectedLetter = $('#letter-select').val();
    var tabId = '#inputs-' + selectedLetter;
    $('.input-tab').removeClass('active');
    $(tabId).addClass('active');
    recalculate();
    window.location.hash = '#' + selectedLetter;
}

window.onresize = function(event) {
    resizeDrawboard();
};
resizeDrawboard();

$('#input-change').on('change', recalculate);
recalculate();

$('#letter-select').on('change', changeInputs);

if (window.location.hash && window.location.hash.length == 2) {
    $('#letter-select').val(window.location.hash[1]);
    changeInputs()
}