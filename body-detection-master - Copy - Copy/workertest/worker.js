self.addEventListener('message', function(e) {
    let message = e.data + "to myself!";
    self.postMessage(message);
    //self.close();
});