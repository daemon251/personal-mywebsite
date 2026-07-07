//to do: performance
//opacity instead of dark
//fix stars on resize
//zoom breaks
//resizing weird

function backgroundStart()
{
    setInterval(mainBackgroundLogic, interval); 
    window.onresize = function(event) 
    {
        setContentGridsSettings();
        canvas = document.getElementById("backgroundCanvas");
        ctx = canvas.getContext("2d"); 
        
        var zoomLevel = ((window.outerWidth - 10) / window.innerWidth) * 100; //lower is more zoomed out
        //console.log(`Zoom level: ${zoomLevel.toFixed(2)}%`);

        canvas.width = document.body.clientWidth; //document.width is obsolete
        canvas.height = document.body.clientHeight; //document.height is obsolete

        var xMaxOld = xMax;
        var yMaxOld = yMax;

        xMax = canvas.clientWidth; // / (zoomLevel / 100);
        yMax = canvas.clientHeight; // / (zoomLevel / 100);

        scaleStars(xMaxOld, yMaxOld);
    };
}

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

        this.lastTouchTime = 0;
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

    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault(); //moving stars wont cause a popup cuz of this
    });

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

    scrollY = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    mouseYAdjusted = mouseYRaw + scrollY;
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

    document.addEventListener('mousedown', function(event) {
        mouseState = event.button;
    });

    document.addEventListener('mouseup', function() {
        mouseState = -1;
    });
}

/*window.onresize = function(event) 
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
};*/

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

var mouseState = -1;

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

        const resistance = 40;
        if(star.xVel > speedCap)
        {
            star.xVel = star.xVel - interval / resistance;
        }
        else if(star.xVel < -speedCap)
        {
            star.xVel = star.xVel + interval / resistance;
        }

        if(star.yVel > speedCap)
        {
            star.yVel = star.yVel - interval / resistance;
        }
        else if(star.yVel < -speedCap)
        {
            star.yVel = star.yVel + interval / resistance;
        }




        const pushDist = 120;// * linearMultScale;

        const pushScale = 200;
        const pushExp = 1;

        var forceState = 0; //1 is push, -1 is pull
        if(mouseState == 0) {forceState = 1;}
        else if(mouseState == 2) {forceState = -1;}
        else {forceState = 0;}

        if(forceState != 0)
        {
            var xDif = mouseXRaw - star.x;
            var yDif = mouseYAdjusted - star.y;
            var dist_iCursor = Math.sqrt(Math.pow(xDif, 2) + Math.pow(yDif, 2));

            var scale = Math.min(pushScale / dist_iCursor, pushScale / 10);
            var angle = Math.atan2(yDif, xDif)


            var xForce = -scale * Math.cos(angle) * forceState;
            var yForce = -scale * Math.sin(angle) * forceState;

            if(dist_iCursor < pushDist) 
            {
                star.xVel = star.xVel + xForce;
                star.yVel = star.yVel + yForce;

                star.lastTouchTime = performance.now();

                //force vector
                /*ctx.strokeStyle = "#FF0000"; 
                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(star.x + xForce * 5, star.y + yForce * 5);
                ctx.stroke();*/
            }
        }
    }

    for(var i = 0; i < 2; i++) //change velocity of one lucky star, up to ten times a second depending on interval, twice, cumulative 20 a second. 
    {
        if(Math.random() > (interval * 10) / 1000)
        {
            var index = getRandomInt(starArr.length)
            var star = starArr[index];
            if(star.lastTouchTime + 2000 < performance.now()) //dont deal with stars that have been recently touched
            {
                //console.log(index + "    " + star)
                star.xVel = -speedCap + Math.random() * speedCap * 2;// * linearMultScale;
                star.yVel = -speedCap + Math.random() * speedCap * 2;// * linearMultScale;
            }
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

function scaleStars(xMaxOld, yMaxOld)
{
    if(starArr === undefined) {return;}
    for(var i = 0; i < starArr.length; i++)
    {
        var star = starArr[i];
        star.x *= xMax / xMaxOld
        star.y *= yMax / yMaxOld
    }

    //now remove or add to keep constant density
    linearMultScale = Math.sqrt(xMax * yMax / 1171350);
    numberStars = 120 * linearMultScale * linearMultScale;

    numberStarsAdd = Math.round(numberStars - starArr.length); //theoretically scaling back and forth might cause discrepancies over time... whatever

    if(numberStarsAdd < 0)
    {
        starArrNew = []
        for(var i = 0; i < starArr.length + numberStarsAdd; i++)
        {
            var star = starArr[i];
            starArrNew[i] = new Star(star.x, star.y, star.xVel, star.yVel);
        }
        starArr = starArrNew;
    }
    else if(numberStarsAdd > 0)
    {
        starArrNew = []
        for(var i = 0; i < starArr.length; i++)
        {
            var star = starArr[i];
            starArrNew[i] = new Star(star.x, star.y, star.xVel, star.yVel);
        }
        for(var i = starArr.length; i < starArr.length + numberStarsAdd; i++)
        {
            starArrNew[i] = new Star(Math.random() * xMax, Math.random() * yMax, -speedCap + Math.random() * speedCap * 2, -speedCap + Math.random() * speedCap * 2);
        }
        starArr = starArrNew;
    }
}

function drawStars()
{
    var color = colorStars;
    var rDepth = radixToHex(parseInt(color.substring(1, 3), 16) / 256.0); 
    var gDepth = radixToHex(parseInt(color.substring(3, 5), 16) / 256.0);
    var bDepth = radixToHex(parseInt(color.substring(5, 7), 16) / 256.0);

    var randomBrightnessArr = [];
    for(var i = 0; i < 16; i++) //cheaper to do it this way
    {
        randomBrightnessArr[i] = Math.random();
    }

    //var timeStart = performance.now() * 1000;
    for(var i = 0; i < starArr.length; i++) //draw lines
    {
        var star = starArr[i];
        var dist_iCursor = Math.sqrt(Math.pow(mouseXRaw - star.x, 2) + Math.pow(mouseYAdjusted - star.y, 2));
        var constellationDist = 175;// * linearMultScale;

        if(dist_iCursor < constellationDist) 
        {
            for(var j = i + 1; j < starArr.length; j++) //only render it one time
            {
                var newStar = starArr[j];
                //var dist_ij = Math.sqrt(Math.pow(newStar.x - star.x, 2) + Math.pow(newStar.y - star.y, 2));
                var dist_jCursor = Math.sqrt(Math.pow(newStar.x - mouseXRaw, 2) + Math.pow(newStar.y - mouseYAdjusted, 2));
                if(dist_jCursor < constellationDist) 
                {
                    var amt = 1 - (dist_jCursor + dist_iCursor) / constellationDist;
                    if(amt > 0) 
                    {
                        if(chromaticAberrationAmount > 0)
                        {
                            //red - -x +y
                            //green - +x +y
                            //blue - -y
                            ctx.strokeStyle = "#FF0000" + rDepth; 
                            ctx.beginPath();
                            ctx.moveTo(star.x - chromaticAberrationAmount, star.y + chromaticAberrationAmount);
                            ctx.lineTo(newStar.x - chromaticAberrationAmount, newStar.y + chromaticAberrationAmount);
                            ctx.stroke();

                            ctx.strokeStyle = "#00FF00" + gDepth; 
                            ctx.beginPath();
                            ctx.moveTo(star.x + chromaticAberrationAmount, star.y + chromaticAberrationAmount);
                            ctx.lineTo(newStar.x + chromaticAberrationAmount, newStar.y + chromaticAberrationAmount);
                            ctx.stroke();

                            ctx.strokeStyle = "#0000FF" + bDepth; 
                            ctx.beginPath();
                            ctx.moveTo(star.x, star.y - chromaticAberrationAmount * 1.41);
                            ctx.lineTo(newStar.x, newStar.y - chromaticAberrationAmount * 1.41);
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
                        ctx.moveTo(star.x, star.y);
                        ctx.lineTo(newStar.x, newStar.y);
                        ctx.stroke();
                    }
                }
            }
        }
    }
    for(var i = 0; i < starArr.length; i++) //draw stars (done seperately so they draw over lines)
    {
        var star = starArr[i];

        var dist_iCursor = Math.sqrt(Math.pow(mouseXRaw - star.x, 2) + Math.pow(mouseYAdjusted - star.y, 2));
        var highlightDist = 120;// * linearMultScale;

        var bonus = 3 * (highlightDist - dist_iCursor) / highlightDist;
        if(bonus < 0) {bonus = 0;}

        var starSize = (4 + bonus); //* star.layerInfo.Size;

        //red - -x +y
        //green - +x +y
        //blue - -y
        if(chromaticAberrationAmount > 0)
        {
            ctx.fillStyle = "#FF0000" + rDepth; 
            ctx.fillRect(star.x - starSize / 2 - chromaticAberrationAmount, star.y - starSize / 2 + chromaticAberrationAmount, starSize, starSize);

            ctx.fillStyle = "#00FF00" + gDepth; 
            ctx.fillRect(star.x - starSize / 2 + chromaticAberrationAmount, star.y - starSize / 2 + chromaticAberrationAmount, starSize, starSize);

            ctx.fillStyle = "#0000FF" + bDepth; 
            ctx.fillRect(star.x - starSize / 2, star.y - starSize / 2 - chromaticAberrationAmount * 1.41, starSize, starSize);
        }

        var brightness = 0.75 + bonus + randomBrightnessArr[i % 16] * 0.25; 
        str = radixToHex(brightness);
        ctx.fillStyle = colorStars + str;
        ctx.fillRect(star.x - starSize / 2, star.y - starSize / 2, starSize, starSize);
    }
    //var timeEnd = performance.now() * 1000;
    //console.log(Math.round(timeEnd - timeStart));
}

var starsEnabled = "true";

function mainBackgroundLogic()
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

///////////////////
///////////////////
///////////////////
backgroundStart();