import {WaveFile} from "audioFile";

export function renderAudioFile(waveFile:WaveFile, scaleFactor = 3.0, area = {width:300, height: 300}) {
    var result: string;
    
    result = `0, ${area.height / 2 } `;

    for (var x = 0; x < area.width; ++x) {
        var nextPt = waveFile.data[((waveFile.dataLength / area.width) * x) >> 0];
        var scaledPt;
        if (waveFile.bitsPerSample == 16) {
            scaledPt = (nextPt / 32768) * (area.height / 2) * scaleFactor;
        } else if (waveFile.bitsPerSample == 8) {
            scaledPt = ((nextPt - 128) / 128) * (area.height / 2) * scaleFactor;
        }
		result += `${x}, ${area.height / 2 + scaledPt} `;
    }
    
    return result;
}
