function togglePresentation() {
    var currentButton = document.getElementById("togglePresentationButton")
    if (currentButton.innerHTML == "desktop_windows") {
        currentButton.innerHTML = "desktop_access_disabled"
    } else {
        currentButton.innerHTML = "desktop_windows"
    }
    currentButton.classList.toggle("control-button-active");
}

function toggleAudio() {
    var currentButton = document.getElementById("toggleAudioButton")
    if (currentButton.innerHTML == "mic") {
        currentButton.innerHTML = "mic_off"
    } else {
        currentButton.innerHTML = "mic"
    }
    currentButton.classList.toggle("control-button-active");

}

function toggleVideo() {
    var currentButton = document.getElementById("toggleVideoButton")
    if (currentButton.innerHTML == "videocam") {
        currentButton.innerHTML = "videocam_off"
    } else {
        currentButton.innerHTML = "videocam"
    }
    currentButton.classList.toggle("control-button-active");
}