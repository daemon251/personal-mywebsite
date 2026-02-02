//fix aberattion for boxes

//setInterval(mainFunction, interval); 

var allTextElements = document.querySelectorAll("p, h1, h2, a, li");
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

var chromaticAberrationEnabled = true;

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

function determineElementShadows()
{
    var stringOut = chromaticAberrationAmount  + "px " + chromaticAberrationAmount           + "px " + 0             + "px " + "rgba(0, 128, 0, 1)," +
                    0              + "px " + (-chromaticAberrationAmount * 1.41) + "px " + 0 + "px " + "rgba(0, 0, 255, 1)," +
                    -chromaticAberrationAmount + "px " + chromaticAberrationAmount           + "px " + 0             + "px " + "rgba(255, 0, 0, 1)," +
                    defaultShadowWithoutColor;
    for(var i = 0; i < allTextElements.length; i++)
    {
        textElement = allTextElements[i];
        /*var color = textElement.style.color;
        var colorComps = color.substring(4, color.length-1).replace(/ /g, '').split(',');
        if(colorComps.length != 3) {colorComps = ['255', '255', '255']};
        colorComps[0] = colorComps[0] / 255;
        colorComps[1] = colorComps[1] / 255;
        colorComps[2] = colorComps[2] / 255;

        console.log(colorComps[1])

        redString = "rgba(255, 0, 0, " + colorComps[0] + "),";
        greenString = "rgba(0, 128, 0, " + colorComps[1] + "),";
        blueString = "rgba(0, 0, 255, " + colorComps[2] + "),";

        var stringOut = chromaticAberationAmount  + "px " + chromaticAberationAmount           + "px " + 0             + "px " + greenString +
                    0              + "px " + (-chromaticAberationAmount * 1.41) + "px " + 0 + "px " + blueString +
                    -chromaticAberationAmount + "px " + chromaticAberationAmount           + "px " + 0             + "px " + redString +
                    defaultShadowWithoutColor;*/

        if(chromaticAberrationAmount > 0)
        {
            textElement.style.textShadow = stringOut + textElement.style.color; //"2px 2px 0px red, 0px -2px 0px green, -2px 2px 0px blue";
        }
        else
        {
            textElement.style.textShadow = defaultShadowWithoutColor + textElement.style.color;
        }
    }
    for(var i = 0; i < allBoxElements.length; i++)
    {
        boxElement = allBoxElements[i];
        if(chromaticAberrationAmount > 0)
        {
            boxElement.style.boxShadow = stringOut + boxElement.style.color; //"2px 2px 0px red, 0px -2px 0px green, -2px 2px 0px blue";
        }
        else
        {
            boxElement.style.boxShadow = defaultShadowWithoutColor + boxElement.style.color;
        }
    }
}