//fix aberattion for boxes

//setInterval(mainFunction, interval); 

var allTextElements = document.querySelectorAll("p, h1, h2, a, li, span");
var allBoxElements = document.querySelectorAll(".genericcontainer, .button, .contentcontainer, .button-nolink");
var defaultShadowWithoutColor = "0px 0px 3px ";

var scrollYLastTick = (window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop);

window.addEventListener('scroll', function() 
{
    //determineChromaticAberationAmount();
    determineElementShadows();
});

window.addEventListener('scrollend', function() 
{
    scrollChangeTick = 0;
    //determineChromaticAberationAmount();
    determineElementShadows()
});

var scrollChangeTick = 0; //probably depends on framerate? this is bad.
var chromaticAberrationAmount = 0;
var pixelsScrolledAccumulator = 0;

var chromaticAberrationEnabled = "true";

//basically exponential decay
setInterval(function()
{
    var bPositive = true;
    if(pixelsScrolledAccumulator < 0) {bPositive = false;}

    var a = 0.32; //matters more for big scrolls. higher value is shorter time
    var b = 3.8; //matters more for small scrolls. higher value is shorter time
    var difAmount = Math.abs(pixelsScrolledAccumulator * a) + b;
    if(bPositive == true)
    {
        difAmount = -difAmount;
    }
    if((pixelsScrolledAccumulator + difAmount) / pixelsScrolledAccumulator < 0) //if doing the sum results in a different sign, then
    {
        pixelsScrolledAccumulator = 0;
    }
    else if(pixelsScrolledAccumulator != 0)
    {
        pixelsScrolledAccumulator = pixelsScrolledAccumulator + difAmount;
    }

    determineChromaticAberationAmount();
    determineElementShadows();
}, 25); 

determineChromaticAberationAmount();
determineElementShadows();

function determineChromaticAberationAmount()
{
    if(chromaticAberrationEnabled == "true")
    {
        var scrollTemp = (window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop)
        scrollChangeTick = scrollTemp - scrollYLastTick
        scrollYLastTick = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
        pixelsScrolledAccumulator += scrollChangeTick;

        //chromaticAberationAmount = Math.round(1.5 * Math.sqrt(Math.abs(scrollChangeTick))) - 1;
        chromaticAberrationAmount = Math.round(Math.sqrt(Math.abs(pixelsScrolledAccumulator / 12)));
        if(chromaticAberrationAmount > 6) {chromaticAberrationAmount = 6;}
    }
    else
    {
        chromaticAberrationAmount = 0;
    }
    //chromaticAberrationAmount = 2;
}

function convertHTMLColorToDepths(color)
{
    var arrOut = [0, 0, 0];

    if(color.indexOf("#") != -1)
    {
        //never gets called, its here I guess
        arrOut[0] = parseInt(color.substring(1, 3), 16) / 256.0; 
        arrOut[1] = parseInt(color.substring(3, 5), 16) / 256.0;
        arrOut[2] = parseInt(color.substring(5, 7), 16) / 256.0;
    }
    else if(color == null || color == undefined || color == "")
    {
        var colorDefault = document.documentElement.style.getPropertyValue('--color1');
        //only works for hex data in... color1 is hex so this is okay
        arrOut[0] = parseInt(colorDefault.substring(1, 3), 16) / 256.0; 
        arrOut[1] = parseInt(colorDefault.substring(3, 5), 16) / 256.0;
        arrOut[2] = parseInt(colorDefault.substring(5, 7), 16) / 256.0;
    }
    else
    {
        var numbers = color.match(/\d+\.?\d*/g)?.map(Number) || []; //wtf magic
        var opacityMult = 1;
        if(numbers[3] != undefined) {opacityMult = numbers[3];}
        arrOut[0] = numbers[0] * opacityMult / 256.0;
        arrOut[1] = numbers[1] * opacityMult / 256.0;
        arrOut[2] = numbers[2] * opacityMult / 256.0;
    }

    return arrOut;
}

function determineElementShadows()
{
    var colorDefault = document.documentElement.style.getPropertyValue('--color1');
    var rDepth = parseInt(colorDefault.substring(1, 3), 16) / 256.0; 
    var gDepth = parseInt(colorDefault.substring(3, 5), 16) / 256.0;
    var bDepth = parseInt(colorDefault.substring(5, 7), 16) / 256.0;

    var stringOutDefault = chromaticAberrationAmount  + "px " + chromaticAberrationAmount           + "px " + 0             + "px " + "rgba(0, 255, 0, " + (gDepth / 2) + ")," +
                           0              + "px " + (-chromaticAberrationAmount * 1.41) + "px " + 0 + "px " + "rgba(0, 0, 255, " + bDepth + ")," +
                           -chromaticAberrationAmount + "px " + chromaticAberrationAmount           + "px " + 0             + "px " + "rgba(255, 0, 0, " + rDepth + ")," +
                           defaultShadowWithoutColor;
    for(var i = 0; i < allTextElements.length; i++)
    {
        textElement = allTextElements[i];
        var stringOut = stringOutDefault;

        if(colorDefault != textElement.style.color)
        {
            var color = textElement.style.color;
            data = convertHTMLColorToDepths(color);
            var rDepth = data[0];
            var gDepth = data[1];
            var bDepth = data[2];

            stringOut = chromaticAberrationAmount  + "px " + chromaticAberrationAmount           + "px " + 0             + "px " + "rgba(0, 255, 0, " + (gDepth / 2) + ")," +
                            0              + "px " + (-chromaticAberrationAmount * 1.41) + "px " + 0 + "px " + "rgba(0, 0, 255, " + bDepth + ")," +
                            -chromaticAberrationAmount + "px " + chromaticAberrationAmount           + "px " + 0             + "px " + "rgba(255, 0, 0, " + rDepth + ")," +
                            defaultShadowWithoutColor;
        }

        if(textElement.className != "text-styled" && textElement.className != "a-styled" && textElement.id.indexOf("no-alter") < 0) //doesnt have any visual effect (shadows end up transparent), but prevents unnecessary assignments
        {
            if(chromaticAberrationAmount > 0)
            {
                textElement.style.textShadow = stringOut + textElement.style.color; //"2px 2px 0px red, 0px -2px 0px green, -2px 2px 0px blue";
            }
            else
            {
                textElement.style.textShadow = defaultShadowWithoutColor + textElement.style.color;
            }
        }
    }
    for(var i = 0; i < allBoxElements.length; i++)
    {
        boxElement = allBoxElements[i];
        if(chromaticAberrationAmount > 0)
        {
            boxElement.style.boxShadow = stringOutDefault + boxElement.style.color; //"2px 2px 0px red, 0px -2px 0px green, -2px 2px 0px blue";
        }
        else
        {
            boxElement.style.boxShadow = defaultShadowWithoutColor + boxElement.style.color;
        }
    }
}