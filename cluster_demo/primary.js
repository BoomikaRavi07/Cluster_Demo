const cluster = require('cluster')
const os = require('os')

const cpuCount = os.cpus().length;

console.log(`The total number of CPUs is ${cpuCount}`);
console.log(`Primary pid =${process.pid}`);
cluster.setupPrimary({
    exec: __dirname + "/index.js",
});

for (let i=0;i<cpuCount;i++){
    cluster.fork();
}
cluster.on("exit",(Worker,code,signal)=>{
    console.log(`worker ${Worker.process.pid}has been killed`);
    console.log("Staring another worker");
    cluster.fork();
});