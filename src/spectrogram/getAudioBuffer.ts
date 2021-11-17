export async function getAudioBufferFromFile(file: File) {
    const buffer = await file.arrayBuffer();
    const audioCtx = new AudioContext();
    const audioBuffer = await audioCtx.decodeAudioData(buffer);
  
    return audioBuffer;
}