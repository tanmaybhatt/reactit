#! /usr/bin/env node
var repos = {
    simple : {
        repo : "https://nodeload.github.com/tanmaybhatt/react-boilerplate-simple/zip/master",
        folder: "react-boilerplate-simple-master/"
    },
    express : {
         repo : "https://nodeload.github.com/tanmaybhatt/react-express-boilerplate/zip/master",
        folder : "react-express-boilerplate-master/"
    }
}
var repo = repos.simple.repo;
var folder = repos.simple.folder;
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
var type = "simple";
args.forEach(function(item,index){
    if(item.indexOf('-')!=0 && item!="new" && index>newIndex)
    {
        projectPath = projectPath+"/"+item;
        projectName=item;
        if(!fs.existsSync(item))
        ;
        else
        {
            console.error(chalk.red("Folder named "+item+" already exists."));
            process.exit();
        }
    }
    else if(item.indexOf('-')==0 && item!='new' && index>newIndex)
    {
        if(item == "--express")
        {
           repo = repos.express.repo;
           folder = repos.express.folder;
           type = "Express";
        }
        else if(item == "--simple")
        {
            repo = repos.simple.repo;
            folder = repos.simple.folder;
            type = "Simple";
        }
    }
});
if(projectName)
console.log("Creating "+type+" react application - "+chalk.blue(projectName));
else
console.log("Creating "+type+" react application in current folder");

var request = https.get(repo, function(res,err){
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
    fs.mkdirSync(projectName);
	var zip = new AdmZip(zipFile);
    var zipEntries = zip.getEntries();
    var length = zipEntries.length;
	zipEntries.forEach(function(zipEntry,index) {
        var entryName = zipEntry.entryName.replace(folder,"");
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
            console.log(chalk.green("Extraction Complete!"))
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
    fs.mkdirSync(projectPath+"/dist/js");
    fs.mkdirSync(projectPath+"/dist/css");
    console.log(chalk.yellow("\nAfter npm modules are installed you can start the application using following commands:"));
    console.log("\n$ cd "+projectName);
    console.log("$ reactit start\n");
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