import React, { useState } from 'react';
import Renderer from '../Renderer';
import './Viewer.css';

function Viewer() {
    const [fontFamily, setFontFamily] = useState('Arial');
    const [textStyle, setTextStyle] = useState('fill-text');
    const [canvasText, setCanvasText] = useState('Hello, Canvas!');
    const [fontColor, setFontColor] = useState('#000000');
    const [textPosition, setTextPosition] = useState({ x: 200, y: 200 });

    function displayGiftData() {
        console.log('Gift Data');
        console.log('Font Family: ', fontFamily);
        console.log('Text Style: ', textStyle);
        console.log('Text Position: ', textPosition);
        console.log('Canvas Text: ', canvasText);
        console.log('Font Color: ', fontColor);
    }

    return (
        <div>
            <div className="horizontal-container">
                <div>
                    <h1>Text Style</h1>
                    <select onChange={(e) => setTextStyle(e.target.value)}>
                        <option value="fill-text">Fill Text</option>
                        <option value="stroke-text">Stroke Text</option>
                    </select>
                </div>
                <div>
                    <h1>Font</h1>
                    <select onChange={(e) => setFontFamily(e.target.value)}>
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                </div>
                <div>
                    <h1>Color</h1>
                    <input type="color" onChange={(e) => setFontColor(e.target.value)} />
                </div>
                <div>
                    <h1>Text to print</h1>
                    <textarea
                        value={canvasText}
                        onChange={(e) => setCanvasText(e.target.value)}
                        placeholder="Enter text"
                    />
                </div>
            </div>
            <Renderer
                fontFamily={fontFamily}
                textStyle={textStyle}
                canvasText={canvasText}
                fontColor={fontColor}
                textPosition={textPosition}
                setTextPosition={setTextPosition}
            />
            <button className="add-gift-button" onClick={displayGiftData}>Add Gift !!</button>
        </div>
    );
}

export default Viewer;
