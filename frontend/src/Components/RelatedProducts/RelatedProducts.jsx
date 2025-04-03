import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Item from '../Item/Item';
import { ShopContext } from '../../Contexts/ShopContext';
import './RelatedProducts.css'

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { productId } = useParams(); // Get the current product ID from the URL
  const { all_product } = useContext(ShopContext);

  // Find the current product based on the productId
  const product = all_product.find((p) => p.id === Number(productId));

  useEffect(() => {
    // Fetch related products based on the product category
    if (product) {
      const category = product.category;

      axios
        .get(`http://localhost:4000/relatedproducts/${category}`)
        .then((response) => {
          setRelatedProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
        });
    }
  }, [productId, product]); // This hook runs when the productId or product changes

  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              available={item.available}
            />
          ))
        ) : (
          <p>No related products found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;

