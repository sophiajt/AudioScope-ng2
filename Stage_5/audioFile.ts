export enum AudioFormat { PCM, MP3 };

export class AudioFile {
    audioFormat: AudioFormat;
    numChannels: number;
    blockAlign: number;
    bitsPerSample: number;
    dataLength: number;
    data: any;
}
 
export class WaveFile extends AudioFile {
    sampleRate: number;
    byteRate: number;
}
 
export class MP3File extends AudioFile {
    isVBR: boolean;
}

export function amplify<T extends AudioFile>(file: T, gain: number): T {
    for (var i = 0; i < file.dataLength; ++i) {
        file.data[i] = file.data[i] * gain;
    }
    return file;
}

function read16(data, pos) {
    return data[pos] + (data[pos + 1] << 8);
}

function read32(data, pos) {
    var answer = data[pos] + (data[pos + 1] << 8) + (data[pos + 2] << 16) + (data[pos + 3] << 24);
    return answer;
}

export function loadFile(filename, callback) {
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
