console.log("creating worker");
const worker = new Worker('worker.js');
function keepRunning(){
worker.addEventListener('message', function(e) {
    console.log(e.data);
});
worker.postMessage('Happy Birthday ');

setTimeout(function timer() {
    keepRunning();
    }, 5000);
}

keepRunning();

