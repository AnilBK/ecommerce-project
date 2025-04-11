import React, { useState } from 'react';
import toast from 'react-hot-toast';

import CalendarCanvas from './CalendarCanvas';
import { saveGiftData } from '../../services/api';

import AddGiftButton from '../AddGiftButton';

import './calendar.css';

function Calendar() {
    const [userImage, setUserImage] = useState(null);
    const [uploadedFilePath, setUploadedFilePath] = useState(null);

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
                toast.success(response.data.message);
            } catch (err) {
                toast.error(`Failed to save gift data: ${err.message}`);
            }
        } else {
            toast.error('Please upload an image to proceed.');
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Calendar;
