var npm = require("npm");
var args = process.argv;
npm.load({
        loaded: false
    }, function (err) {
    // catch errors
    if(err)
        throw err;
    var arr = [] ;
    if(args.indexOf('--hot')>-1)
        arr.push("hot-dev");
    else
        arr.push("dev");
    npm.commands.run(arr,function (er, data) {
    if(er)
    throw er;// log the error or data
    });
    npm.on("log", function (message) {
        // log the progress of the installation
        console.log(message);
    });
});