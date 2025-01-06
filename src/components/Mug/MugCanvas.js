import React, { useRef, useEffect } from 'react';
import mug from '../../assets/images/mug.jpg';

function MugCanvas({ fontFamily, textStyle, canvasText, fontColor, textPosition, onCanvasReady }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;

        const img = new Image();
        img.src = mug;

        const drawCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 400, 400);

            ctx.font = `30px ${fontFamily}`;
            ctx.fillStyle = fontColor;
            ctx.textAlign = 'center';

            const lines = canvasText.split('\n');
            lines.forEach((line, index) => {
                const y = textPosition.y + index * 30;
                if (textStyle === 'fill-text') {
                    ctx.fillText(line, textPosition.x, y);
                } else if (textStyle === 'stroke-text') {
                    ctx.strokeText(line, textPosition.x, y);
                }
            });
        };

        img.onload = drawCanvas;
        drawCanvas();

        if (onCanvasReady) {
            onCanvasReady(canvas);
        }
    }, [fontFamily, textStyle, canvasText, fontColor, textPosition, onCanvasReady]);

    return (
        <canvas
            ref={canvasRef}
            style={{ border: '1px solid black', display: 'block', margin: '20px auto' }}
        />
    );
}

export default MugCanvas;
