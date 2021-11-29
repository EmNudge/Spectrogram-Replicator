function getSampleRate(type: string, buffer: ArrayBuffer) {
    if (type === 'audio/wav') {
        return new DataView(buffer).getUint32(24, true);
    }
    return 44_100;
}

export async function getAudioBufferFromFile(file: File) {
    const buffer = await file.arrayBuffer();
    const sampleRate = getSampleRate(file.type, buffer);

    const audioCtx = new AudioContext({ sampleRate });
    const audioBuffer = await audioCtx.decodeAudioData(buffer);

    return audioBuffer;
}