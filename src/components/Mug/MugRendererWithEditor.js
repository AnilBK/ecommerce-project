import React, { useRef, useCallback, useEffect } from 'react';
import MugCanvas from './MugCanvas';

function MugRendererWithEditor({
    fontFamily,
    textStyle,
    canvasText,
    fontColor,
    textPosition,
    setTextPosition,
}) {
    const isDragging = useRef(false);

    const handleMouseDown = (e) => {
        const canvas = e.target;
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

    const handleMouseMove = useCallback(
        (e) => {
            if (!isDragging.current) return;

            const canvas = e.target;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            setTextPosition({ x: mouseX, y: mouseY });
        },
        [setTextPosition]
    );

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
        <MugCanvas
            fontFamily={fontFamily}
            textStyle={textStyle}
            canvasText={canvasText}
            fontColor={fontColor}
            textPosition={textPosition}
            onCanvasReady={(canvas) => {
                canvas.addEventListener('mousedown', handleMouseDown);
            }}
        />
    );
}

export default MugRendererWithEditor;
