// import React from 'react'
// import './Item.css'
// import { Link } from 'react-router-dom'

// const Item = (props) => {
//   return (
//     <div className='item'>
//       <Link to={`/product/${props.id}`}>
//         <img 
//           onClick={() => window.scrollTo(0, 0)} 
//           src={props.image} 
//           alt={props.name} 
//           className="item-image" 
//         />
//       </Link>
//       <p className="item-name">{props.name}</p>
//       <div className="item-prices">
//         <div className="item-price-new">
//           ${props.new_price}
//         </div>
//         <div className="item-price-old">
//           ${props.old_price}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Item

import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  // Ensure props.available is being passed correctly
  const isInStock = props.available;

  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={props.image}
          alt={props.name}
          className="item-image"
        />
      </Link>
      <p className="item-name">{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>

      {/* Display the stock status */}
      <div className={`item-stock-status ${isInStock ? 'in-stock' : 'out-of-stock'}`}>
        {isInStock ? 'In Stock' : 'Out of Stock'}
      </div>

      {/* Add to cart button */}
      {/* <button
        className={`item-add-to-cart ${!isInStock ? 'disabled' : ''}`}
        disabled={!isInStock}
        onClick={() => isInStock && props.addToCart(props.id)}
      >
        Add to Cart
      </button> */}
    </div>
  );
};

export default Item;
