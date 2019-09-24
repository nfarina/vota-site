//helper functions, it turned out chrome doesn't support Math.sgn() 
function signum(x) {
  return (x < 0) ? -1 : 1;
}
function absolute(x) {
  return (x < 0) ? -x : x;
}

function drawPath(svg, path, startX, startY, endX, endY) {
  // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
  var stroke =  parseFloat(path.attr("stroke-width"));
  // check if the svg is big enough to draw the path, if not, set heigh/width
  if (svg.attr("height") <  endY)                 svg.attr("height", endY);
  if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
  if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));

  var deltaX = (endX - startX) * 0.3;
  var deltaY = (endY - startY) * 0.3;
  // for further calculations which ever is the shortest distance
  var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);

  // set sweep-flag (counter/clock-wise)
  // if start element is closer to the left edge,
  // draw the first arc counter-clockwise, and the second one clock-wise
  var arc1 = 0; var arc2 = 1;
  if (startX > endX) {
      arc1 = 1;
      arc2 = 0;
  }
  // draw tha pipe-like path
  // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
  path.attr("d",  "M"  + startX + " " + startY +
                  " V" + (startY + delta) +
                  " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
                  " H" + (endX - delta*signum(deltaX)) + 
                  " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                  " V" + endY );
}

function connectElements(svg, path, startElem, endElem) {
  var svgContainer= $("#svgContainer");

  // if first element is lower than the second, swap!
  if(startElem.offset().top > endElem.offset().top){
      var temp = startElem;
      startElem = endElem;
      endElem = temp;
  }

  // get (top, left) corner coordinates of the svg container   
  var svgTop  = svgContainer.offset().top;
  var svgLeft = svgContainer.offset().left;

  // get (top, left) coordinates for the two elements
  var startCoord = startElem.offset();
  var endCoord   = endElem.offset();

  // calculate path's start (x,y)  coords
  // we want the x coordinate to visually result in the element's mid point
  var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
  var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

      // calculate path's end (x,y) coords
  var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
  var endY = endCoord.top  - svgTop;

  console.log(endY);

  // call function for drawing the path
  drawPath(svg, path, startX, startY, endX, endY);
}


$(document).ready(function() {
  // reset svg each time 
  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");

  createLines();
  tweenLines();
});

$(window).resize(function () {
  // reset svg each time 
  $("#svg1").attr("height", "0");
  $("#svg1").attr("width", "0");
  createLines();
  tweenLines();
});

function createLines() {

  var width = $(window).width();

  console.log(width);
  if (width > 650) {
    connectElements($("#svg1"), $("#pathOpen"), $("#getIt"),  $("#openAccount"));
    connectElements($("#svg1"), $("#pathCards"), $("#openAccount"),  $("#getCards"));
    connectElements($("#svg1"), $("#pathDone"), $("#getCards"),  $("#beDone"));
  }
  connectElements($("#svg1"), $("#pathQb"), $("#beDone"),  $("#qb"));
  connectElements($("#svg1"), $("#pathNotif"), $("#beDone"),  $("#notifMan"));
  console.log('lines drawn');
}


function pathPrepare ($el) {
  var lineLength = $el[0].getTotalLength();
  $el.css("stroke-dasharray", lineLength);
  $el.css("stroke-dashoffset", lineLength);
  
}

function tweenLines() {


  //var $line = $("path#line");
  var $toOpen = $("path#pathOpen");
  var $toCards = $("path#pathCards");
  var $toDone = $("path#pathDone");
  var $toQb = $("path#pathQb");
  var $toNotif = $("path#pathNotif");


  // prepare SVG
  //pathPrepare($line);
  pathPrepare($toOpen);
  pathPrepare($toCards);
  pathPrepare($toDone);
  pathPrepare($toQb);
  pathPrepare($toNotif);

  // init controller
  var controller = new ScrollMagic.Controller();

  var width = $(window).width();

  // build tween
  //var tween = new TimelineMax()
  //  .add(TweenMax.to($line, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw word for 0.9
  var tweenOpen = new TimelineMax()
    .add(TweenMax.to($toOpen, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})); // draw word for 0.9
  var tweenCards = new TimelineMax()
    .add(TweenMax.to($toCards, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})); // draw word for 0.9
  var tweenDone = new TimelineMax()
    .add(TweenMax.to($toDone, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})); // draw word for 0.9
  var tweenNotif = new TimelineMax()
    .add(TweenMax.to($toNotif, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})); // draw word for 0.9
  var tweenQb = new TimelineMax()
    .add(TweenMax.to($toQb, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})); // draw word for 0.9


  // build scenes
  var sceneOpen = new ScrollMagic.Scene({triggerElement: "#getIt", duration: 300, tweenChanges: true})
                             .setTween(tweenOpen)
                             .addTo(controller);
  var sceneCards = new ScrollMagic.Scene({triggerElement: "#openAccount", duration: 300, tweenChanges: true})
                             .setTween(tweenCards)
                             .addTo(controller);
  var sceneDone = new ScrollMagic.Scene({triggerElement: "#getCards", duration: 300, tweenChanges: true})
                             .setTween(tweenDone)
                             .addTo(controller);
  var sceneNotif = new ScrollMagic.Scene({triggerElement: "#beDone", duration: 300, tweenChanges: true})
                             .setTween(tweenNotif)
                             .addTo(controller);
  var sceneQb = new ScrollMagic.Scene({triggerElement: "#beDone", duration: 300, tweenChanges: true})
                             .setTween(tweenQb)
                             .addTo(controller);

}

// define images
var images = [
  "/images/confetti/illus_conf_1.svg",
  "/images/confetti/illus_conf_2.svg",
  "/images/confetti/illus_conf_3.svg",
  "/images/confetti/illus_conf_4.svg",
  "/images/confetti/illus_conf_5.svg",
];

// TweenMax can tween any property of any object. We use this object to cycle through the array
var obj = {curImg: 0};

// create tween
var tweenConfetti = TweenMax.to(obj, 10.5,
  {
    curImg: images.length - 1,	// animate propery curImg to number of images
    roundProps: "curImg",				// only integers so it can be used as an array index
    repeat: 3,									// repeat 3 times
    immediateRender: true,			// load first image automatically
    ease: Linear.easeNone,			// show every image the same ammount of time
    onUpdate: function () {
      $("#confetti").attr("src", images[obj.curImg]); // set the image source
    }
  }
);

// init controller
var controllerConfetti = new ScrollMagic.Controller();

// build scene
var scene = new ScrollMagic.Scene({triggerElement: "#intelligent", duration: 1000})
        .setTween(tweenConfetti)
        .addTo(controllerConfetti);