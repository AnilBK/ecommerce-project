import React, { useState } from 'react';

import CalendarCanvas from './CalendarCanvas';
import { saveGiftData } from '../../services/api';

import AddGiftButton from '../AddGiftButton';

import './calendar.css';

function Calendar() {
    const [userImage, setUserImage] = useState(null);
    const [uploadedFilePath, setUploadedFilePath] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

    const saveCalendarGift = async (e) => {
        e.preventDefault();

        if (userImage && uploadedFilePath) {
            console.log("User has uploaded their own image.");
            console.log(`Uploaded file path: ${uploadedFilePath}`);

            try {
                const giftData = {
                    GIFT_TYPE: "Calendar",
                    imagePath: uploadedFilePath,
                };

                const response = await saveGiftData(giftData);
                setResponseMessage(response.data.message);
            } catch (err) {
                console.error('Error saving gift data:', err);
                setResponseMessage('Failed to save gift data');
            }
        } else {
            console.log("No valid user image or file path, skipping request.");
            setResponseMessage('Please upload an image to proceed.');
        }
    };

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
        <div className="vertical-container">
            <div className="horizontal-container">
                <div className="vertical-container">
                    <CalendarCanvas userImage={userImage} />
                </div>
                <div className="options-container">
                    <div className="vertical-container">
                        <div className="vertical-container">
                            <h2>Custom Image</h2>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ marginLeft: '20px' }}
                            />
                        </div>
                        <br />
                        <AddGiftButton onGiftAdd={saveCalendarGift} />
                        {responseMessage && <p>{responseMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
