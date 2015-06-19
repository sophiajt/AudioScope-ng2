import {Component, View, bootstrap, NgFor} from "angular2/angular2";
import {loadFile, preloadFile} from "audioFile";

/*
function updateSelection() {
    var fileList = <HTMLSelectElement> document.getElementById("fileSelect");
    var selectedFile = fileList.options[fileList.selectedIndex];
    var waveFile = loadFile("data/" + selectedFile.innerHTML, displayAudioFile);
}

loadFile("data/tada.wav", displayAudioFile);

var fileList = <HTMLSelectElement> document.getElementById("fileSelect");
fileList.onchange = updateSelection; 
*/

@Component({ selector: 'wave-view' })
@View({
	template: `
	<svg width="300" height="300" viewPort="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg">
		<polyline [attr.points]="displayPoints" stroke-width="1" stroke="black"/>
	</svg>
	<br />
	<select id="myNgSelect" size="5" (change)="updateSelect(this)">
		<option *ng-for="#item of items; #i = index" () [selected]="selected === item" (click)="updateSelect(item)"> {{ item }} </option>
	</select>
	<button (click)="decreaseScale()" >-</button>
	<button (click)="increaseScale()" >+</button>
`,
	directives: [NgFor]
})
class MyDisplay {
	displayPoints: string;
	selected: string;
	items: string[];
	scale: number;
	constructor() {
		this.selected = "tada.wav";
		this.items = items;
		this.displayPoints = "";
		this.scale = 1;
		this.renderWave();
	}
	updateSelect(selected: string) {
		this.selected = selected;
		this.renderWave();
	}
	increaseScale() {
		if (this.scale < 11) {
			this.scale++;
		}
		this.renderWave();
	}
	decreaseScale() {
		if (this.scale > 1) {
			this.scale--;
		}
		this.renderWave();
	}
	renderWave() {
		if (!this.selected) return;
		console.log("About to draw: " + "data/" + this.selected);
		var waveFile = loadFile("data/" + this.selected);
		var c = { width: 300, height: 300 };

	    var scaleFactor = 3.0 * this.scale;

		this.displayPoints = `0, ${c.height / 2 } `;

	    for (var x = 0; x < c.width; ++x) {
	        var nextPt = waveFile.data[((waveFile.dataLength / c.width) * x) >> 0];
	        var scaledPt;
	        if (waveFile.bitsPerSample == 16) {
	            scaledPt = (nextPt / 32768) * (c.height / 2) * scaleFactor;
	        } else if (waveFile.bitsPerSample == 8) {
	            scaledPt = ((nextPt - 128) / 128) * (c.height / 2) * scaleFactor;
	        }
			this.displayPoints += `${x}, ${c.height / 2 + scaledPt} `;
	    }
		console.log("Polyline: " + this.displayPoints);
	}
}

var items = ["chimes.wav", "chord.wav", "ding.wav", "notify.wav", "tada.wav"];
function preload(myItems: string[]) {
	if (myItems.length == 0) {
		bootstrap(MyDisplay);
	}
	else {
		var current = myItems.shift();
		preloadFile("data/" + current, function() { preload(myItems) });
	}
} 

preload(items.slice());