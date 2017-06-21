#! /usr/bin/env node
var simpleRepo = "https://nodeload.github.com/tanmaybhatt/react-boilerplate-simple/zip/master";
var simpleFolder = "react-boilerplate-simple-master/";
var dir = process.cwd();
var https = require('https');
var fs = require('fs');
var AdmZip = require('adm-zip');
var chalk = require('chalk');
var ProgressBar = require('progress');
var npm = require("npm");
var args = process.argv;
var newIndex = args.indexOf("new");
var exec = require("child_process").execSync;
var projectName = null;
var projectPath = dir;
args.forEach(function(item,index){
    if(item.indexOf('-')!=0 && item!="new" && index>newIndex)
    {
        projectPath = projectPath+"/"+item;
        projectName=item;
        if(!fs.existsSync(item))
        fs.mkdirSync(item);
        else
        {
            console.error(chalk.red("Folder named "+item+" already exists."));
            process.exit();
        }
    }
});

console.log("Creating new React application in current folder");
var request = https.get(simpleRepo, function(res,err){
    var fileData = '';
    res.setEncoding('binary');
    var length = parseInt(res.headers['content-length'], 10);
    var bar = null;
    console.log(chalk.blue('\nDownloading repository...'));
    bar = new ProgressBar('[:bar] :current/:total :percent :etas', {
        complete: " ",
        incomplete: ".",
        total: length,
        width:"20"
    });
    res.on('data', function(chunk){
        fileData += chunk
        bar.tick(chunk.length);
    });

    res.on('end', function(){
        fs.writeFile(dir+'/master.zip', fileData , 'binary', function(err){
            if (err) throw err
            else {
                try{     
                    console.log(chalk.green("Download Successful!"));
                    console.log(chalk.blue("\nExtracting Zip..."));
                    extractZip(dir+'/master.zip');
                }
                catch(e)
                {
                    if(fs.existsSync(dir+"/master.zip"));
                    //fs.unlinkSync(dir+'/master.zip');
                    throw e;
                }
            }

        })
    })

})

function extractZip(zipFile)
{
	var zip = new AdmZip(zipFile);
    var zipEntries = zip.getEntries();
    var length = zipEntries.length;
	zipEntries.forEach(function(zipEntry,index) {
        var entryName = zipEntry.entryName.replace(simpleFolder,"");
	    if(zipEntry.isDirectory)
        {
            if(entryName.trim().length>0 && !fs.existsSync(entryName))
            fs.mkdirSync(projectPath+"/"+entryName);
        }
        else
        {
            var data = zip.readFile(zipEntry);
            fs.writeFileSync(projectPath+"/"+entryName,data);
        }
        if(index==(length-1))
        {
            fs.unlinkSync(zipFile);
            console.log(chalk.green("\nExtraction Complete!"))
            console.log(chalk.blue("\nInstalling npm modules..."));
            if(projectName)
            changePackageName();
            else
            installNPM();
        }
	});
}

function changePackageName(){
    var data = JSON.parse(fs.readFileSync(projectPath+"/"+'package.json').toString());
    data.name = projectName;
    fs.writeFileSync(projectPath+"/"+'package.json',JSON.stringify(data));
    installNPM();
}
function installNPM (){
    if(projectName)
    process.chdir(projectPath);
    npm.load({
        loaded: false
    }, function (err) {
    // catch errors
    if(err)
        throw err;
        npm.commands.install(function (er, data) {
        if(er)
        throw er;// log the error or data
    });
    npm.on("log", function (message) {
        // log the progress of the installation
        console.log(message);
    });
});
}