/* run this with node on server */

const jsonfile = require('jsonfile');
const path = require('path');
const {spawn} = require('child_process');
//const fetch = require("node-fetch");
var outputDataMap = new Map();

console.log("Script Started");

var webHits = 0;
var webMisses = 0;

function formatTime(timeIn)
{
    var stringOut = timeIn.substring(0, timeIn.indexOf("T"))
    stringOut = stringOut.substring(0); //set to "2" to make year length 2 instead of default (4)
    stringOut = stringOut.replace(/-/g, "/");
    return stringOut;
}

function formatVersion(versionIn)
{
    var versionOut = versionIn;
    if(versionOut.substring(0,1) == "v") {versionOut = versionOut.substring(1);} //remove v at beginning
    return versionOut;
}

function writeToOutputMap(url, keyIn, keyOut, value)
{
    if(value === undefined) 
    {
        console.log("Value for key \"" + keyIn + "\" at url \"" + url + "\" was undefined.");
    }
    if(keyOut.includes("lastUpdated")) {value = formatTime(value);}
    if(keyOut.includes("ver")) {value = formatVersion(value);}

    var spaceBuffer = " ".repeat(24 - keyOut.length);

    outputDataMap.set(keyOut, value);
    console.log("Phase " + phase + " - Saving Key: " + keyOut + spaceBuffer + "Value: " + value);
}

function checkForEnd()
{
    var webTriesTotal = Array.from(linksThunderstore.keys()).length * 2 +
    Array.from(linksSteamWorkshop.keys()).length +
    Array.from(linksSteamGame.keys()).length + 
    Array.from(linksGithub.keys()).length * 2;

    if(webHits + webMisses == Array.from(linksThunderstore.keys()).length)
    {
        phase = 1;
        thunderstoreLogicPhase2(); //phase 1
    }
    else if(webHits + webMisses == Array.from(linksThunderstore.keys()).length * 2)
    {
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
        steamGameLogicPhase2(); //phase 4


        phase = 5;
        githubLogic(); //phase 5
    }
    else if(webHits + webMisses == webTriesTotal)
    {
        const filePath = path.resolve(__dirname, '..') + "/data/values/data.json";
        jsonfile.writeFile(filePath, Object.fromEntries(outputDataMap), {spaces: 2}, (err) => 
        {
            if (err) console.error(err);
            else console.log('JSON file written successfully at \"' + filePath + "\"");
            console.log("\nScript Completed. Hits / Misses: " + webHits + " / " + webMisses);
        });
    }
}

function writeDataFromURL(url, keyMap)
{
    var dataIn = fetch(url)
    .then(response => 
    {
        if(response.ok == false) 
        {
            //whoops
            throw new Error("URL: " + url + '\nNetwork response was not ok ' + response.statusText);
        }
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
            writeToOutputMap(url, key, myKeyName, value); //save the key with our own name
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
var linksSteamWorkshop = new Map(); //unused, done in py script
var linksSteamGame = new Map();
var linksGithub = new Map();
linksThunderstore.set("urgbl", "https://thunderstore.io/api/v1/package-metrics/daemon47/UltraRGBLighting/");
linksThunderstore.set("utm", "https://thunderstore.io/api/v1/package-metrics/daemon47/UltraTimeManipulation/");
linksThunderstore.set("wvb", "https://thunderstore.io/api/v1/package-metrics/daemon47/WeaponVariantBinds/");
linksThunderstore.set("dwu", "https://thunderstore.io/api/v1/package-metrics/daemon47/DaemonWeaponUtils/");
linksThunderstore.set("uci", "https://thunderstore.io/api/v1/package-metrics/daemon47/UltraCooldownInfo/");

//these are only updated daily, so polling more frequently is pointless... whatever.
linksSteamGame.set("uk", "https://steamspy.com/api.php?request=appdetails&appid=1229490");
linksSteamGame.set("otd", "https://steamspy.com/api.php?request=appdetails&appid=2739630"); //seems to not be populated
linksSteamGame.set("kz", "https://steamspy.com/api.php?request=appdetails&appid=460950");
linksSteamGame.set("bal", "https://steamspy.com/api.php?request=appdetails&appid=2379780");
linksSteamGame.set("ftl", "https://steamspy.com/api.php?request=appdetails&appid=212680");
linksSteamGame.set("po2", "https://steamspy.com/api.php?request=appdetails&appid=620");
linksSteamGame.set("tf2", "https://steamspy.com/api.php?request=appdetails&appid=440");

linksSteamWorkshop.set("drp", "null");
linksSteamWorkshop.set("htr", "null");
linksSteamWorkshop.set("fdn", "null");

//urgbl, utm, wvb, dwu, and uci dont need this because they pull from thunderstore.
linksGithub.set("emp", "https://api.github.com/repos/daemon251/FasterThanLight-EMPSystem"); 
linksGithub.set("drp", "https://api.github.com/repos/daemon251/TModLoader-DaemonsReworkedPrefixes"); 
linksGithub.set("htr", "https://api.github.com/repos/daemon251/GarrysMod-HordeTranslocationistSubclass"); 
linksGithub.set("fdn", "https://api.github.com/repos/daemon251/GarrysMod-FadingDoorNoBullshit"); 
linksGithub.set("rgb21", "https://api.github.com/repos/daemon251/OpenRGB.NET-netstandard2.1client"); 

var phase = 0;
initLogic();

function initLogic()
{
    writeToOutputMap("none", "none", ".site-titleDate", "2026/02/01") //this should be hardcoded and not current date. I need to change this value every time I update this site
    writeToOutputMap("none", "none", ".emp-totalDownloads", "N/A")
    thunderstoreLogic(); //phase 0
}

function thunderstoreLogic()
{
    var keys = Array.from(linksThunderstore.keys());
    for(var i = 0; i < keys.length; i++)
    {
        var key = keys[i];
        var link = linksThunderstore.get(key);
        writeDataFromURL(link, new Map([["downloads", "." + key + "-totalDownloads"], ["latest_version", "." + key + "-ver"]])) //lastupdated w phase2
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
    console.log("Phase " + phase + ` - Starting python child process...`);
    const pythonProcess = spawn('python', ['pythonUpdateData.py']); //for use on my machine
    //const pythonProcess = spawn('/home/williami/virtualenv/randomDirectory/3.10/bin/python', ['/home/williami/public_html/scripts-server/pythonUpdateData.py']); //for server

    pythonProcess.stdout.on('data', (data) => 
    {
        var dataOut = data.toString();
        var firstLine = dataOut.substring(0, data.indexOf("\n"));
        var temp = dataOut.substring(firstLine.length + 1);
        var secondLine = temp.substring(0, temp.indexOf("\n"));
        var thirdLine = dataOut.substring(firstLine.length + 1 + secondLine.length + 1);
        thirdLine = thirdLine.replace("\n", ""); //prevents extra line break in terminal
        //var temp = firstLine.replace( /(^.+)(\w\d+\w)(.+$)/i,'$2'); //wtf
        var arr = [firstLine, secondLine, thirdLine];

        for(var i = 0; i < arr.length; i++)
        {
            var string = arr[i];
            var id = string.substring(0, 3);
            var num = string.substring(4);

            webHits += 1; //just assume it hits I guess
            writeToOutputMap("none", "none", "." + id + "-totalDownloads", num);
            checkForEnd();
        }
    });

    pythonProcess.stderr.on('data', (data) => 
    {
        console.error('Error:', data.toString());
    });

    pythonProcess.on('close', (code) => 
    {
        var stringOut = "Phase " + phase + ` - Python child process exited with code ${code}`
        if(code == 0) {stringOut += " (expected)"}
        console.log(stringOut);
    });
}

function getEstimateFromRange(estimate)
{
    estimate = estimate.replace(/,/g, "");

    var stringOut = "~";
    var leftPart = estimate.substring(0, estimate.indexOf("."));
    var rightPart = estimate.substring(estimate.indexOf(".") + 3);
    var avg = (parseInt(leftPart) + parseInt(rightPart)) / 2;

    var digits = -1;//Math.ceil(Math.log10(avg));
    var temp = avg;
    while (temp > 0) //math.log10 is not exact.
    {
        temp = parseInt(temp) / 10;
        digits += 1;
    }

    if(digits > 9) {avg = avg / 1000000000}
    else if(digits > 6) {avg = avg / 1000000}
    else if(digits > 3) {avg = avg / 1000}

    avg = avg.toFixed(2 - (digits - 1) % 3);

    if(digits > 9) {avg = avg + "B"}
    else if(digits > 6) {avg = avg + "M"}
    else if(digits > 3) {avg = avg + "K"}

    stringOut += avg;
    return stringOut;
}

function steamGameLogic()
{
    var keys = Array.from(linksSteamGame.keys());
    for(var i = 0; i < keys.length; i++)
    {
        var key = keys[i];
        var link = linksSteamGame.get(key);
        writeDataFromURL(link, new Map([["positive", "." + key + "-positive"], ["negative", "." + key + "-negative"], ["owners", "." + key + "-ownersRange"]])); //lastupdated w phase2
    }
}

function steamGameLogicPhase2()
{
    var keys = Array.from(linksSteamGame.keys());
    for(var i = 0; i < keys.length; i++)
    {
        var key = keys[i];

        var pos = parseFloat(outputDataMap.get("." + key + "-positive"))
        var neg = parseFloat(outputDataMap.get("." + key + "-negative"))
        var range = outputDataMap.get("." + key + "-ownersRange")

        var percent = ((pos / (pos + neg)) * 100).toFixed(1) + "%"
        if(neg == 0) {percent = "N/A"}

        writeToOutputMap("none", "none", "." + key + "-reviews", percent);
        writeToOutputMap("none", "none", "." + key + "-players", getEstimateFromRange(range));
    }
}

function githubLogic()
{
    var keys = Array.from(linksGithub.keys());
    for(var i = 0; i < keys.length; i++)
    {
        //watch out for api github rate limits - we aren't authenticated. 60 / hour
        var key = keys[i];
        var link = linksGithub.get(key);
        writeDataFromURL(link, new Map([["updated_at", "." + key + "-lastUpdated"]])); //lastupdated w phase2

        var link2 = link + "/releases/latest"
        writeDataFromURL(link2, new Map([["name", "." + key + "-ver"]])); //lastupdated w phase2
    }
}