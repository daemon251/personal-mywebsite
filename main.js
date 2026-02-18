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

if(document.title == "williamianbrooks - My Contact")
{
    var catimg = document.getElementById("dontClickTheCat");
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
            anchor.parentNode.style.filter = "hue-rotate(var(--hue-rotate)) brightness(var(--value)) saturate(var(--saturate)";
            if((document.title == "williamianbrooks - Main Page" && anchor.textContent == "General") || (document.title == "williamianbrooks - My Work" && anchor.textContent == "My Work") || (document.title == "williamianbrooks - Misc" && anchor.textContent == "Settings") || (document.title == "williamianbrooks - My Contact" && anchor.textContent == "Contact"))
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
            if((document.title == "williamianbrooks - Main Page" && anchor.textContent == "General") || (document.title == "williamianbrooks - My Work" && anchor.textContent == "My Work") || (document.title == "williamianbrooks - Misc" && anchor.textContent == "Settings") || (document.title == "williamianbrooks - My Contact" && anchor.textContent == "Contact"))
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

        tallContent = false;
        if(document.title == "williamianbrooks - Stuff I Like") {tallContent = true;}
        cg.style.gridTemplateColumns = '1fr 1fr';

        /*for(var k = 0; k < cg.children.length; k++)
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
                        row2.style.width = "350px";
                    }
                    else
                    {
                        //row2.style.width = "250px"; //80%
                        //row2.style.padding = "0px 0px 0px 8px";
                    }
                    var textbox = row2.children[j];
                    var p2 = textbox.children[0];

                    var textSize = "9px";
                    if(document.title == "williamianbrooks-stuffILike") {textSize = "12px"}

                    if(textbox.children.length > 1)
                    {
                        var a = textbox.children[1];
                        a.style.fontSize = textSize; //"calc(0.75w)"
                    }
                    p2.style.fontSize = textSize; //"calc(0.75w)"
                }
            }

            var smallSegment = row.children[0];
            //smallSegment.style.width = "calc(31%)"; //"calc(8.55vw)"
            //smallSegment.style.height = "124px";
            //smallSegment.style.alignItems = "center";
            //smallSegment.style.paddingTop = "0px";
            //smallSegment.style.flex = "0px 0px 31%";
            
            if(contentBar.className == "contentbar-tall")
            {
                smallSegment.style.width = "calc(160px)"; //"calc(12.825vw)"
                var aligner2 = smallSegment.children[1];
                for(var j = 0; j < aligner2.children.length; j++)
                {
                    aligner2.children[j].style.fontSize = "calc(12px)"; //"calc(1vw)"
                }
            }
        }*/

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
                    //newDiv.style.height = "calc(420px)"; //"calc(27vw)"
                }
                else
                {
                    newDiv.className = "contentbar";
                    //newDiv.style.height = "calc(124px)"; //"calc(9vw)"
                }
                var referenceNode = cg.children[cg.children.length - 1];
                referenceNode.parentNode.insertBefore(newDiv, referenceNode.nextSibling);
            }
        }
    }
}

function scaleStars(xMaxOld, yMaxOld)
{
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

var nixies = document.querySelectorAll(".nixie");
var nixieFlickering = "true";
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

            nixie.style.filter = "hue-rotate(var(--hue-rotate)) brightness(" + brightnessValue + "%) saturate(var(--saturate)";
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

catIndex = 1;
funnyCatImages = 
[
    //"jinxOnComputer.gif",    appended manually
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

funnyCatImagesRandomSorted = [];

function randomSortCats()
{
    funnyCatImagesRandomSorted[0] = "jinxOnComputer.gif";
    for(var i = 1; i < funnyCatImages.length; i++)
    {
        var insertIndex = Math.floor(Math.random() * funnyCatImages.length);
        var quote = funnyCatImages[i]
        for(var j = 0; j < funnyCatImages.length; j++)
        {
            if(funnyCatImagesRandomSorted[insertIndex] == undefined)
            {
                funnyCatImagesRandomSorted[insertIndex] = quote;
                break;
            }
            else
            {
                insertIndex++;
                if(insertIndex >= funnyCatImages.length) {insertIndex = 0;}
            }
        }
    }
}

randomSortCats();
function rerollCat()
{
    catImageElement = document.getElementById("cat-image-funny");

    var catURL = "data/img/funnycates/" + funnyCatImagesRandomSorted[catIndex];
    catImageElement.src = catURL;

    catIndex++;

    if(catIndex == funnyCatImagesRandomSorted.length) 
    {
        catIndex = 0;
        //randomSortCats(); //dont re-sort it, just make it loop
    }

    /*numCats = funnyCatImages.length;
    var random = Math.floor(Math.random() * (numCats - 1));
    if(random >= catIndex) {random++;}
    catIndex = random;
    var catURL = "data/img/funnycates/" + funnyCatImages[catIndex];
    //console.log(catURL);
    catImageElement.src = catURL;*/
}

var quoteIndex = 0;
var quotes = 
[
    //{text: "like a bag full of bags, you are full of yourself", author: "Anonymous", date: "2024"},
    //{text: "purgatory would reject you for being a bad influence", author: "Anonymous", date: "2025"},
    {text: "Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.", author: "Archimedes", date: null},
    {text: "A new scientific truth does not triumph by convincing its opponents and making them see the light, but rather because its opponents eventually die, and a new generation grows up that is familiar with it.", author: "Max Planck", date: "~1940s"},
    {text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin", date: null},
    {text: "Engineers like to solve problems. If there are no problems handily available, they will create their own problems.", author: "Scott Adams", date: null},
    {text: "To the optimist, the glass is half full. To the pessimist, the glass is half empty. To the engineer, the glass is twice as big as it needs to be.", author: "Anonymous", date: null},
    {text: "If you see a bomb technician running, follow him.", author: "USAF Ammo Troop", date: null},
    {text: "What does all this mean? I don't \u2665\u2665\u2665\u2665ing remember. The way I code is \"I drink lots of Monster and pass out for eight hours\". It's kind of like alcoholism but less productive.", author: "Michael Reeves", date: "2019"},
    {text: "Keep It Simple Stupid", author: "Kelly Johnson", date: "~1960"},
    {text: "Success is a lousy teacher. It seduces smart people into thinking they can't lose.", author: "Bill Gates", date: "1996"},
    {text: "No amount of experimentation can ever prove me right; a single experiment can prove me wrong.", author: "Albert Einstein", date: "1928?"},
    {text: "When you want to know how things really work, study them when they're coming apart.", author: "William Gibson", date: null},
    {text: "Don't measure in millimeters what will be marked with a crayon and cut with an axe.", author: "Proverb", date: null},
    {text: "One test is worth a thousand expert opinions.", author: "Wernher von Braun", date: null},
    {text: "Doctors can kill one patient at a time. Engineers can be much more efficient.", author: "Anonymous", date: null},
    {text: "On two occasions I have been asked, \"Pray, Mr. Babbage, if you put into the machine wrong figures, will the right answers come out?\" ... I am not able rightly to apprehend the kind of confusion of ideas that could provoke such a question.", author: "Charles Babbage", date: "1864"},
    {text: "The best engineers have the worst handwriting", author: "Unknown", date: null},
    {text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.", author: "Brian Kernighan", date: "~1970s"},
    {text: "At the source of every error which is blamed on the computer you will find at least two human errors, including the error of blaming it on the computer.", author: "Tom Gibb", date: "2002"},
    {text: "Engineers are not boring people. We just get excited about boring things.", author: "Unknown", date: null},
    {text: "A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exupery", date: null},
    {text: "Every electronic device runs on smoke internally. If the smoke ever escapes, the device stops working.", author: "Unknown", date: null},
    {text: "Simplicity is the ultimate sophistication.", author: "Leonardo Da Vinci", date: null},
    {text: "The man who can smile when things go wrong has thought of someone else he can blame it on.", author: "Robert Bloch", date: "late 20th century"},
    {text: "It's easy to quit smoking - I've done it a thousand times!", author: "Mark Twain", date: null},
    //{text: "Build a man a fire, and he'll be warm for a day. Set a man on fire, and he'll be warm for the rest of his life.", author: "Terry Pratchett", date: "1997"},
    {text: "Outside of a dog, a book is man's best friend. Inside of a dog it's too dark to read.", author: "Groucho Marx", date: null},
    {text: "What do I think of Western civilization? I think it would be a very good idea.", author: "Mahatma Gandhi", date: null},
    {text: "You'll never know what worse luck your bad luck has saved you from.", author: "Cormac McCarthy", date: null},
    {text: "A problem properly stated is a problem partly solved.", author: "Henry Hazlitt", date: null},
    {text: "Arguing with an engineer is like wrestling with a pig in the mud- after a few minutes you realize the pig likes it.", author: "Unknown", date: null},
    {text: "If you need a machine and don't buy it, you will eventually find that you have paid for the machine and don't have it.", author: "Henry Ford", date: null},
    {text: "For every four engineers on a team, there must be at least one non-engineer, unless you want a product that only engineers can use.", author: "Unknown", date: null},
    {text: "Don't try to make it idiot proof. Someone's already working on a better idiot.", author: "Unknown", date: null},
    {text: "The best way to get the right answer on the Internet is not to ask a question; it's to post the wrong answer.", author: "Ward Cunningham, Cunningham's Law", date: "1980s"},
    {text: "Never stick your hand/finger anywhere you're not willing to stick your \u2665\u2665\u2665\u2665.", author: "Unknown", date: null},
    {text: "When a clown moves into a palace, he doesn't become a king. The palace turns into a circus.", author: "Turkish Proverb", date: null},
    {text: "No balloon and no aeroplane will ever be practically successful.", author: "Lord Kelvin", date: "1902"},
    {text: "You insist that there is something a machine cannot do. If you tell me precisely what it is a machine cannot do, then I can always make a machine which will do just that.", author: "John von Neumann", date: "1948"},
    {text: "The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore, all progress depends on the unreasonable man. ", author: "George Bernard Shaw", date: null},
    {text: "People in the West have asked why no diversity in my games but they are wrong, when all my games have included a gay character: you, the player", author: "Hideo Kojima", date: "2023"}
    //{text: "sample", author: "sample", date: "sample"}
]

var quotesRandomSorted = [];

if(document.getElementById(".quote") != undefined)
{
    randomSortQuotes();
    rerollQuote();
}

function randomSortQuotes()
{
    for(var i = 0; i < quotes.length; i++)
    {
        var insertIndex = Math.floor(Math.random() * quotes.length);
        var quote = quotes[i]
        for(var j = 0; j < quotes.length; j++)
        {
            if(quotesRandomSorted[insertIndex] == undefined)
            {
                quotesRandomSorted[insertIndex] = quote;
                break;
            }
            else
            {
                insertIndex++;
                if(insertIndex >= quotes.length) {insertIndex = 0;}
            }
        }
    }
}

function rerollQuote()
{
    //randomly generate a random order of the quotes to show, generate it every time we go through it
    quoteElement = document.getElementById(".quote");
    var quote = quotesRandomSorted[quoteIndex];
    if(quoteIndex == quotesRandomSorted.length) {quoteIndex = 0; randomSortQuotes();}
    quote = quotesRandomSorted[quoteIndex];

    quoteIndex++;

    if(quoteIndex == quotesRandomSorted.length) 
    {
        quoteElement.innerHTML = "You have gone through the entire list. You can go through it again if you want."
    }
    else
    {
        if(quote.date == null || quote.date == undefined)
        {
            quoteElement.innerHTML = "<i>" + quote.text + "</i>" + "<br><br><b>- " + quote.author + "</b>";
        }
        else
        {
            quoteElement.innerHTML = "<i>" + quote.text + "</i>" + "<br><br><b>- " + quote.author + ", " + quote.date + "</b>";
        }
        
    }
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
        stringIDMap.set(".uk-players", "...");

        stringIDMap.set(".otd-reviews", "...");
        stringIDMap.set(".otd-players", "...");

        stringIDMap.set(".kz-reviews", "...");
        stringIDMap.set(".kz-players", "...");

        stringIDMap.set(".bal-reviews", "...");
        stringIDMap.set(".bal-players", "...");

        stringIDMap.set(".ftl-reviews", "...");
        stringIDMap.set(".ftl-players", "...");

        stringIDMap.set(".po2-reviews", "...");
        stringIDMap.set(".po2-players", "...");

        stringIDMap.set(".tf2-reviews", "...");
        stringIDMap.set(".tf2-players", "...");

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
        //stringIDMap.set(".rgb21-originalLink", "...");

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


//this is done for all pages, though perhaps not wise.
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

function determineIfDarkMode()
{
    //run on start

    /*take into account user settings*/
    //rudimentary
    var value = parseFloat(localStorage.getItem(".mc-r")) + parseFloat(localStorage.getItem(".mc-g")) + parseFloat(localStorage.getItem(".mc-b"));
    if(value < 0.55 * 3)
    {
        return true;
    }
    return false;
}

if(determineIfDarkMode() == true)
{
    //on page start
    var button = document.getElementById("darkmodeButton")
    button.src = "data/img/ui/darkModeDark.png"
}

function darkModeButtonClick()
{
    var button = document.getElementById("darkmodeButton")
    //resetConfigSettings();
    if(determineIfDarkMode() == true)
    {
        localStorage.setItem(".mc-r", 1);
        localStorage.setItem(".mc-g", 1);
        localStorage.setItem(".mc-b", 1);

        localStorage.setItem(".star-r", 1);
        localStorage.setItem(".star-g", 1);
        localStorage.setItem(".star-b", 1);

        localStorage.setItem(".sc-hue", 0);
        localStorage.setItem(".sc-saturation", 1);
        localStorage.setItem(".sc-value", 1);

        button.src = "data/img/ui/darkModeBright.png"
    }
    else
    {
        localStorage.setItem(".mc-r", 0.5);
        localStorage.setItem(".mc-g", 0.5);
        localStorage.setItem(".mc-b", 0.5);

        localStorage.setItem(".bgc-r", 0.0);
        localStorage.setItem(".bgc-g", 0.0);
        localStorage.setItem(".bgc-b", 0.0);

        localStorage.setItem(".men-r", 0.0);
        localStorage.setItem(".men-g", 0.0);
        localStorage.setItem(".men-b", 0.0);

        localStorage.setItem(".star-r", 0);
        localStorage.setItem(".star-g", 88.0 / 255);
        localStorage.setItem(".star-b", 191.0 / 225);

        localStorage.setItem(".sc-hue", 203.0 / 360);
        localStorage.setItem(".sc-saturation", 0.75);
        localStorage.setItem(".sc-value", 0.75);

        button.src = "data/img/ui/darkModeDark.png"
    }

    console.log("aaaa");

    if(document.getElementById(".men-text") != undefined)
    {
        updateConfigTextDescriptions();
    }
    setConfigChanges();
}