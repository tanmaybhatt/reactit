var npm = require("npm");
var args = process.argv;
npm.load({
        loaded: false
    }, function (err) {
    // catch errors
    if(err)
        throw err;
    var arr = [] ;
    if(args.indexOf('--production')>-1 || args.indexOf('-p')>-1)
        arr.push("prod");
    else
        arr.push("build");
    npm.commands.run(arr,function (er, data) {
    if(er)
    throw er;// log the error or data
    });
    npm.on("log", function (message) {
        // log the progress of the installation
        console.log(message);
    });
});