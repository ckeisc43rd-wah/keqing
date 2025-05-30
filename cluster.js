const cluster = require("cluster");

if(cluster.isMaster){
    console.log(`main process ${process.pid} start`);
    const startWorker = () => {
        const worker = cluster.fork();
        console.log(`worker ${worker.process.pid} start`);

        worker.on("exit", (code, signal) => {
                console.log(`worker ${worker.process.pid} stop  (code: ${code}, signal: ${signal})`)
                console.log("restart in 5 seconds")
                setTimeout(() => {startWorker();}, 5000);
        })
    }
    startWorker();
}
else{
    require("./main.js");
}