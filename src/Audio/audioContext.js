export const getAudioContext = (() => {
    let ctx = null;
    return () => {
        if (!ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            ctx = new AudioContext();
        }
        return ctx;
    };
})();