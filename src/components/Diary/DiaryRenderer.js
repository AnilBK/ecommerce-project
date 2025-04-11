import React, { useState } from 'react';
import toast from 'react-hot-toast';

import AddGiftButton from "../AddGiftButton";
import { saveGiftData } from '../../services/api';

import DiaryCanvas from './DiaryCanvas';

import './diary.css';

function DiaryRenderer() {
    const [diaryStyle, setDiaryStyle] = useState('diary_style_1');
    const [diaryText, setDiaryText] = useState('');

    const saveDiaryGift = async (e) => {
        e.preventDefault();
        try {
            const giftData = {
                GIFT_TYPE: "Diary",
                diaryStyle: diaryStyle,
                diaryText: diaryText,
            };

            const response = await saveGiftData(giftData);
            toast.success(response.data.message);
        } catch (err) {
            toast.error('Failed to save gift data.');
        }
    };

    return (
        <div className="vertical-container">
            <div className="horizontal-container">
                <div className="vertical-container">
                    <DiaryCanvas diaryStyle={diaryStyle} diaryText={diaryText} />
                </div>
                <div className="options-container">
                    <div className="vertical-container">
                        <div className="vertical-container">
                            <h2>Colors</h2>
                            <select onChange={(e) => setDiaryStyle(e.target.value)} value={diaryStyle}>
                                <option value="diary_style_1">Red</option>
                                <option value="diary_style_2">Purple</option>
                                <option value="diary_style_3">Rusty</option>
                            </select>
                        </div>
                        <div className="vertical-container">
                            <h2>Text to print</h2>
                            <textarea
                                placeholder="Enter text"
                                value={diaryText}
                                onChange={(e) => setDiaryText(e.target.value)}
                            />
                        </div>
                        <br />
                        <AddGiftButton onGiftAdd={saveDiaryGift} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiaryRenderer;
