import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { fetchAllGiftData, deleteGiftData, fetchGiftByProductId } from '../../services/api';

import MugRenderer from '../../components/Mug/MugRenderer';
import CalendarCanvas from '../../components/Calendar/CalendarCanvas';
import DiaryCanvas from '../../components/Diary/DiaryCanvas';
import ProductComponent from '../../components/Products/ProductComponent';

import './mycart.css';

const GiftRenderer = ({ gift, handleDelete }) => {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        if (gift.GIFT_TYPE === "NORMAL") {
            const fetchProductData = async () => {
                try {
                    const response = await fetchGiftByProductId(gift.productId);
                    setProductData(response.data);
                } catch (error) {
                    toast.error("Error fetching product data: " + error.message);
                }
            };

            fetchProductData();
        }
    }, [gift.productId, gift.GIFT_TYPE]);

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
            case "NORMAL":
                return productData ? <ProductComponent product={productData} showButton={false} /> : <h1>Loading Product...</h1>;
            default:
                return <h1>Default Gift</h1>;
        }
    };

    return (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            {renderGift()}
            <button onClick={() => handleDelete(gift._id)}>Delete ❌</button>
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
            toast.success("Gift deleted successfully");
        } catch (err) {
            toast.error("Failed to delete gift: " + err.message);
        }
    };

    return (
        <div className="vertical-container">
            {gifts.map((gift) => (
                <div className="horizontal-container" style={{ marginBottom: '20px' }} key={gift._id}>
                    <div className="vertical-container">
                        <GiftRenderer gift={gift} handleDelete={handleDelete} />
                    </div>
                    <div className="vertical-container">
                        <h2>Gift ID: {gift._id}</h2>
                        <h2>Gift Type: {gift.GIFT_TYPE}</h2>
                    </div>
                </div>
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