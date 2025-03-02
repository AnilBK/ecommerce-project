import React, { useState, useEffect } from 'react';

import "./AddCustomProduct.css";
import axios from 'axios';

const ProductCategoryDropdown = ({ setProductCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/get-category-names");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="form-group">
            <label htmlFor="product_category">Product Category</label>
            <select
                id="product_category"
                onChange={(e) => setProductCategory(e.target.value)}
            >
                <option value="">-- Select --</option>
                {categories.map((category, index) => (
                    <option key={index} value={category.categoryName}>
                        {category.categoryName}
                    </option>
                ))}
            </select>
        </div>
    );
};

const Products = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/get-category-names");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="form-group">
            <h1>Products...</h1>
            {categories.map((category, index) => (
                <h1 key={index}><i>{category.categoryName}</i></h1>
            ))}
        </div>
    );
};

function AddCustomProduct() {
    const [userImage, setUserImage] = useState(null);
    const [uploadedFilePath, setUploadedFilePath] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [customProductResponseMessage, setcustomProductResponseMessage] = useState('');

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setUserImage(reader.result);
            setUploadedFilePath(file.name);
            reader.readAsDataURL(file);
        }
    };

    const addImage = () => {
        if (userImage && uploadedFilePath) {
            setImageList((prevList) => [
                ...prevList,
                { name: uploadedFilePath, src: userImage },
            ]);

            // Reset the image input
            setUserImage(null);
            setUploadedFilePath(null);
        } else {
            alert("Please select an image before adding.");
        }
    };

    const deleteImage = (index) => {
        setImageList((prevList) => prevList.filter((_, i) => i !== index));
    };

    const addProduct = async () => {
        if (!productName || !productPrice || !productDescription || !productCategory || imageList.length === 0) {
            alert("Please fill in all fields and upload at least one image.");
            return;
        }

        const productData = {
            name: productName,
            price: parseFloat(productPrice),
            description: productDescription,
            category: productCategory,
            images: imageList,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/save-product', productData);
            setProductName('');
            setProductPrice('');
            setProductDescription('');
            setProductCategory('');
            setImageList([]);
        } catch (err) {
            console.error('Error saving product:', err);
            alert('Failed to save product. Please try again.');
        }
    };

    const updateCategoryName = (event) => {
        setCategoryName(event.target.value);
    }

    const addCategoryName = async (e) => {
        e.preventDefault();
        try {
            const categoryNameData = {
                categoryName: categoryName,
            };

            const response = await axios.post('http://localhost:5000/api/save-category-name', categoryNameData);

            setcustomProductResponseMessage(response.data.message);
            setTimeout(() => {
                setcustomProductResponseMessage('');
            }, 3000);

        } catch (err) {
            console.error('Error saving gift data:', err);

            setcustomProductResponseMessage('Failed to save gift data');
            setTimeout(() => {
                setcustomProductResponseMessage('');
            }, 3000);

        }
    };


    return (
        <div className="add-product-container">
            <h2 className="admin-system-title">Admin System</h2>
            <div className="form-group">
                <label htmlFor='product_name'>Product Name</label>
                <input type='text' name='product_name' value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor='product_price'>Product Price</label>
                <input type='number' name='product_price' min='0' value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor='product_description'>Product Description</label>
                <input type='text' name='product_description' value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            </div>
            <ProductCategoryDropdown setProductCategory={setProductCategory} />
            <div className="form-group">
                <label htmlFor='custom_image'>Upload Images</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} name='custom_image' />
                <button onClick={addImage} className="add-image-btn" disabled={!userImage}>Add Image</button>
            </div>
            <br />
            <div className="image-gallery">
                <div>
                    {imageList.length > 0 && <h4 className="gallery-title">Uploaded Images</h4>}
                    <ul className="image-list">
                        {imageList.map((image, index) => (
                            <li className="image-item" key={index}>
                                <img
                                    src={image.src}
                                    alt={image.name}
                                    className="image-preview"
                                />
                                <span className="image-name">
                                    {image.name}
                                </span>
                                <button
                                    className="delete-product-btn"
                                    onClick={() => deleteImage(index)}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <br />
            <button className="add-product-btn" onClick={addProduct}>
                Add Product
            </button>

            <h2 className="admin-system-title">Add Category System</h2>
            <div className="form-group">
                <label htmlFor='category_name'>Category Name</label>
                <input type='text' name='category_name' onChange={updateCategoryName}></input>
            </div>
            <button className="add-product-btn" onClick={addCategoryName}>
                Add Category
            </button>
            {customProductResponseMessage && <p>{customProductResponseMessage}</p>}
            <br />
            <Products />
        </div>
    );
}

export default AddCustomProduct;
