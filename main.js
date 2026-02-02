//to-do: increase text size above certain res
//alignment of box seems incorrect

function openGeneralPage() 
{
	window.open("file:///C:/Users/willb/Downloads/website/generalPage.html", "_blank");
}
function openMyStuffPage()
{
    window.open("file:///C:/Users/willb/Downloads/website/myStuffPage.html", "_blank");
}
function openContactPage()
{
    window.open("file:///C:/Users/willb/Downloads/website/contactPage.html", "_blank");
}
function openMiscPage()
{
    window.open("file:///C:/Users/willb/Downloads/website/miscPage.html", "_blank");
}

function dontClickTheCat() 
{
	alert("No, you cannot pet this cat.");
}

if(document.title == "williamianbrooks-website-contact")
{
    var catimg = document.querySelector('img');
    catimg.onclick = dontClickTheCat;
}

var anchors = document.querySelectorAll("a");

for(var i = 0; i < anchors.length; i++)
{
    var anchor = anchors[i];
    addListenersToAnchor(anchor);
}

function addListenersToAnchor(anchor)
{
    //anchors are used instead of functions on buttons so that the link preview exists.
    anchor.addEventListener('mouseover', () => 
    {
        //this sucks but works
        if(anchor.parentNode.className == "button")
        {
            anchor.parentNode.style.filter = "hue-rotate(var(--hue-rotate)) brightness(var(--value))";
            if((document.title == "williamianbrooks-website-stuffILike" && anchor.textContent == "Cool Stuff") || (document.title == "williamianbrooks-website-general" && anchor.textContent == "General") || (document.title == "williamianbrooks-website-myStuff" && anchor.textContent == "My Stuff") || (document.title == "williamianbrooks-website-misc" && anchor.textContent == "Settings") || (document.title == "williamianbrooks-website-contact" && anchor.textContent == "Contact"))
            {
                anchor.style.filter = "none"; //it already gets applied from button
                anchor.style.color = '#ff5500aa';
                anchor.parentNode.style.borderColor = '#ff5500aa'; 
            }
            else
            {
                anchor.style.filter = "none"; //it already gets applied from button
                anchor.style.color = '#ff5500ff';
                anchor.parentNode.style.borderColor = '#ff5500ff'; 
            }
        }
    });

    anchor.addEventListener("mouseout", (event) => 
    {
        //this sucks but works
        if(anchor.parentNode.className == "button")
        {
            anchor.parentNode.style.filter = "";
            if((document.title == "williamianbrooks-website-stuffILike" && anchor.textContent == "Cool Stuff") || (document.title == "williamianbrooks-website-general" && anchor.textContent == "General") || (document.title == "williamianbrooks-website-myStuff" && anchor.textContent == "My Stuff") || (document.title == "williamianbrooks-website-misc" && anchor.textContent == "Settings") || (document.title == "williamianbrooks-website-contact" && anchor.textContent == "Contact"))
            {
                anchor.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color1a');
                anchor.parentNode.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color1a');
            }
            else
            {
                anchor.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color1');
                anchor.parentNode.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--color1');
            }
        }
    })
}

document.addEventListener('mousemove', function(event) 
{
    mouseXRaw = event.clientX;
    mouseYRaw = event.clientY;
    mouseYAdjusted = mouseYRaw + scrollY;
    //console.log('Mouse X:', event.clientX, 'Mouse Y:', event.clientY);
});

var contentgrids = document.querySelectorAll(".contentgrid");
setContentGridsSettings();

function setContentGridsSettings()
{
    var tallContent = false;

    for(var i = 0; i < contentgrids.length; i++)
    {
        var cg = contentgrids[i];
        
        var doubleLengthGrid = true;
        if(doubleLengthGrid)//width >= 1210)
        {
            tallContent = false;
            cg.style.gridTemplateColumns = '1fr 1fr';
            for(var k = 0; k < cg.children.length; k++)
            {
                contentBar = cg.children[k];
                if(contentBar.children.length == 0) {continue;}
                if(contentBar.className == "contentbar-noimg") {break;}
                if(contentBar.className == "contentbar-tall")
                {
                    tallContent = true;
                    contentBar.style.height = "calc(420px)"; //"calc(27vw)"
                }
                else
                {
                    contentBar.style.height = "calc(124px)"; //"calc(9vw)"
                }

                var row = contentBar.children[0];
                var largeSegment = row.children[1];
                var aligner = largeSegment.children[0];
                var h2 = aligner.children[0];
                var p = aligner.children[1];

                h2.style.fontSize = "calc(18px)"; //"calc(1.5vw)"
                p.style.fontSize = "calc(12px)"; //"calc(1vw)"

                largeSegment.style.width = "calc(69%)"; //"calc(8.55vw)"
                largeSegment.style.flex = "0px 0px 31%";

                var row2 = largeSegment.children[1];
                if(row2 != null)
                {
                    for(var j = 0; j < row2.children.length; j++)
                    {
                        if(tallContent == true)
                        {
                            row2.style.width = "235px";
                        }
                        else
                        {
                            row2.style.width = "250px"; //80%
                            row2.style.padding = "0px 0px 0px 8px";
                        }
                        var textbox = row2.children[j];
                        var p2 = textbox.children[0];
                        if(textbox.children.length > 1)
                        {
                            var a = textbox.children[1];
                            a.style.fontSize = "calc(9px)"; //"calc(0.75w)"
                        }
                        p2.style.fontSize = "calc(9px)"; //"calc(0.75w)"
                    }
                }

                var smallSegment = row.children[0];
                smallSegment.style.width = "calc(31%)"; //"calc(8.55vw)"
                smallSegment.style.height = "124px";
                smallSegment.style.alignItems = "center";
                smallSegment.style.paddingTop = "0px";
                smallSegment.style.flex = "0px 0px 31%";
                
                if(contentBar.className == "contentbar-tall")
                {
                    smallSegment.style.width = "calc(160px)"; //"calc(12.825vw)"
                    var aligner2 = smallSegment.children[1];
                    for(var j = 0; j < aligner2.children.length; j++)
                    {
                        aligner2.children[j].style.fontSize = "calc(10px)"; //"calc(1vw)"
                    }
                }
            }

            //add empty contentbar, fixes border. 
            //spaghetti
            if(cg.children.length % 2 == 1)
            {
                var lastContentBar = cg.children[cg.children.length - 1];
                if(lastContentBar.children.length != 0)
                {
                    var newDiv = document.createElement("div");
                    if(tallContent == true)
                    {
                        newDiv.className = "contentbar-tall";
                        newDiv.style.height = "calc(420px)"; //"calc(27vw)"
                    }
                    else
                    {
                        newDiv.className = "contentbar";
                        newDiv.style.height = "calc(124px)"; //"calc(9vw)"
                    }
                    var referenceNode = cg.children[cg.children.length - 1];
                    referenceNode.parentNode.insertBefore(newDiv, referenceNode.nextSibling);
                }
            }
        }
        else
        {
            cg.style.gridTemplateColumns = '1fr';

            //remove last contentbar if it has no children
            var lastContentBar = cg.children[cg.children.length - 1];
            if(lastContentBar.children.length == 0)
            {
                lastContentBar.remove();
            }

            for(var contentBar of cg.children)
            {
                if(contentBar.className == "contentbar-tall")
                {
                    tallContent = true;
                    contentBar.style.height = "calc(54vw)";
                }
                else
                {
                    contentBar.style.height = "calc(16.8vw)";
                }

                var row = contentBar.children[0];
                var largeSegment = row.children[1];
                var aligner = largeSegment.children[0];
                var h2 = aligner.children[0];
                var p = aligner.children[1];

                h2.style.fontSize = "calc(2.4vw)";
                p.style.fontSize = "calc(1.6vw)";

                var row2 = largeSegment.children[1];
                if(row2 != null)
                {
                    if(tallContent == true)
                    {
                        row2.style.width = "calc(75% - 68px)";
                    }
                    else
                    {
                        row2.style.width = "calc(77% - 23px)";
                        row2.style.padding = "0px 0px 0px 2.85%";
                    }
                    for(var j = 0; j < row2.children.length; j++)
                    {
                        var textbox = row2.children[j];
                        var p2 = textbox.children[0];
                        if(textbox.children.length > 1)
                        {
                            var a = textbox.children[1];
                            a.style.fontSize = "calc(1.5vw)";
                        }
                        var p2 = textbox.children[0];
                        p2.style.fontSize = "calc(1.5vw)";
                    }
                }
                var smallSegment = row.children[0];
                smallSegment.style.width = "calc(14.1vw)";
                smallSegment.style.alignItems = "top";
                smallSegment.style.paddingTop = "4px";
                if(contentBar.className == "contentbar-tall")
                {
                    smallSegment.style.width = "calc(25.65vw)";
                    var aligner2 = smallSegment.children[1];
                    for(var j = 0; j < aligner2.children.length; j++)
                    {
                        aligner2.children[j].style.fontSize = "calc(2vw)";
                    }
                }
            }
        }
        
    }
}

window.onresize = function(event) 
{
    setContentGridsSettings();
};

var nixies = document.querySelectorAll(".nixie");
var nixieFlickering = true;
setInterval(function() //flickering
{
    if(nixieFlickering == "true")
    {
        for(var i = 0; i < nixies.length; i++)
        {
            var nixie = nixies[i];
            var brightnessRand = Math.random();
            var glowSize = 22.5 + 5 * brightnessRand;
            nixie.style.boxShadow = "0px 0px " + glowSize + "px #ff550038";
            var brightMult = 96 + 8 * brightnessRand;
            nixie.style.filter = "brightness(" + brightMult + "%) ";

            var brightnessValue = getComputedStyle(document.documentElement).getPropertyValue('--value') * brightMult;

            nixie.style.filter = "hue-rotate(var(--hue-rotate)) brightness(" + brightnessValue + "%)";
        }
    }
}, 80); 

function getNixieImageURLFromNumber(num)
{
    num = num.toString();
    if(num == "0") {return "url('data/img/nixie-tube/0.png')"}
    else if(num == "1") {return "url('data/img/nixie-tube/1.png')"}
    else if(num == "2") {return "url('data/img/nixie-tube/2.png')"}
    else if(num == "3") {return "url('data/img/nixie-tube/3.png')"}
    else if(num == "4") {return "url('data/img/nixie-tube/4.png')"}
    else if(num == "5") {return "url('data/img/nixie-tube/5.png')"}
    else if(num == "6") {return "url('data/img/nixie-tube/6.png')"}
    else if(num == "7") {return "url('data/img/nixie-tube/7.png')"}
    else if(num == "8") {return "url('data/img/nixie-tube/8.png')"}
    else if(num == "9") {return "url('data/img/nixie-tube/9.png')"}
    else if(num == ".") {return "url('data/img/nixie-tube/Dot.png')"}
}

const nixiesFPSElement = document.getElementById(".site-FPS"); 
const nixiesVisitsElement = document.getElementById(".site-visits"); 
const nixiesUniqueVisitsElement = document.getElementById(".site-uniqueVisits"); 
const nixiesCurrentVisitsElement = document.getElementById(".site-currentVisitors"); 

var frame = 0;
var startTime = Date.now();
var fps = 0;
var numVisits = 0;
var currentUserVisits = 0;
var uniqueVisits = 0;

function tick() 
{
    var time = Date.now();
    frame++;
    if (time - startTime > 100) 
    {
        fps = Math.round((frame / ((time - startTime) / 1000)).toFixed(1));
        startTime = time;
        frame = 0;
    }
    window.requestAnimationFrame(tick);
}
tick();

/*var errorCount = 0;

window.onerror = function(message, source, lineno, colno, error) {
    errorCount++;
    //console.log(`Error ${errorCount}: ${message} at ${source}:${lineno}:${colno}`);
};*/

const nixiesDateElement = document.getElementById(".site-nixiesDate");
const nixiesTimeElement = document.getElementById(".site-nixiesTime"); 

if(nixiesTimeElement != null)
{
    updateTime();
}
setInterval(function()
{ //update nixie times
    if(nixiesTimeElement != null)
    {
        updateTime();
    }
    if(nixiesFPSElement != null)
    {
        nixiesFPSElement.children[0].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(fps / 1000000) % 10);
        nixiesFPSElement.children[1].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(fps / 100000) % 10);

        nixiesFPSElement.children[2].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(fps / 10000) % 10);
        nixiesFPSElement.children[3].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(fps / 1000) % 10);

        nixiesFPSElement.children[4].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(fps / 100) % 10);
        nixiesFPSElement.children[5].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(fps / 10) % 10);

        nixiesFPSElement.children[6].style.backgroundImage = getNixieImageURLFromNumber(fps % 10);
    }
    if(nixiesVisitsElement != null)
    {
        nixiesVisitsElement.children[0].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(numVisits / 1000000) % 10);
        nixiesVisitsElement.children[1].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(numVisits / 100000) % 10);

        nixiesVisitsElement.children[2].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(numVisits / 10000) % 10);
        nixiesVisitsElement.children[3].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(numVisits / 1000) % 10);

        nixiesVisitsElement.children[4].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(numVisits / 100) % 10);
        nixiesVisitsElement.children[5].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(numVisits / 10) % 10);

        nixiesVisitsElement.children[6].style.backgroundImage = getNixieImageURLFromNumber(numVisits % 10);
    }
    if(nixiesCurrentVisitsElement != null)
    {
        nixiesCurrentVisitsElement.children[0].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(currentUserVisits / 1000000) % 10);
        nixiesCurrentVisitsElement.children[1].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(currentUserVisits / 100000) % 10);

        nixiesCurrentVisitsElement.children[2].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(currentUserVisits / 10000) % 10);
        nixiesCurrentVisitsElement.children[3].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(currentUserVisits / 1000) % 10);

        nixiesCurrentVisitsElement.children[4].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(currentUserVisits / 100) % 10);
        nixiesCurrentVisitsElement.children[5].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(currentUserVisits / 10) % 10);

        nixiesCurrentVisitsElement.children[6].style.backgroundImage = getNixieImageURLFromNumber(currentUserVisits % 10);
    }
    if(nixiesUniqueVisitsElement != null)
    {
        nixiesCurrentVisitsElement.children[0].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(uniqueVisits / 1000000) % 10);
        nixiesCurrentVisitsElement.children[1].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(uniqueVisits / 100000) % 10);

        nixiesCurrentVisitsElement.children[2].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(uniqueVisits / 10000) % 10);
        nixiesCurrentVisitsElement.children[3].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(uniqueVisits / 1000) % 10);

        nixiesCurrentVisitsElement.children[4].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(uniqueVisits / 100) % 10);
        nixiesCurrentVisitsElement.children[5].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(uniqueVisits / 10) % 10);

        nixiesCurrentVisitsElement.children[6].style.backgroundImage = getNixieImageURLFromNumber(uniqueVisits % 10);
    }
}, 100)

function updateTime()
{
    const date = new Date();

    var utcStr = date.toUTCString();
    var index = utcStr.indexOf(":");
    const hours = (parseInt(utcStr.substring(index - 2, index), 10) + 18) % 24; //modulus of negative number is strange so just use a positive one

    //bad to fetch image from place, store it in memory instead
    //same for any timezone
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const millis = date.getMilliseconds();

    nixiesTimeElement.children[0].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(hours / 10));
    nixiesTimeElement.children[1].style.backgroundImage = getNixieImageURLFromNumber(hours % 10);

    nixiesTimeElement.children[2].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(minutes / 10));
    nixiesTimeElement.children[3].style.backgroundImage = getNixieImageURLFromNumber(minutes % 10);

    nixiesTimeElement.children[4].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(seconds / 10));
    nixiesTimeElement.children[5].style.backgroundImage = getNixieImageURLFromNumber(seconds % 10);

    nixiesTimeElement.children[7].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(millis / 100));
}

if(nixiesDateElement != null) {updateDate();}
function updateDate()
{
    const date = new Date();

    nixiesDateElement.children[0].style.backgroundImage = getNixieImageURLFromNumber(Math.floor(date.getDate() / 10));
    nixiesDateElement.children[1].style.backgroundImage = getNixieImageURLFromNumber(date.getDate() % 10);

    nixiesDateElement.children[2].style.backgroundImage = getNixieImageURLFromNumber(Math.floor((date.getMonth() + 1) / 10));
    nixiesDateElement.children[3].style.backgroundImage = getNixieImageURLFromNumber((date.getMonth() + 1) % 10);

    nixiesDateElement.children[4].style.backgroundImage = getNixieImageURLFromNumber(Math.floor((date.getFullYear() / 1000)));
    nixiesDateElement.children[5].style.backgroundImage = getNixieImageURLFromNumber(Math.floor((date.getFullYear() / 100)) % 10);
    nixiesDateElement.children[6].style.backgroundImage = getNixieImageURLFromNumber(Math.floor((date.getFullYear() / 10) % 10));
    nixiesDateElement.children[7].style.backgroundImage = getNixieImageURLFromNumber(date.getFullYear() % 10);
}

catIndex = 0;
funnyCatImages = 
[
    "jinxOnComputer.gif",
    "cat-angry.gif",
    "cat-smile-happy-cat.gif", 
    "crunchycat.gif",
    "milly-cat.gif",
    "seriousRightMeow.gif",
    "snowcat.gif",
    "cat-whattt.gif",
    "cat-driving-cat.gif",
    "cat-hit-camera.gif",
    "cat-mean.gif",
    "cat-on-skateboard-cat.gif",
    "cats-push.gif",
    "cat-stare-catstare.gif",
    "dubious-conjecture.gif",
    "get-real.gif",
    "jinx-goofy.gif",
    "kitten-meow.gif",
    "sad-cat.gif",
    "catskating.gif",
    "cat-bop-camera.gif"
]

function rerollCat()
{
    catImageElement = document.getElementById("cat-image-funny");

    numCats = funnyCatImages.length;
    var random = Math.floor(Math.random() * (numCats - 1));
    if(random >= catIndex) {random++;}
    catIndex = random;
    var catURL = "data/img/funnycates/" + funnyCatImages[catIndex];
    //console.log(catURL);
    catImageElement.src = catURL;
}

var stringIDMap = {};

function setStringIDMap(realData)
{
    stringIDMap = new Map();
    if(realData == true)
    {
        var keys = Object.keys(data);
        //console.log(data);
        for(var i = 0; i < keys.length; i++)
        {
            var key = keys[i];
            stringIDMap.set(key, data[key])
            //console.log(key + " " + data[key])
        }
    }
    else //kind of annoying that this is hardcoded... whatever
    {
        stringIDMap.set(".uk-reviews", "...");
        stringIDMap.set(".uk-lastUpdate", "...");

        stringIDMap.set(".otd-reviews", "...");
        stringIDMap.set(".otd-lastUpdate", "...");

        stringIDMap.set(".kz-reviews", "...");
        stringIDMap.set(".kz-lastUpdate", "...");

        stringIDMap.set(".bal-reviews", "...");
        stringIDMap.set(".bal-lastUpdate", "...");

        stringIDMap.set(".ftl-reviews", "...");
        stringIDMap.set(".ftl-lastUpdate", "...");

        stringIDMap.set(".po2-reviews", "...");
        stringIDMap.set(".po2-lastUpdate", "...");

        stringIDMap.set(".tf2-reviews", "...");
        stringIDMap.set(".tf2-lastUpdate", "...");

        //stringIDMap.set(".cbb-reviews", "abc");
        //stringIDMap.set(".fri-reviews", "abc");
        //stringIDMap.set(".mob-reviews", "abc");

        stringIDMap.set(".utm-ver", "...");
        stringIDMap.set(".utm-lastUpdated", "...");
        stringIDMap.set(".utm-totalDownloads", "...");

        stringIDMap.set(".wvb-ver", "...");
        stringIDMap.set(".wvb-lastUpdated", "...");
        stringIDMap.set(".wvb-totalDownloads", "...");

        stringIDMap.set(".uci-ver", "...");
        stringIDMap.set(".uci-lastUpdated", "...");
        stringIDMap.set(".uci-totalDownloads", "...");

        stringIDMap.set(".dwu-ver", "...");
        stringIDMap.set(".dwu-lastUpdated", "...");
        stringIDMap.set(".dwu-totalDownloads", "...");

        stringIDMap.set(".urgbl-ver", "...");
        stringIDMap.set(".urgbl-lastUpdated", "...");
        stringIDMap.set(".urgbl-totalDownloads", "...");

        stringIDMap.set(".emp-ver", "...");
        stringIDMap.set(".emp-lastUpdated", "...");
        stringIDMap.set(".emp-totalDownloads", "...");

        stringIDMap.set(".drp-ver", "...");
        stringIDMap.set(".drp-lastUpdated", "...");
        stringIDMap.set(".drp-totalDownloads", "...");

        stringIDMap.set(".htr-ver", "...");
        stringIDMap.set(".htr-lastUpdated", "...");
        stringIDMap.set(".htr-totalDownloads", "...");

        stringIDMap.set(".fdn-ver", "...");
        stringIDMap.set(".fdn-lastUpdated", "...");
        stringIDMap.set(".fdn-totalDownloads", "...");

        stringIDMap.set(".rgb21-ver", "...");
        stringIDMap.set(".rgb21-lastUpdated", "...");
        stringIDMap.set(".rgb21-originalLink", "...");

        stringIDMap.set(".site-titleDate", "...");
    }
}

function setIDStrings()
{
    for(const key of stringIDMap.keys())
    {
        var span = document.getElementById(key);
        if(span != null)
        {
            span.innerHTML = stringIDMap.get(key);
        }
    }
}

setStringIDMap(false);
setIDStrings(); 

var data = {};
var dataIn = fetch('https://williamianbrooks.com/data/values/data.json')
    .then(response => 
    {
        if(!response.ok) 
        {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(dataIn => 
    {
        //console.log(Object.keys(dataIn))
        //console.log(dataIn["key"]); // Access the parsed JSON data here
        data = dataIn;
        setStringIDMap(true); //does not instantly work because it is a web request
        setIDStrings();
    })
    .catch(error => 
    {
        console.error('There was a problem with the fetch operation:', error);
    });

