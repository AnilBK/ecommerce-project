import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchAllGiftData, deleteGiftData } from '../../services/api';

import MugRenderer from '../../components/Mug/MugRenderer';
import CalendarCanvas from '../../components/Calendar/CalendarCanvas';
import DiaryCanvas from '../../components/Diary/DiaryCanvas';

const GiftRenderer = ({ gift, handleDelete }) => {
    const renderGift = () => {
        switch (gift.GIFT_TYPE) {
            case "mug":
                return (<MugRenderer
                    fontFamily={gift.fontFamily}
                    textStyle={gift.textStyle}
                    canvasText={gift.canvasText}
                    fontColor={gift.fontColor}
                    textPosition={gift.textPosition}
                />);
            case "Calendar":
                // The images are stored in the public/images directory, so we can access them directly using the resolved path.
                const resolvedImagePath = `/images/${gift.imagePath}`;
                return (<CalendarCanvas userImage={resolvedImagePath} />);
            case "Diary":
                return (<DiaryCanvas diaryStyle={gift.diaryStyle} diaryText={gift.diaryText} />);
            default:
                return <h1>Default Gift</h1>;
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            {renderGift()}
            <button onClick={() => handleDelete(gift._id)}>Delete</button>
        </div>
    );
};

const AllGifts = () => {
    const [gifts, setGifts] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetchAllGiftData();
                setGifts(response.data);
            } catch (error) {
                console.error("Error fetching all gifts data:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleDelete = async (giftId) => {
        try {
            await deleteGiftData(giftId);
            setGifts(prev => prev.filter(g => g._id !== giftId));
        } catch (err) {
            console.error("Failed to delete gift:", err);
        }
    };

    return (
        <div className="form-group">
            {gifts.map((gift, index) => (
                <GiftRenderer key={gift._id} gift={gift} handleDelete={handleDelete} />
            ))}
        </div>
    );
};

const MyCart = () => {
    return (
        <div>
            <Link to={'/home'}><h1>Home</h1></Link>
            <h1>My Cart 🛒</h1>
            <AllGifts />
        </div>
    );
};

export default MyCart;