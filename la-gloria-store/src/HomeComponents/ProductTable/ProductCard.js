import React from 'react';

function ProductCard(props) {
    const { name, image, price } = props;

    return (
        <div className="card" style={{ width: '14rem' }}>
            <img src='https://2.bp.blogspot.com/-_Tx3nbVr5mM/U7ctz8a3LDI/AAAAAAAAAkM/YDDEPDIHjVE/s1600/escudoo.png' className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{price}</p>
                <a href="la-gloria-store/src/HomeComponents#" className="btn btn-primary">
                    Go somewhere
                </a>
            </div>
        </div>
    );
}

export default ProductCard;
