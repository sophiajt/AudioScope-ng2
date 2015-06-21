function updateSelection() {
    var fileList = <HTMLSelectElement>document.getElementById("fileSelect");
    var selectedFile = fileList.options[fileList.selectedIndex];
    var waveFile = loadFile("data/" + selectedFile.innerHTML, displayAudioFile);
}

window.onload = function () {
    var waveFile = loadFile("data/tada.wav", displayAudioFile);
};
