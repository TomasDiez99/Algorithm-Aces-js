import React from 'react';

function ProductGrid() {
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
    };

    const squareStyle = {
        width: '200px',
        height: '200px',
        backgroundColor: '#ccc',
    };

    return (
        <div style={gridStyle}>
            <div style={squareStyle}>Product 1</div>
            <div style={squareStyle}>Product 2</div>
            <div style={squareStyle}>Product 3</div>
            <div style={squareStyle}>Product 4</div>
            <div style={squareStyle}>Product 5</div>
            <div style={squareStyle}>Product 6</div>
        </div>
    );
}

export default ProductGrid;
