import React from 'react';
import toast from 'react-hot-toast';
import { saveGiftData } from '../../services/api';

const ProductComponent = ({ product, showButton }) => {
    const addNormalProduct = async (e, productId) => {
        e.preventDefault();
        try {
            const giftData = {
                GIFT_TYPE: "NORMAL",
                productId: productId,
            };

            const response = await saveGiftData(giftData);
            toast.success(response.data.message);
        } catch (err) {
            console.error('Error saving gift data:', err);
            toast.error('Failed to save gift data');
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            {product.images?.map((img, index) => (
                <img key={index} src={img.src} alt={img.name} style={{ width: '100%', height: 'auto' }} />
            ))}
            {showButton && (
                <button onClick={(e) => addNormalProduct(e, product._id)}>Add Gift</button>
            )}
        </div>
    );
};

export default ProductComponent;