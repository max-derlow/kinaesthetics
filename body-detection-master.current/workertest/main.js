console.log("gayyyyyyyyyy");
const worker = new Worker('worker.js');
function keepRunning(){
worker.addEventListener('message', function(e) {
    console.log(e.data);
});
worker.postMessage('Happy Birthday ');
console.log("gayfuckstupid");

setTimeout(function timer() {
    keepRunning();
    }, 5000);
}

keepRunning();

