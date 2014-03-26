function changeText() {
    var waitingElement = document.getElementById('waiting');
    
    waitingElement.innerHTML = "finished";
}


window.onload = function() {
    setTimeout("changeText()", 2000);
}