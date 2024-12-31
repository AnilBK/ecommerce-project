import React, { useState,  useRef, useEffect, useCallback } from 'react';

import Diary1 from "../../assets/images/diary.png"
import Diary2 from "../../assets/images/diary2.png"
import Diary3 from "../../assets/images/diary3.png"

function DiaryRenderer() {
    const canvasRef = useRef(null);

    const [diaryStyle, setDiaryStyle] = useState('diary_style_1');

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
        };

        img.onload = drawCanvas;
        drawCanvas();
    }, [diaryStyle]);

    return (
        <div>
            <h1>Style</h1>
            <select onChange={(e) => {setDiaryStyle(e.target.value)}}>
                <option value="diary_style_1">Diary 1</option>
                <option value="diary_style_2">Diary 2</option>
                <option value="diary_style_3">Diary 3</option>
            </select>

            <canvas
                ref={canvasRef}
                style={{ border: '1px solid black', display: 'block', margin: '20px auto' }}
            />
        </div>
    );
}

export default DiaryRenderer;
