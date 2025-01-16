import React from 'react';

function AddCustomProduct() {
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
        </div>
    );
}

export default AddCustomProduct;
