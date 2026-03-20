//run the files in order. Any events recorded after a date from a previous file will be ignored.

const fs = require('fs');
const path = require('path');

determineVisitorStats();

function convertMonthStrToNum(data)
{
    var num = -1;

    //guessing these are right?
    if     (data.toLowerCase() == "jan") {num = 1;}
    else if(data.toLowerCase() == "feb") {num = 2;}
    else if(data.toLowerCase() == "mar") {num = 3;}
    else if(data.toLowerCase() == "apr") {num = 4;}

    else if(data.toLowerCase() == "may") {num = 5;}
    else if(data.toLowerCase() == "jun") {num = 6;}
    else if(data.toLowerCase() == "jul") {num = 7;}
    else if(data.toLowerCase() == "aug") {num = 8;}

    else if(data.toLowerCase() == "sep") {num = 9;}
    else if(data.toLowerCase() == "oct") {num = 10;}
    else if(data.toLowerCase() == "nov") {num = 11;}
    else if(data.toLowerCase() == "dec") {num = 12;}

    return num;
}

function compareTimes(time1, code, time2)
{
    var lt = false;
    var eq = true;
    var mt = false;

    var day1 = parseInt(time1.substring(0, 2), 10);
    var day2 = parseInt(time2.substring(0, 2), 10);

    var month1 = convertMonthStrToNum(time1.substring(3, 6));
    var month2 = convertMonthStrToNum(time2.substring(3, 6));

    var year1 = parseInt(time1.substring(7, 11), 10);
    var year2 = parseInt(time2.substring(7, 11), 10);

    var hour1 = parseInt(time1.substring(12, 14), 10);
    var hour2 = parseInt(time2.substring(12, 14), 10);

    var min1 = parseInt(time1.substring(15, 17), 10);
    var min2 = parseInt(time2.substring(15, 17), 10);

    var sec1 = parseInt(time1.substring(18, 20), 10);
    var sec2 = parseInt(time2.substring(18, 20), 10);

    var timeDataDescending1 = [year1, month1, day1, hour1, min1, sec1];
    var timeDataDescending2 = [year2, month2, day2, hour2, min2, sec2];

    //console.log("1  " + timeDataDescending1);
    //console.log("2  " + timeDataDescending2);

    for(var i = 0; i < timeDataDescending1.length; i++)
    {
        if(timeDataDescending1[i] < timeDataDescending2[i]) {lt = true; eq = false; break;}
        if(timeDataDescending1[i] > timeDataDescending2[i]) {mt = true; eq = false; break;}
        else //eq
        {
            //just go to the next iteration
        }
    }

    if(code == "mt") {return mt;}
    else if(code == "eq") {return eq;}
    else if(code == "lt") {return lt;}
}

function determineVisitorStats()
{
    var logFilePath = path.resolve(__dirname, '..') + "/data/values/mar2026.txt";

    var data = fs.readFileSync(logFilePath, 'utf8');

    var ipFilePath = path.resolve(path.resolve(__dirname, '..'), '..') + "/hitIPList.txt";
    var ipData = fs.readFileSync(ipFilePath, 'utf8');
    var hitIPList = [];
    var newIPList = [];

    var index = ipData.indexOf("\n");
    var hitCounter = parseInt(ipData.substring(0, index), 10); //number of times the main site page is accessed
    ipData = ipData.substring(index + 1);

    //next line
    var index = ipData.indexOf("\n");
    ipData = ipData.substring(index + 1);

    index = ipData.indexOf("\n");
    var startDate = ipData.substring(0, index);
    ipData = ipData.substring(index + 1);

    index = ipData.indexOf("\n");
    var endDate = ipData.substring(0, index);
    ipData = ipData.substring(index + 1);

    while(true)
    {
        index = ipData.indexOf("\n");
        if(index == -1) {break;};
        lineData = ipData.substring(0, index);
        ipData = ipData.substring(index + 1);
        hitIPList.push(lineData);
    }

    var uniqueHitCounter = 0;
    var minDate = startDate;
    var maxDate = endDate;
    while(true)
    {
        index = data.indexOf("\n")
        if(index == -1) {break;}
        lineData = data.substring(0, index);
        data = data.substring(index + 1);
        
        //ip
        var ip = "NO IP???";
        index = lineData.indexOf(" ")
        ip = lineData.substring(0, index);
        lineData = lineData.substring(index + 6);

        //time
        var date = "NO DATE???"
        index = lineData.indexOf("]")
        date = lineData.substring(0, index);
        lineData = lineData.substring(index + 3);

        //request
        var request = "NO REQUEST???"
        index = lineData.indexOf("\"")
        request = lineData.substring(0, index);
        lineData = lineData.substring(index + 2);

        //code
        var code = "NO CODE???"
        index = lineData.indexOf(" ")
        code = lineData.substring(0, index);
        lineData = lineData.substring(index + 1);

        //size
        var size = "NO SIZE???"
        index = lineData.indexOf(" ")
        size = lineData.substring(0, index);
        lineData = lineData.substring(index + 2);

        //link url
        var linkURL = "NO SIZE???"
        index = lineData.indexOf("\"")
        linkURL = lineData.substring(0, index);
        lineData = lineData.substring(index + 3);

        //client info
        var clientInfo = "NO INFO???"
        index = lineData.indexOf("\"")
        clientInfo = lineData.substring(0, index);
        //lineData = lineData.substring(index + 2);

        if(compareTimes(date, "mt", maxDate))
        {
            maxDate = date;
        }

        if(compareTimes(date, "lt", minDate))
        {
            minDate = date;
        }

        if(compareTimes(date, "lt", endDate))
        {
            continue; //we already had data at a later time than this
        }

        index = linkURL.indexOf("williamianbrooks.com")
        if(index != -1 && linkURL.substring(index + 21).length == 0)
        {
            hitCounter++;
        }

        var alreadyExists = false;
        for(var i = 0; i < hitIPList.length; i++)
        {
            if(ip == hitIPList[i])
            {
                alreadyExists = true;
            }
        }
        for(var i = 0; i < newIPList.length; i++)
        {
            //console.log(ip + "  aaaa   " + hitIPList[i]);
            if(ip == newIPList[i])
            {
                alreadyExists = true;
            }
        }
        if(alreadyExists == false) {newIPList.push(ip);}
    }

    var combinedIPList = [];
    for(var i = 0; i < hitIPList.length; i++)
    {
        combinedIPList.push(hitIPList[i]);
    }
    for(var i = 0; i < newIPList.length; i++)
    {
        combinedIPList.push(newIPList[i]);
    }

    uniqueHitCounter = combinedIPList.length;

    var ipDataOut = ""; //is string data okay? update: ~512MB max size, probably okay. use a compression algorithm later if we need to
    ipDataOut += hitCounter + "\n";
    ipDataOut += uniqueHitCounter + "\n";
    ipDataOut += minDate + "\n";
    ipDataOut += maxDate + "\n";
    for(var i = 0; i < combinedIPList.length; i++)
    {
        ipDataOut += combinedIPList[i] + "\n";
    }
    fs.writeFile(ipFilePath, ipDataOut, err => 
    {
        if (err) 
        {
            console.error(err);
        } 
        else 
        {
            
        }
    });

    console.log("Total Hits: " + hitCounter);
    console.log("Unique Hits: " + uniqueHitCounter);
}