//to do: performance
//opacity instead of dark
//fix stars on resize
//zoom breaks
//resizing weird

var canvas;
var ctx;
var num;
var starArr;
var scrollY = 0;

var index = 0;
chromaticAberrationAmount = 0; //from another file, set it here as well I guess or errors can happen

//pointless for now but implemented
/*const depthInfo = { FirstLayer: {Size: 1, SpeedMult: 1, ScrollRatio: 0}, 
                    SecondLayer: {Size: 0.5, SpeedMult: 0.5, ScrollRatio: 0.5}, 
                    ThirdLayer: {Size: 0.25, SpeedMult: 0.25, ScrollRatio: 0.75}};*/
const depthInfo = { FirstLayer: {Size: 1, SpeedMult: 1, ScrollRatio: 0}, 
                    SecondLayer: {Size: 1, SpeedMult: 1, ScrollRatio: 0}, 
                    ThirdLayer: {Size: 1, SpeedMult: 1, ScrollRatio: 0}};

const interval = 30;
setInterval(mainFunction, interval); 

class Star
{
    //in px and with seconds
    constructor(x, y, xVel, yVel)
    {
        if(index % 3 == 0)
        {
            this.layerInfo = depthInfo.FirstLayer;
        }
        else if(index % 3 == 1)
        {
            this.layerInfo = depthInfo.SecondLayer;
        }
        else if(index % 3 == 2)
        {
            this.layerInfo = depthInfo.ThirdLayer;
        }
        index++;
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
    }

    getY(scrollAccounted)
    {
        if(scrollAccounted)
        {
            return this.y; //scrollY is not super good for this... I don't know how to go about this
            //return this.y + scrollY * this.layerInfo.ScrollRatio;
        }
        else
        {
            return this.y
        }
    }
}

var initted = false;


const speedCap = 30.0; //per x and y direction.
var numberStars;
var xMax;
var yMax;

var mouseXRaw;
var mouseYRaw;

var mouseYAdjusted;

var linearMultScale;
function initCanvas()
{
    num = 0;
    canvas = document.getElementById("backgroundCanvas");
    ctx = canvas.getContext("2d"); 
    
    var zoomLevel = ((window.outerWidth - 10) / window.innerWidth) * 100; //lower is more zoomed out
    //console.log(`Zoom level: ${zoomLevel.toFixed(2)}%`);

    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    xMax = canvas.clientWidth;
    yMax = canvas.clientHeight;

    linearMultScale = Math.sqrt(xMax * yMax / 1171350); //should be 1 for 720p fullscreen on general page (at least once upon a time it was)
    
    initted = true;

    mouseYAdjusted = 0;
    mouseXRaw = 0;
    mouseYRaw = 0;
    scrollY = 0;
    document.addEventListener('mousemove', function(event) 
    {
        mouseXRaw = event.clientX;
        mouseYRaw = event.clientY;
        mouseYAdjusted = mouseYRaw + scrollY;
    });

    window.addEventListener('scroll', function() 
    {
        scrollY = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        mouseYAdjusted = mouseYRaw + scrollY;
    });

    starArr = [];
    numberStars = 120 * linearMultScale * linearMultScale;
    for(var i = 0; i < numberStars; i++)
    {
        starArr[i] = new Star(Math.random() * xMax, Math.random() * yMax, -speedCap + Math.random() * speedCap * 2, -speedCap + Math.random() * speedCap * 2);
    }
}

window.onresize = function(event) 
{
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete

    xMax = canvas.clientWidth;
    yMax = canvas.clientHeight;

    linearMultScale = Math.sqrt(xMax * yMax / 1171350); //should be 1 for 720p fullscreen on general page (at least once upon a time it was)
    numberStars = 120 * linearMultScale * linearMultScale;
    for(var i = 0; i < numberStars; i++)
    {
        starArr[i] = new Star(Math.random() * xMax, Math.random() * yMax, -speedCap + Math.random() * speedCap * 2, -speedCap + Math.random() * speedCap * 2);
    }
};

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

const starOOBLeniency = 100; //oob means out-of-bounds
function moveStars()
{
    for(var i = 0; i < starArr.length; i++)
    {
        var star = starArr[i];
        star.x = star.x + star.xVel * interval / 1000.0 * star.layerInfo.SpeedMult
        star.y = star.y + star.yVel * interval / 1000.0 * star.layerInfo.SpeedMult
        if(star.x > xMax + starOOBLeniency) {star.x = -starOOBLeniency}
        if(star.y > yMax + starOOBLeniency) {star.y = -starOOBLeniency}
        if(star.x < 0 - starOOBLeniency) {star.x = xMax + starOOBLeniency;}
        if(star.y < 0 - starOOBLeniency) {star.y = yMax + starOOBLeniency;}
    }

    for(var i = 0; i < 2; i++) //change velocity of one lucky star, up to ten times a second depending on interval, twice, cumulative 20 a second. 
    {
        if(Math.random() > (interval * 10) / 1000)
        {
            var index = getRandomInt(starArr.length)
            var star = starArr[index];
            //console.log(index + "    " + star)
            star.xVel = -speedCap + Math.random() * speedCap * 2;// * linearMultScale;
            star.yVel = -speedCap + Math.random() * speedCap * 2;// * linearMultScale;
        }
    }
}

function getHexcode(brightness)
{
    var number = Math.floor(brightness * 256.0);
    var str = number.toString(16);
    if(str.length == 1){str = "0" + str;} //gives unexpected (bad) behavior when this is removed even though it wont error
    if(str.length > 2){str = "FF";}
    str = "#" + str + str + str;
    return str;
}

function radixToHex(num)
{
    num = Math.floor(num * 256.0);
    var str = num.toString(16);
    if(str.length == 1){str = "0" + str;} //gives unexpected (bad) behavior when this is removed even though it wont error
    if(str.length > 2){str = "FF";}
    return str;
}

var colorStars = "#ffffff";
var colorBackground = "#000000";

function drawStars()
{
    var color = colorStars;
    var rDepth = radixToHex(parseInt(color.substring(1, 3), 16) / 256.0); 
    var gDepth = radixToHex(parseInt(color.substring(3, 5), 16) / 256.0);
    var bDepth = radixToHex(parseInt(color.substring(5, 7), 16) / 256.0);

    for(var i = 0; i < starArr.length; i++) //draw lines
    {
        var star = starArr[i];

        var dist_iCursor = Math.sqrt(Math.pow(mouseXRaw - star.x, 2) + Math.pow(mouseYAdjusted - star.getY(true), 2));

        var constellationDist = 175;// * linearMultScale;

        if(dist_iCursor < constellationDist) 
        {
            for(var j = 0; j < starArr.length; j++)
            {
                if(i == j) {j++; continue;}
                var newStar = starArr[j];
                var dist_ij = Math.sqrt(Math.pow(newStar.x - star.x, 2) + Math.pow(newStar.getY(true) - star.getY(true), 2));
                var dist_jCursor = Math.sqrt(Math.pow(newStar.x - mouseXRaw, 2) + Math.pow(newStar.getY(true) - mouseYAdjusted, 2));
                if(dist_jCursor < constellationDist && i > j) //only render it one time
                {
                    var amt = 1 - dist_jCursor / constellationDist - dist_iCursor / constellationDist
                    if(amt > 0) 
                    {
                        if(chromaticAberrationAmount > 0)
                        {
                            //red - -x +y
                            //green - +x +y
                            //blue - -y
                            ctx.strokeStyle = "#FF0000" + rDepth; 
                            ctx.beginPath();
                            ctx.moveTo(star.x - chromaticAberrationAmount, star.getY(true) + chromaticAberrationAmount);
                            ctx.lineTo(newStar.x - chromaticAberrationAmount, newStar.getY(true) + chromaticAberrationAmount);
                            ctx.stroke();

                            ctx.strokeStyle = "#00FF00" + gDepth; 
                            ctx.beginPath();
                            ctx.moveTo(star.x + chromaticAberrationAmount, star.getY(true) + chromaticAberrationAmount);
                            ctx.lineTo(newStar.x + chromaticAberrationAmount, newStar.getY(true) + chromaticAberrationAmount);
                            ctx.stroke();

                            ctx.strokeStyle = "#0000FF" + bDepth; 
                            ctx.beginPath();
                            ctx.moveTo(star.x, star.getY(true) - chromaticAberrationAmount * 1.41);
                            ctx.lineTo(newStar.x, newStar.getY(true) - chromaticAberrationAmount * 1.41);
                            ctx.stroke();
                        }

                        var brightness = Math.sqrt(amt); //sqrt can be applied to make the brightness higher but still ranging from [0, 1]
                        //ctx.strokeStyle = getHexcode(brightness);
                        var opacity = Math.round(brightness * 256).toString(16);
                        if(opacity.length < 2)
                        {
                            opacity = "0" + opacity;
                        }

                        ctx.strokeStyle = colorStars + opacity;
                        ctx.beginPath();
                        ctx.moveTo(star.x, star.getY(true));
                        ctx.lineTo(newStar.x, newStar.getY(true));
                        ctx.stroke();
                    }
                }
            }
        }
    }
    for(var i = 0; i < starArr.length; i++) //draw stars (done seperately so they draw over lines)
    {
        var star = starArr[i];

        var dist_iCursor = Math.sqrt(Math.pow(mouseXRaw - star.x, 2) + Math.pow(mouseYAdjusted - star.getY(true), 2));
        var highlightDist = 120;// * linearMultScale;
        var bonus = 0.4 * (highlightDist - dist_iCursor) / highlightDist;
        if(bonus < 0) {bonus = 0;}

        var bonus = 3 * (highlightDist - dist_iCursor) / highlightDist
        if(bonus < 0) {bonus = 0;}

        var starSize = (4 + bonus) * star.layerInfo.Size;

        //red - -x +y
        //green - +x +y
        //blue - -y
        if(chromaticAberrationAmount > 0)
        {
            ctx.fillStyle = "#FF0000" + rDepth; 
            ctx.fillRect(star.x - starSize / 2 - chromaticAberrationAmount, star.getY(true) - starSize / 2 + chromaticAberrationAmount, starSize, starSize);

            ctx.fillStyle = "#00FF00" + gDepth; 
            ctx.fillRect(star.x - starSize / 2 + chromaticAberrationAmount, star.getY(true) - starSize / 2 + chromaticAberrationAmount, starSize, starSize);

            ctx.fillStyle = "#0000FF" + bDepth; 
            ctx.fillRect(star.x - starSize / 2, star.getY(true) - starSize / 2 - chromaticAberrationAmount * 1.41, starSize, starSize);
        }

        var brightness = 0.75 + bonus + Math.random() * 0.25; //make better flickering system
        str = radixToHex(brightness);
        ctx.fillStyle = colorStars + str;//str; 
        ctx.fillRect(star.x - starSize / 2, star.getY(true) - starSize / 2, starSize, starSize);
    }
}

var starsEnabled = "true";

function mainFunction()
{
    if(initted == false)
    {
        initCanvas();
    }

    ctx.fillStyle = colorBackground;
    ctx.fillRect(0, 0, xMax, yMax); //clear

    if(starsEnabled == "true")
    {
        moveStars();
        drawStars();
    }
}