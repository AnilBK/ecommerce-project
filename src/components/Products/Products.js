import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ProductComponent from './ProductComponent';

import { fetchAllProductsByCategory } from '../../services/api';

const ProductsByCategory = () => {
    const [groupedProducts, setGroupedProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetchAllProductsByCategory();
                setGroupedProducts(response.data);
            } catch (error) {
                if (error.response) {
                    toast.error('Error fetching products: ' + error.response.data.message);
                } else if (error.request) {
                    toast.error('No response received from server. Please try again later.');
                } else {
                    toast.error('Error: ' + error.message);
                }
            }
        };

        getProducts();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1><i>Products by Category</i></h1>
            {groupedProducts.map(group => (
                <div key={group.category}>
                    <h2>{group.category}</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                        {group.products.map(product => (
                            <ProductComponent key={product._id} product={product} showButton={true} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

function Product() {
    return (
        <>
            <ProductsByCategory />
        </>
    );
};

export default Product;
