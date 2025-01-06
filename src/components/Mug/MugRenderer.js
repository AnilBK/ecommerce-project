import React from 'react';
import MugCanvas from './MugCanvas';

function MugRenderer({ fontFamily, textStyle, canvasText, fontColor, textPosition }) {
    return (
        <MugCanvas
            fontFamily={fontFamily}
            textStyle={textStyle}
            canvasText={canvasText}
            fontColor={fontColor}
            textPosition={textPosition}
        />
    );
}

export default MugRenderer;
