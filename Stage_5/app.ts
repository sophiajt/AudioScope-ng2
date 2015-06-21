import {loadFile} from "audioFile";
import {displayAudioFile} from "displayAudio";

function updateSelection() {
    var fileList = <HTMLSelectElement>document.getElementById("fileSelect");
    var selectedFile = fileList.options[fileList.selectedIndex];
    var waveFile = loadFile("data/" + selectedFile.innerHTML, displayAudioFile);
}

var fileList = <HTMLSelectElement>document.getElementById("fileSelect");
fileList.onchange = updateSelection; 

loadFile("data/tada.wav", displayAudioFile);
