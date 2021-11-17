export const getFreqData = (
    analyser: AnalyserNode,
    signal: AbortSignal,
    ignoreEmptyStarting = true
) =>
    new Promise<Uint8Array[]>((res) => {
        const bufferLength = analyser.frequencyBinCount;
        const data: Uint8Array[] = [];

        let hasShownData = false;
        const getData = () => {
            if (signal.aborted) {
                res(data);
                return;
            }

            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            if (ignoreEmptyStarting && !hasShownData) {
                hasShownData = dataArray.some(Boolean);
                if (hasShownData) data.push(dataArray);
            } else {
                data.push(dataArray);
            }

            setTimeout(getData, 0);
        };
        getData();
    });
  
export async function generateData(audio: AudioBuffer) {
    const audioCtx = new AudioContext();
    
    const analyser = audioCtx.createAnalyser();
    const bufferNode = audioCtx.createBufferSource();
    bufferNode.buffer = audio;
    
    bufferNode.connect(analyser).connect(audioCtx.destination);
    bufferNode.start();
    
    const controller = new AbortController();
    bufferNode.addEventListener('ended', () => controller.abort());
    
    // get data from audio
    return getFreqData(analyser, controller.signal);
}