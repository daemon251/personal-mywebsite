/* run this with node on server */

const jsonfile = require('jsonfile');
var outputDataMap = new Map();

console.log("Script Started");

var webHits = 0;
var webMisses = 0;

function formatTime(timeIn)
{
    return "abc" + timeIn;
}

function writeToJSONData(url, keyIn, keyOut, value)
{
    if(value == null) 
    {
        console.log("Value for key \"" + keyIn + "\" at url \"" + url + "\" was undefined.");
    }
    if(keyOut.includes("lastUpdated")) {value = formatTime(value);}

    var spaceBuffer = " ".repeat(24 - keyOut.length);

    outputDataMap.set(keyOut, value);
    console.log("Phase " + phase + " - Saving Key: " + keyOut + spaceBuffer + "Value: " + value);
}

function checkForEnd()
{
    var webTriesTotal = Array.from(linksThunderstore.keys()).length * 2 +
    Array.from(linksSteamWorkshop.keys()).length +
    Array.from(linksSteamGame.keys()).length + 
    Array.from(linksGithub.keys()).length;

    if(webHits + webMisses == Array.from(linksThunderstore.keys()).length)
    {
        phase = 1;
        thunderstoreLogicPhase2(); //phase 1
    }
    /*else if(webHits + webMisses == Array.from(linksThunderstore.keys()).length * 2)
    {
        console.log("b");
        phase = 2;
        steamWorkshopLogic(); //phase 2
    }
    else if(webHits + webMisses == Array.from(linksThunderstore.keys()).length * 2 + Array.from(linksSteamWorkshop.keys()).length)
    {
        phase = 3;
        steamGameLogic(); //phase 3
    }
    else if(webHits + webMisses == Array.from(linksThunderstore.keys()).length * 2 + Array.from(linksSteamWorkshop.keys()).length + Array.from(linksSteamGame.keys()).length)
    {
        phase = 4;
        githubLogic(); //phase 4
    }*/
    else if(webHits + webMisses == webTriesTotal)
    {
        jsonfile.writeFile('data.json', Object.fromEntries(outputDataMap), {spaces: 2}, (err) => 
        {
            if (err) console.error(err);
            else console.log('JSON file written successfully');
            console.log("\nScript Completed. Hits / Misses: " + webHits + " / " + webMisses);
        });
    }
}

function writeDataFromURL(url, keyMap)
{
    var dataIn = fetch(url)
        .then(response => 
        {
            if(!response.ok) 
            {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            //webMisses += 1;
            //checkForEnd();
            return response.json();
        })
        .then(dataIn => 
        {
            var keykeys = Array.from(keyMap.keys());
            for(var i = 0; i < keykeys.length; i++)
            {
                key = keykeys[i];
                value = dataIn[key];
                myKeyName = keyMap.get(key); //save it under our name for the key 
                writeToJSONData(url, key, myKeyName, value); //save the key with our own name
            }
            webHits += 1;
            checkForEnd();
        })
        .catch(error => 
        {
            console.error('There was a problem with the fetch operation:', error);
            webMisses += 1;
            checkForEnd();
        });
}

//writeDataFromURL('https://williamianbrooks.com/data/values/data.json', new Map([["key", "key"], ["key2", "key2"]]))

var linksThunderstore = new Map();
var linksSteamWorkshop = new Map();
var linksSteamGame = new Map();
var linksGithub = new Map();
linksThunderstore.set("urgbl", "https://thunderstore.io/api/v1/package-metrics/daemon47/UltraRGBLighting/");
linksThunderstore.set("utm", "https://thunderstore.io/api/v1/package-metrics/daemon47/UltraTimeManipulation/");
linksThunderstore.set("wvb", "https://thunderstore.io/api/v1/package-metrics/daemon47/WeaponVariantBinds/");
linksThunderstore.set("dwu", "https://thunderstore.io/api/v1/package-metrics/daemon47/DaemonWeaponUtils/");
linksThunderstore.set("uci", "https://thunderstore.io/api/v1/package-metrics/daemon47/UltraCooldownInfo/");

linksSteamWorkshop.set("drp", "null");
linksSteamWorkshop.set("htr", "null");
linksSteamWorkshop.set("fdn", "null");

var phase = 0;
initLogic();

function initLogic()
{
    writeToJSONData("none", "none", ".site-titleDate", "1/2/26") //this should be hardcoded and not current date. I need to change this value every time I update this site
    writeToJSONData("none", "none", ".emp-totalDownloads", "N/A")
    thunderstoreLogic(); //phase 0
}

function thunderstoreLogic()
{
    var keys = Array.from(linksThunderstore.keys());
    for(var i = 0; i < keys.length; i++)
    {
        var key = keys[i];
        var link = linksThunderstore.get(key);
        writeDataFromURL(link, new Map([["downloads", "." + key + "-downloads"], ["latest_version", "." + key + "-ver"]])) //lastupdated w phase2
    }
}

function thunderstoreLogicPhase2()
{
    var keys = Array.from(linksThunderstore.keys());
    for(var i = 0; i < keys.length; i++)
    {
        var key = keys[i];
        var version = outputDataMap.get("." + key  + "-ver");
        var link = linksThunderstore.get(key);

        link = "https://thunderstore.io/api/experimental/package/" + link.substring(link.indexOf("package-metrics") + 16) + version + "/";

        writeDataFromURL(link, new Map([["date_created", "." + key + "-lastUpdated"]])) //lastupdated w github
    }
}

function steamWorkshopLogic()
{

}

function steamGameLogic()
{

}

function githubLogic()
{

}