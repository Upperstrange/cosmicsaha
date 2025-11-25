export async function loadBuffer(ctx, url) {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    return await ctx.decodeAudioData(arrayBuffer);
}

export async function loadBuffersMap(ctx, soundsMap) {
    const out = {};
    await Promise.all(
        Object.entries(soundsMap).map(async ([key, url]) => {
            out[key] = await loadBuffer(ctx, url);
        })
    );
    return out;
}