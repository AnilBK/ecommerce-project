import React, { useState, useRef, useEffect } from 'react';

import Diary1 from "../../assets/images/diary.png"
import Diary2 from "../../assets/images/diary2.png"
import Diary3 from "../../assets/images/diary3.png"

import AddGiftButton from "../AddGiftButton"

import './diary.css';

function DiaryRenderer() {
    const canvasRef = useRef(null);
    const [diaryStyle, setDiaryStyle] = useState('diary_style_1');
    const [diaryText, setDiaryText] = useState('');

    function displayDiaryData() {
        console.log('Diary Data');
        console.log('Diary Style: ', diaryStyle);
        console.log('Diary Text: ', diaryText);
    }

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

            const textPosition = { x: 140, y: 140 };

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
        <div>
            <div className="horizontal-container-diary">
                <div>
                    <h1>Style</h1>
                    <select onChange={(e) => { setDiaryStyle(e.target.value) }}>
                        <option value="diary_style_1">Diary 1</option>
                        <option value="diary_style_2">Diary 2</option>
                        <option value="diary_style_3">Diary 3</option>
                    </select>
                </div>
                <div>
                    <h1>Text to print</h1>
                    <textarea
                        placeholder="Enter text" value={diaryText} onChange={(e) => setDiaryText(e.target.value)}
                    />
                </div>
            </div>

            <canvas
                ref={canvasRef}
                style={{ border: '1px solid black', display: 'block', margin: '20px auto' }}
            />

            <AddGiftButton onGiftAdd={displayDiaryData} />
        </div>
    );
}

export default DiaryRenderer;
