import React, { useRef, useEffect, useCallback } from 'react';
import mug from '../../../assets/images/mug.jpg';

function MugRenderer({
    fontFamily,
    textStyle,
    canvasText,
    fontColor,
    textPosition,
    setTextPosition,
}) {
    const canvasRef = useRef(null);
    const isDragging = useRef(false);

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
    }, [fontFamily, textStyle, canvasText, fontColor, textPosition]);

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        const lines = canvasText.split('\n');
        const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width));
        const textHeight = lines.length * 30;
        const textX = textPosition.x - textWidth / 2;
        const textY = textPosition.y - 30;

        if (mouseX > textX && mouseX < textX + textWidth && mouseY > textY && mouseY < textY + textHeight) {
            isDragging.current = true;
        }
    };

    const handleMouseMove = useCallback((e) => {
        if (!isDragging.current) return;

        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setTextPosition({ x: mouseX, y: mouseY });
    }, [setTextPosition]); // Added useCallback and dependencies

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseMove]);

    return (
        <canvas
            ref={canvasRef}
            style={{ border: '1px solid black', display: 'block', margin: '20px auto' }}
            onMouseDown={handleMouseDown}
        />
    );
}

export default MugRenderer;
