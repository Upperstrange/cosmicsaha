import { getAudioContext } from "./audioContext.js";
import { loadBuffersMap } from "./loaders.js";
import { makeEngine, playBeepPickup, playDamageSweep, playNoiseExplosion } from "./generators.js";
import { animeSounds } from "./constants.js";
import dom from "../dom.js";


const sfx = {
    ctx: null,
    masterGain: null,
    engine: null,
    isMuted: false,
    animeSoundBuffer: {},

    async init() {
        if (this.ctx) return;

        this.ctx = getAudioContext();

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.ctx.destination);

        // Load sound files
        this.animeSoundBuffer = await loadBuffersMap(this.ctx, animeSounds);
        console.log("All anime sounds loaded");

        // Engine sound
        this.engine = makeEngine(this.ctx);
        this.engine.gain.connect(this.masterGain);
    },

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.ctx) {
            this.masterGain.gain.setTargetAtTime(
                this.isMuted ? 0 : 0.3,
                this.ctx.currentTime,
                0.1
            );
        }

        const btn = dom.muteBtn || document.getElementById("mute-btn");
        if (btn) {
            btn.innerText = this.isMuted ? "🔇 AUDIO OFFLINE" : "🔊 AUDIO ONLINE";
        }
    },

    setEnginePitch(speed) {
        if (!this.ctx || this.isMuted) return;

        const targetFreq = 50 + speed * 40;
        const targetVol = 0.1 + speed * 0.1;

        this.engine.osc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.1);
        this.engine.gain.gain.setTargetAtTime(targetVol, this.ctx.currentTime, 0.1);
    },

    stopEngine() {
        if (this.engine?.gain) {
            this.engine.gain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
        }
    },

    playPickup() {
        if (!this.ctx || this.isMuted) return;
        playBeepPickup(this.ctx, this.masterGain);
    },

    playExplosion() {
        if (!this.ctx || this.isMuted) return;
        playNoiseExplosion(this.ctx, this.masterGain);
    },

    playDamage() {
        if (!this.ctx || this.isMuted) return;
        playDamageSweep(this.ctx, this.masterGain);
    },

    playAnimeSound(key) {
        if (!this.ctx || this.isMuted) return;
        const buffer = this.animeSoundBuffer[key];
        if (!buffer) return;

        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();

        source.buffer = buffer;
        gain.gain.value = 0.8;

        source.connect(gain);
        gain.connect(this.masterGain);

        source.start(0);
    }
};

export default sfx;
