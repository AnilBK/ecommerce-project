import React, { useRef, useEffect } from 'react';

import Diary1 from "../../assets/images/diary.png";
import Diary2 from "../../assets/images/diary2.png";
import Diary3 from "../../assets/images/diary3.png";

function DiaryCanvas({ diaryStyle, diaryText }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 400;

        const img = new Image();

        if (diaryStyle === 'diary_style_1') img.src = Diary1;
        if (diaryStyle === 'diary_style_2') img.src = Diary2;
        if (diaryStyle === 'diary_style_3') img.src = Diary3;

        const drawCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 400, 400);

            ctx.font = '30px Arial';

            const textPosition = { x: 120, y: 140 };

            const lines = diaryText.split('\n');
            lines.forEach((line, index) => {
                const y = textPosition.y + index * 30;
                ctx.fillText(line, textPosition.x, y);
            });
        };

        img.onload = drawCanvas;
        drawCanvas();
    }, [diaryStyle, diaryText]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: 'block',
                margin: '20px auto',
                borderRadius: "16px",
                border: "1.5px solid #191919",
                boxShadow: "4px 4px 0 0 #191919"
            }}
        />
    );
}

export default DiaryCanvas;
