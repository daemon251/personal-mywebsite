function electricalStart()
{
    initElectricalCanvas();
    setInterval(mainElectrical, 25); 
}

var electricalCanvas;
var electricalctx;

function initElectricalCanvas()
{
    electricalCanvas = document.getElementById("electricalCanvas");
    electricalctx = electricalCanvas.getContext("2d"); 

    electricalctx.fillStyle = "#000000";
    electricalctx.fillRect(0, 0, electricalCanvas.clientWidth, electricalCanvas.clientHeight); //clear
    for(var i = 0; i < 15; i++)
    {
        redWire[i] = new wireSegment(20.0, 20.0 * i + 10.0, 10.0, Math.PI / 2.0, "#FF0000");
    }
    //fix star selection etc

    electricalCanvas.addEventListener('mousemove', (e) => {
        const pos = getMousePosOnCanvas(electricalCanvas, e);
        mouseX = pos.x;
        mouseY = pos.y
    });

    electricalCanvas.setAttribute('width', electricalCanvas.offsetWidth)
    electricalCanvas.setAttribute('height', electricalCanvas.offsetHeight)

    const rect = electricalCanvas.getBoundingClientRect();
}

function getMousePosOnCanvas(canvasIn, e) {
    const rect = canvasIn.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: (320 - 1) - (e.clientY - rect.top)
    };
}

var redWire = [];
var heldSegment = null;
var heldSegmentIndex = -1;
var mouseX = 0;
var mouseY = 0;

const physGravity = -12;
const physMinHeight = 6.0;

function mainElectrical()
{
    mainElectricalPhysics();
    mainElectricalDraw();
}

function forceFunc(value)
{
    var oldValue = value;
    value = Math.abs(Math.pow(Math.abs(value), 1.2)) / 15;
    if(oldValue < 0)
    {
        value *= -1;
    }
    return value;
}

function mainElectricalPhysics()
{
    if(mouseState == 0) //lmb
    {
        for(var i = 0; i < redWire.length; i++) //holding
        {
            var segment = redWire[i];
            var startPoint = {x: segment.x, y: segment.y}
            var endPoint = {x: segment.x + segment.width * Math.cos(segment.angle), y: segment.y + segment.width * Math.sin(segment.angle)}
            var midPoint = {x: (startPoint.x + endPoint.x) / 2, y: (startPoint.y + endPoint.y) / 2}

            //d = |(ax + by + c)| / (aa + bb)^2

            var a = endPoint.y - startPoint.y;
            var b = startPoint.x - endPoint.x;
            var c = startPoint.y * (endPoint.x - startPoint.x) - startPoint.x * (endPoint.y - startPoint.y);

            var distFromLine = Math.abs(a * mouseX + b * (mouseY - 5) + c) / (a*a + b*b); //not in px .. sub mouseY makes it better I guess?
            var distFromCenter = Math.sqrt(Math.pow(midPoint.x - mouseX, 2) + Math.pow(midPoint.y - mouseY, 2)); //px

            if(distFromCenter < segment.width / 2 && distFromLine < 0.25 && heldSegment == null)
            {
                heldSegment = segment;
                heldSegmentIndex = i;
                segment.held = true;
                break;
            }
        }
    }
    else
    {
        if(heldSegment != null)
        {
            heldSegment.held = false;
        }
        heldSegment = null;
        heldSegmentIndex = -1;
    }

    for(var i = 0; i < redWire.length; i++) //stretching and etc
    {
        var segment = redWire[i];

        //push its segment to its left side
        if(i > 0)
        {
            var leftSegment = redWire[i-1];
            if(segment.y >= leftSegment.y + leftSegment.width)
            {
                leftSegment.y = segment.y - leftSegment.width;
                leftSegment.yVel = 0;
            }

            if(leftSegment.y > physMinHeight + 10)
            {
                leftSegment.xVel += (segment.x - leftSegment.x) * 4;
                leftSegment.xVel *= 0.95;
            }
            else
            {
                leftSegment.xVel *= 0.9;
            }
        }
        //push its segment to its right side
        if(i < redWire.length - 1)
        {
            var rightSegment = redWire[i + 1];

            if(segment.y >= rightSegment.y + rightSegment.width)
            {
                rightSegment.y = segment.y - rightSegment.width;
                rightSegment.yVel = 0;
            }

            if(rightSegment.y > physMinHeight + 10) //flying
            {
                rightSegment.xVel += (segment.x - rightSegment.x) * 4;
                rightSegment.xVel *= 0.95;
            }
            else //grounded 
            {
                rightSegment.xVel *= 0.9;
            }
        }
        else
        {
            //held by client, dont do any physics on it.
        }
    }

    for(var i = 0; i < redWire.length; i++) //phys main
    {
        var segment = redWire[i];
        if(segment == heldSegment)
        {
            segment.xVel = 0;
            segment.yVel = 0;
            segment.x = mouseX;
            segment.y = mouseY;
        }
        else
        {
            segment.yVel += physGravity;
            segment.y += segment.yVel / 40.0; //corresponding to 0.025 tick delay
            segment.x += segment.xVel / 40.0;

            if(segment.y <= physMinHeight) {segment.y = physMinHeight; segment.yVel = 0.0;}
            if(segment.y > 320) {segment.y = 320; segment.yVel = 0.0;}
        }
    }

    for(var i = 0; i < redWire.length - 1; i++) //angles
    {
        var segment = redWire[i];
        var segment2 = redWire[i + 1];
        deltaY = segment2.y - segment.y;
        deltaX = segment2.x - segment.x;
        var angle = Math.atan2(deltaY, deltaX);
        segment.angle = angle;
        segment2.angle = angle; //makes the last element in array to be the same as second last
    }

    for(var i = 0; i < redWire.length; i++) //collisions
    {
        var segment = redWire[i];
        for(var j = i + 1; j < redWire.length; j++)
        {
            var segment2 = redWire[j];
            if(Math.abs(segment.y - segment2.y) < 5 && Math.abs(segment.x - segment2.x) < segment.width - 2)
            {
                //segment.y = segment2.y + 5;
                //segment.yVel = 0;
            }
        }
    }
}

function mainElectricalDraw()
{
    electricalctx.fillStyle = "#000000";
    electricalctx.fillRect(0, 0, electricalCanvas.clientWidth, electricalCanvas.clientHeight); //clear
    for(var i = 0; i < redWire.length; i++)
    {
        var segment = redWire[i];
        electricalctx.strokeStyle = segment.color; 
        electricalctx.lineWidth = 4;
        electricalctx.beginPath();
        electricalctx.moveTo(segment.x, 320 - segment.y); //why is this 150 and not clientHeight
        var x2 = segment.x + segment.width * Math.cos(segment.angle);
        var y2 = segment.y + segment.width * Math.sin(segment.angle);
        
        electricalctx.lineTo(x2, 320 - y2);
        electricalctx.stroke();
    }
}

class wireSegment
{
    constructor(width, x, y, angle, color)
    {
        this.width = width;
        this.x = x; //x1
        this.y = y; //y1
        this.angle = angle; //rad
        this.color = color;

        this.xVel = 0.0;
        this.yVel = 0.0;
        this.held = false;
    }
}


///////////////////////
///////////////////////
///////////////////////
electricalStart();