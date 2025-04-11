import React, { useState, useRef, useEffect } from 'react';

import Diary1 from "../../assets/images/diary.png"
import Diary2 from "../../assets/images/diary2.png"
import Diary3 from "../../assets/images/diary3.png"

import AddGiftButton from "../AddGiftButton"

import { saveGiftData } from '../../services/api';

import './diary.css';

function DiaryRenderer() {
    const canvasRef = useRef(null);
    const [diaryStyle, setDiaryStyle] = useState('diary_style_1');
    const [diaryText, setDiaryText] = useState('');

    const [responseMessage, setResponseMessage] = useState('');

    const saveDiaryGift = async (e) => {
        e.preventDefault();
        try {
            const giftData = {
                GIFT_TYPE: "Diary",
                diaryStyle: diaryStyle,
                diaryText: diaryText,
            };

            const response = await saveGiftData(giftData);
            setResponseMessage(response.data.message);
        } catch (err) {
            console.error('Error saving gift data:', err);
            setResponseMessage('Failed to save gift data');
        }
    };

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
        <div className="vertical-container">
            <div className="horizontal-container">
                <div className="vertical-container">
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'block', margin: '20px auto', borderRadius: "16px", border: "1.5px solid #191919", boxShadow: "4px 4px 0 0 #191919" }}
                    />
                </div>
                <div className="options-container">
                    <div className="vertical-container">
                        <div className="vertical-container">
                            <h2>Colors</h2>
                            <select onChange={(e) => { setDiaryStyle(e.target.value) }}>
                                <option value="diary_style_1">Red</option>
                                <option value="diary_style_2">Purple</option>
                                <option value="diary_style_3">Rusty</option>
                            </select>
                        </div>
                        <div className="vertical-container">
                            <h2>Text to print</h2>
                            <textarea
                                placeholder="Enter text" value={diaryText} onChange={(e) => setDiaryText(e.target.value)}
                            />
                        </div>
                        <br></br>
                        <AddGiftButton onGiftAdd={saveDiaryGift} />
                        {responseMessage && <p>{responseMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiaryRenderer;
