import React from 'react';

import './AddGiftButton.css';

function AddGiftButton({onGiftAdd}) {
    return (
        <button className="add-gift-btn" onClick={onGiftAdd}>Add Gift !!</button>
    );
}

export default AddGiftButton;
