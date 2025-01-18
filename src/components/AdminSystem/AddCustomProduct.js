import React, { useState } from 'react';

import "./AddCustomProduct.css";

function AddCustomProduct() {
    const [userImage, setUserImage] = useState(null);
    const [uploadedFilePath, setUploadedFilePath] = useState(null);
    const [imageList, setImageList] = useState([]);

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

    const addProduct = () => {
        console.log("Product Added");
        console.log("Images: ", imageList);
    };

    return (
        <div>
            <div>
                <label htmlFor='product_name'>Product Name: </label>
                <input type='text' placeholder='Enter product name' name='product_name'></input>
            </div>
            <div>
                <label htmlFor='product_price'>Product Price: </label>
                <input type='number' placeholder='Enter product price' name='product_price'></input>
            </div>
            <br />
            <div>
                <label htmlFor='custom_image'>Custom Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    name='custom_image'
                />
                <button onClick={addImage} className="add-image-btn">
                    Add Image
                </button>
            </div>
            <br />
            <div>
                <h4>Uploaded Images:</h4>
                <ul>
                    {imageList.map((image, index) => (
                        <li key={index} style={{ listStyle: "none" }}>
                            {image.name}
                            <img
                                src={image.src}
                                alt={image.name}
                                style={{ width: "100px", marginLeft: "10px" }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button className="add-product-btn" onClick={addProduct}>
                Add Product
            </button>
        </div>
    );
}

export default AddCustomProduct;
