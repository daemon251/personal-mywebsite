//set defualt values in here

const checkboxIDArray =
[
    ".global-star",
    ".global-chro",
    ".global-nixie",
]

const rangeIDArray = 
[
    ".bgc-r",
    ".bgc-g",
    ".bgc-b",

    ".mc-r",
    ".mc-g",
    ".mc-b",

    //".dmc-r",
    //".dmc-g",
    //".dmc-b",

    ".men-r",
    ".men-g",
    ".men-b",

    ".star-r",
    ".star-g",
    ".star-b",

    ".global-opacity",

    ".sc-hue",
    ".sc-value",
    ".sc-saturation"
];

//rgba in floats 0 - 1
function convertRGBToHex(r, g, b, a)
{
    r = Math.round((r * 255)).toString(16), 16;
    if(r.length < 2) {r = "0" + r;}

    g = Math.round((g * 255)).toString(16), 16;
    if(g.length < 2) {g = "0" + g;}

    b = Math.round((b * 255)).toString(16), 16;
    if(b.length < 2) {b = "0" + b;}

    a = Math.round((a * 255)).toString(16), 16;
    if(a.length < 2) {a = "0" + a;}

    return "#" + r + g + b + a;
}

function resetTopButtons()
{
    var anchors = document.querySelectorAll("a");

    for(var i = 0; i < anchors.length; i++)
    {
        var anchor = anchors[i];
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
    }
}

setConfigChanges(); //run on start as well
function setConfigChanges()
{
    if(localStorage.getItem(".mc-r") != null) 
    {
        if(localStorage.getItem(".global-opacity") === null) {localStorage.setItem(".global-opacity", "0.75");}

        var color1 = convertRGBToHex(localStorage.getItem(".mc-r"), localStorage.getItem(".mc-g"), localStorage.getItem(".mc-b"), 1);
        document.documentElement.style.setProperty('--color1', color1);

        var color1a = convertRGBToHex(localStorage.getItem(".mc-r"), localStorage.getItem(".mc-g"), localStorage.getItem(".mc-b"), 0.75);
        document.documentElement.style.setProperty('--color1a', color1a);

        var color2 = convertRGBToHex(localStorage.getItem(".men-r"), localStorage.getItem(".men-g"), localStorage.getItem(".men-b"), localStorage.getItem(".global-opacity"));
        document.documentElement.style.setProperty('--color2', color2);

        var color2a = convertRGBToHex(localStorage.getItem(".men-r"), localStorage.getItem(".men-g"), localStorage.getItem(".men-b"), 1);
        document.documentElement.style.setProperty('--color2a', color2a);

        var colorbg = convertRGBToHex(localStorage.getItem(".bgc-r"), localStorage.getItem(".bgc-g"), localStorage.getItem(".bgc-b"), 1);
        document.documentElement.style.setProperty('--color-bg', colorbg);

        document.documentElement.style.setProperty('--value', localStorage.getItem(".sc-value"));
        document.documentElement.style.setProperty('--hue-rotate', localStorage.getItem(".sc-hue") * 360 + "deg");
        document.documentElement.style.setProperty('--saturate', (localStorage.getItem(".sc-saturation") * 100) + "%");

        colorStars = "#" + radixToHex(localStorage.getItem(".star-r")) + radixToHex(localStorage.getItem(".star-g")) + radixToHex(localStorage.getItem(".star-b"))
        colorBackground = "#" + radixToHex(localStorage.getItem(".bgc-r")) + radixToHex(localStorage.getItem(".bgc-g")) + radixToHex(localStorage.getItem(".bgc-b"))

        if(localStorage.getItem(".global-nixie") === null) {localStorage.setItem(".global-nixie", "true");}
        if(localStorage.getItem(".global-chro") === null) {localStorage.setItem(".global-chro", "true");}
        if(localStorage.getItem(".global-star") === null) {localStorage.setItem(".global-star", "true");}

        nixieFlickering = localStorage.getItem(".global-nixie");
        chromaticAberrationEnabled = localStorage.getItem(".global-chro");
        starsEnabled = localStorage.getItem(".global-star");

        resetTopButtons();
    }
}

if(document.title == "williamianbrooks - Misc")
{
    for(var i = 0; i < rangeIDArray.length; i++)
    {
        createRangeListeners(rangeIDArray[i])
    }

    for(var i = 0; i < checkboxIDArray.length; i++)
    {
        createCheckboxListeners(checkboxIDArray[i])
    }
    updateConfigTextDescriptions();
}

function formatConfigColor(r, g, b)
{
    var string = "(";

    string = string + "<span style='color: #ff0000'>" + formatConfigNumber(Math.round(r * 255)) + "</span>, ";
    string = string + "<span style='color: #00ff00'>" + formatConfigNumber(Math.round(g * 255)) + "</span>, ";
    string = string + "<span style='color: #0000ff'>" + formatConfigNumber(Math.round(b * 255)) + "</span>) ";

    return string;
}

function formatConfigNumber(number)
{
    number = number.toString();
    while(number.length < 3) {number = "0" + number;}
    return number;
}

function formatConfigFloat(number)
{
    number = number.toString();
    if(number == "0") {return "0.000"}
    else if(number == "1") {return "1.000"}
    else if(number.length > 5) {return number.substring(0, 5)}
    return number;
}

function updateConfigTextDescriptions()
{
    document.getElementById(".men-text").innerHTML = formatConfigColor(localStorage.getItem(".men-r"), localStorage.getItem(".men-g"), localStorage.getItem(".men-b"));
    document.getElementById(".star-text").innerHTML = formatConfigColor(localStorage.getItem(".star-r"), localStorage.getItem(".star-g"), localStorage.getItem(".star-b"));
    document.getElementById(".bgc-text").innerHTML = formatConfigColor(localStorage.getItem(".bgc-r"), localStorage.getItem(".bgc-g"), localStorage.getItem(".bgc-b"));
    //document.getElementById(".dmc-text").innerHTML = formatConfigColor(localStorage.getItem(".dmc-r"), localStorage.getItem(".dmc-g"), localStorage.getItem(".dmc-b"));
    document.getElementById(".mc-text").innerHTML = formatConfigColor(localStorage.getItem(".mc-r"), localStorage.getItem(".mc-g"), localStorage.getItem(".mc-b"));

    document.getElementById(".global-opacity-text").innerHTML = "(" + formatConfigFloat(localStorage.getItem(".global-opacity")) + ")";
    document.getElementById(".sc-text").innerHTML = "(" + formatConfigNumber(Math.round(localStorage.getItem(".sc-hue") * 360)) + ", " + formatConfigNumber(Math.round(localStorage.getItem(".sc-value") * 100)) + "%" + ", " + formatConfigNumber(Math.round(localStorage.getItem(".sc-saturation") * 100)) + "%)";
}

function createCheckboxListeners(ID)
{
    if(localStorage.getItem(ID) == null) {localStorage.setItem(ID, document.getElementById(ID).checked)}

    if(localStorage.getItem(ID) == "true") 
    {
        document.getElementById(ID).checked = true;
    }
    else
    {
        document.getElementById(ID).checked = false;
    }
    

    document.getElementById(ID).addEventListener('change', function(event) {
        //console.log('Current value:', event.target.value);
        localStorage.setItem(ID, this.checked);
        updateConfigTextDescriptions();
        setConfigChanges();
    });
}

function createRangeListeners(ID)
{
    if(ID == ".global-opacity") {document.getElementById(ID).step = 1 / 1000;}
    else if (ID == ".sc-hue") {document.getElementById(ID).step = 1 / 360;}
    else if(ID == ".sc-value" || ID == ".sc-saturation") {document.getElementById(ID).step = 1 / 200;}
    else {document.getElementById(ID).step = 1 / 256;}

    if(localStorage.getItem(ID) == null) {localStorage.setItem(ID, document.getElementById(ID).value)}
    document.getElementById(ID).value = localStorage.getItem(ID);
    document.getElementById(ID).addEventListener('input', function(event) {
        //this seems like a lot of updates?
        localStorage.setItem(ID, event.target.value);
        updateConfigTextDescriptions();
        setConfigChanges();
    });

    document.getElementById(ID).addEventListener('change', function(event) {
        //console.log('Current value:', event.target.value);
        localStorage.setItem(ID, event.target.value);
        updateConfigTextDescriptions();
        setConfigChanges();
    });
}

function resetConfigSettings()
{
    var sliders = document.querySelectorAll(".slider");
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for(var i = 0; i < sliders.length; i++)
    {
        sliders[i].value = sliders[i].defaultValue;
        localStorage.setItem(sliders[i].id, sliders[i].defaultValue);
    }

    for(var i = 0; i < checkboxes.length; i++)
    {
        checkboxes[i].checked = checkboxes[i].defaultValue;
        localStorage.setItem(checkboxes[i].id, checkboxes[i].checked);
    }
    updateConfigTextDescriptions();
    setConfigChanges();
}