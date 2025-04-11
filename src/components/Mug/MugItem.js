import React, { useState } from 'react';
import toast from 'react-hot-toast';

import MugRendererWithEditor from './MugRendererWithEditor';
import AddGiftButton from '../AddGiftButton';
import { saveGiftData } from '../../services/api';
import './MugItem.css';

function MugItem() {
    const [fontFamily, setFontFamily] = useState('Arial');
    const [textStyle, setTextStyle] = useState('fill-text');
    const [canvasText, setCanvasText] = useState('Hello, Canvas!');
    const [fontColor, setFontColor] = useState('#000000');
    const [textPosition, setTextPosition] = useState({ x: 200, y: 200 });

    // function displayGiftData() {
    //     console.log('Gift Data');
    //     console.log('Font Family: ', fontFamily);
    //     console.log('Text Style: ', textStyle);
    //     console.log('Text Position: ', textPosition);
    //     console.log('Canvas Text: ', canvasText);
    //     console.log('Font Color: ', fontColor);
    // }

    const addMugItemGift = async (e) => {
        e.preventDefault();
        try {
            const giftData = {
                GIFT_TYPE: "mug",
                fontFamily: fontFamily,
                textStyle: textStyle,
                textPosition: textPosition,
                canvasText: canvasText,
                fontColor: fontColor,
            };

            const response = await saveGiftData(giftData);
            toast.success(response.data.message);
        } catch (err) {
            console.error('Error saving gift data:', err);
            toast.error('Failed to save gift data');
        }
    };

    return (
        <div className="vertical-container">
            <div className="horizontal-container">
                <div className="vertical-container">
                    <MugRendererWithEditor
                        fontFamily={fontFamily}
                        textStyle={textStyle}
                        canvasText={canvasText}
                        fontColor={fontColor}
                        textPosition={textPosition}
                        setTextPosition={setTextPosition}
                    />
                </div>
                <div className="options-container">
                    <div className="vertical-container">
                        <div className="vertical-container">
                            <h2>Text Style</h2>
                            <select onChange={(e) => setTextStyle(e.target.value)}>
                                <option value="fill-text">Fill Text</option>
                                <option value="stroke-text">Stroke Text</option>
                            </select>
                        </div>
                        <div className="vertical-container">
                            <h2>Font</h2>
                            <select onChange={(e) => setFontFamily(e.target.value)}>
                                <option value="Arial">Arial</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Tahoma">Tahoma</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Times New Roman">Times New Roman</option>
                            </select>
                        </div>
                        <div className="vertical-container">
                            <h2>Color</h2>
                            <input type="color" onChange={(e) => setFontColor(e.target.value)} />
                        </div>
                        <div className="vertical-container">
                            <h2>Text to print</h2>
                            <textarea
                                value={canvasText}
                                onChange={(e) => setCanvasText(e.target.value)}
                                placeholder="Enter text"
                            />
                        </div>
                        <div className="vertical-container">
                            <br></br>
                            <AddGiftButton onGiftAdd={addMugItemGift} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MugItem;
