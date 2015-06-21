var AudioFormat = { "PCM": 0, "MP3": 1 };

function WaveFile() {
    this.data = null;
}

function read16(data, pos) {
    return data[pos] + (data[pos + 1] << 8);
}

function read32(data, pos) {
    var answer = data[pos] + (data[pos + 1] << 8) + (data[pos + 2] << 16) + (data[pos + 3] << 24);
    return answer;
}

function loadFile(filename, callback) {
    var wavData;
    var xmlReq = new XMLHttpRequest();
    xmlReq.open("GET", "/" + filename, true);
    xmlReq.responseType = "arraybuffer";
    var out = new WaveFile();

    xmlReq.onload = function (xmlEvent) {
        console.log("filename: " + filename);
        var wavRawData = xmlReq.response;
        if (wavRawData) {
            wavData = new Uint8Array(wavRawData);

            //Load fmt
            var subchunk1ID = read32(wavData, 12);
            var subchunk1Size = read32(wavData, 16);
            out.audioFormat = read16(wavData, 20);
            out.numChannels = read16(wavData, 22);
            out.sampleRate = read32(wavData, 24);
            out.byteRate = read32(wavData, 28);
            out.blockAlign = read16(wavData, 32);
            out.bitsPerSample = read16(wavData, 34);

            //Load data
            var subchunk2ID = read32(wavData, 36);
            var subchunk2Size = read32(wavData, 40);

            if (out.bitsPerSample == 16) {
                out.dataLength = subchunk2Size / 2;
                out.data = new Int16Array(wavRawData, 44, out.dataLength);
            } else {
                out.dataLength = subchunk2Size;
                out.data = new Uint8Array(wavRawData, 44, out.dataLength);
            }

            callback(out);
        }
    };
    xmlReq.send("");
    return out;
}
