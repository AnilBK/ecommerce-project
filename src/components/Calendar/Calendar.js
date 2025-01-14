import React, {useRef, useEffect } from 'react';

import calendar from "../../assets/images/Calendar.png"
import CalendarDefaultImage from "../../assets/images/Calendar_default_image.png"

import './calendar.css';

function Calendar() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 318;

        const img = new Image();
        img.src = calendar;

        const default_image = new Image();
        default_image.src = CalendarDefaultImage;

        const drawCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 600, 318);

            // Custom Image draw positions.
            // User uploaded images will be drawn at this position and with the following dimension.
            const custom_image_pos = { x: 0, y: 30, w: 378, h: 288 };
            ctx.drawImage(default_image, custom_image_pos.x, custom_image_pos.y, custom_image_pos.w, custom_image_pos.h);
        };

        img.onload = drawCanvas;
        default_image.onload = drawCanvas;
        
        drawCanvas();
    }, []);

    return (
        <div>
            <div className="horizontal-container-calendar">
                <h2>Custom Image</h2>
            </div>
            <canvas ref={canvasRef} style={{ border: '1px solid black', display: 'block', margin: '20px auto' }}
            />
        </div>
    );
}

export default Calendar;
