import {Component, View, NgFor, bootstrap} from "angular2/angular2";
import {loadFile} from "audioFile";
import {displayAudioFile} from "displayAudio";

@Component({selector: 'file-list'})
@View({template: `
	<select id="fileSelect" size="5">
		<option *ng-for="#item of items; #i = index" [selected]="selected === item" (click)="updateSelection()">{{ item }}</option>
	</select>`,
	directives: [NgFor]
})
class MyDisplay {
	items: string[];
	selected: string;
	constructor() {
		this.items = ["chimes.wav", "chord.wav", "ding.wav", "notify.wav", "tada.wav"];
		this.selected = "tada.wav";		
	}
	updateSelection() {
	    var fileList = <HTMLSelectElement>document.getElementById("fileSelect");
	    var selectedFile = fileList.options[fileList.selectedIndex];
	    var waveFile = loadFile("data/" + selectedFile.innerHTML, displayAudioFile);
	}    
}

loadFile("data/tada.wav", displayAudioFile);

bootstrap(MyDisplay);