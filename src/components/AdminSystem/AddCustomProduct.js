import React, { useState } from 'react';

import "./AddCustomProduct.css";

function AddCustomProduct() {
    const [userImage, setUserImage] = useState(null);
    const [uploadedFilePath, setUploadedFilePath] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setUserImage(reader.result);
            setUploadedFilePath(file.name);
            reader.readAsDataURL(file);
        }
    };

    function addProduct() {

    }

    return (
        <div>
            <div>
                <label for='product_name'>Product Name: </label>
                <input type='text' placeholder='Enter product name' name='product_name'></input>
            </div>
            <div>
                <label for='product_price'>Product Price: </label>
                <input type='number' placeholder='Enter product price' name='product_price'></input>
            </div>
            <br></br>
            <div>
                <label for='has_colors_available'>Has Colors Available</label>
                <input type='checkbox' name='has_colors_available'></input>
            </div>
            <div>
                <label for='custom_image'>Custom Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    name='custom_image'
                />
            </div>
            <br></br>
            <button className="add-product-btn" onClick={addProduct}>Add Product</button>
        </div>
    );
}

export default AddCustomProduct;
