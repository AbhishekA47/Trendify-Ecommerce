import React, { useContext } from 'react'
import {ShopContext} from '../Contexts/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptonBox from '../Components/DescriptionBox/DescriptonBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=> e.id === Number(productId));
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product = {product}/>
      <DescriptonBox/>
      <RelatedProducts category={product.category}/>
    </div>
  )
}

export default Product
