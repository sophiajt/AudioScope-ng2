import {WaveFile} from "audioFile";

export function displayAudioFile(waveFile: WaveFile) {
    var c = <HTMLCanvasElement>document.getElementById("WaveView");
    var ctx = c.getContext("2d");

    var scaleFactor = 3.0;

    ctx.fillStyle = "rgba(200,200,200, 1.0)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.moveTo(0, c.height / 2);
    ctx.lineWidth = 1;

    ctx.beginPath();
    for (var x = 0; x < c.width; ++x) {
        var nextPt = waveFile.data[((waveFile.dataLength / c.width) * x) >> 0];
        var scaledPt;
        if (waveFile.bitsPerSample == 16) {
            scaledPt = (nextPt / 32768) * (c.height / 2) * scaleFactor;
        } else if (waveFile.bitsPerSample == 8) {
            scaledPt = ((nextPt - 128) / 128) * (c.height / 2) * scaleFactor;
        }
        ctx.lineTo(x, (c.height / 2) + scaledPt);
        ctx.stroke();
    }
    ctx.closePath();
}
