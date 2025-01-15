import React, { useRef, useState, useEffect } from 'react';

import calendar from "../../assets/images/Calendar.png"
import CalendarDefaultImage from "../../assets/images/Calendar_default_image.png"

import AddGiftButton from '../AddGiftButton';

import './calendar.css';

function Calendar() {
    const canvasRef = useRef(null);
    const [userImage, setUserImage] = useState(null);
    const [uploadedFilePath, setUploadedFilePath] = useState(null);

    function displayCalendarData() {
        if (userImage) {
            console.log("User has uploaded their own image.");
            if (uploadedFilePath) {
                console.log(`Uploaded file path: ${uploadedFilePath}`);
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 318;

        const img = new Image();
        img.src = calendar;

        const default_image = new Image();
        default_image.src = userImage || CalendarDefaultImage;

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
    }, [userImage]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setUserImage(reader.result);
            setUploadedFilePath(file.name);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <div className="horizontal-container-calendar">
                <div>
                    <h2>Custom Image</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ marginLeft: '20px' }}
                    />
                </div>
            </div>
            <canvas ref={canvasRef} style={{ border: '1px solid black', display: 'block', margin: '20px auto' }}
            />
            <AddGiftButton onGiftAdd={displayCalendarData} />
        </div>
    );
}

export default Calendar;
