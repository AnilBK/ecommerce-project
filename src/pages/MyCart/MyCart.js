import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchAllGiftData } from '../../services/api';

import MugRenderer from '../../components/Mug/MugRenderer';
import CalendarCanvas from '../../components/Calendar/CalendarCanvas';
import DiaryCanvas from '../../components/Diary/DiaryCanvas';

const GiftRenderer = ({ gift }) => {
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
            // Loads from /public/images/ folder.
            const resolvedImagePath = `/images/${gift.imagePath}`;
            return (<CalendarCanvas userImage={resolvedImagePath} />);
        case "Diary":
            return (<DiaryCanvas diaryStyle={gift.diaryStyle} diaryText={gift.diaryText} />);
        default:
            return <h1>Default Gift</h1>;
    }
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

    return (
        <div className="form-group">
            {gifts.map((gift, index) => (
                <GiftRenderer key={index} gift={gift} />
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