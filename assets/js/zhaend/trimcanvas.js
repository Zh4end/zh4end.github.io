function trimCanvas(c) {
    const ctx = c.getContext('2d', { willReadFrequently: true });
    const copyCanvas = document.createElement('canvas');
    const copyCtx = copyCanvas.getContext('2d', { willReadFrequently: true });
    const { data } = ctx.getImageData(0, 0, c.width, c.height);

    let top = null;
    let left = null;
    let right = null;
    let bottom = null;

    for (let i = 3; i < data.length; i += 4) {
        if (data[i] === 0) continue;

        const pixel = (i - 3) / 4;
        const x = pixel % c.width;
        const y = Math.floor(pixel / c.width);

        if (top === null) top = y;
        if (left === null || x < left) left = x;
        if (right === null || x > right) right = x;
        if (bottom === null || y > bottom) bottom = y;
    }

    if (top === null) {
        return document.createElement('canvas');
    }

    const width = right - left + 1;
    const height = bottom - top + 1;

    const trimmed = ctx.getImageData(
        left,
        top,
        width,
        height
    );

    copyCtx.canvas.width = width;
    copyCtx.canvas.height = height;

    copyCtx.putImageData(trimmed, 0, 0);

    return copyCtx.canvas;
}
