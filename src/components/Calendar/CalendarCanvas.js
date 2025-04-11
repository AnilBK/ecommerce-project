import React, { useRef, useEffect } from 'react';

import calendar from "../../assets/images/Calendar.png";
import CalendarDefaultImage from "../../assets/images/Calendar_default_image.png"

function CalendarCanvas({ userImage }) {
    const canvasRef = useRef(null);

    const loadImage = (src) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 318;

        const drawMessage = (message) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#000';
            ctx.font = '20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(message, canvas.width / 2, canvas.height / 2);
        };

        const drawImages = async () => {
            drawMessage('Loading...');

            try {
                const baseImg = await loadImage(calendar);
                let overlayImg;

                try {
                    overlayImg = await loadImage(userImage || CalendarDefaultImage);
                } catch {
                    drawMessage('Overlay image not found.');
                    return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(baseImg, 0, 0, 600, 318);

                const pos = { x: 0, y: 30, w: 378, h: 288 };
                ctx.drawImage(overlayImg, pos.x, pos.y, pos.w, pos.h);
            } catch {
                drawMessage('Background image not found.');
            }
        };

        drawImages();
    }, [userImage]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                borderRadius: "16px",
                border: "1.5px solid #191919",
                boxShadow: "4px 4px 0 0 #191919",
                display: 'block',
                margin: '20px auto'
            }}
        />
    );
}

export default CalendarCanvas;
