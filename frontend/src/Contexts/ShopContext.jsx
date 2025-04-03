// import React, { createContext, useEffect, useState } from "react";

// export const ShopContext = createContext(null);

// const getDefaultCart = ()=>{
//     let cart = {};
//     for (let index = 0; index <300+1; index++) {
//         cart[index] =0;
        
//     }
//     return cart;
// }

// const ShopContextProvider = (props) => {

//     const[all_product,setAll_Product] = useState([]);

//     const [cartItems,setCartItems] = useState(getDefaultCart());

//     useEffect(()=>{
//         fetch('http://localhost:4000/allproducts')
//         .then((response)=>response.json())
//         .then((data)=>setAll_Product(data))

//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/getcart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:"",
//             }).then((response)=>response.json())
//             .then((data)=>setCartItems(data))
//         }
//     },[])
    
//     const addToCart =(itemId)=>{
//          setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
//          if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/addtocart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}),
//             })
//             .then((response)=>response.json())
//             .then((data)=>console.log(data));
//          }
         
//      }

//     const removeFromCart =(itemId)=>{
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//         if(localStorage.getItem('auth-token')){
//             fetch('http://localhost:4000/removefromcart',{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}),
//             })
//             .then((response)=>response.json())
//             .then((data)=>console.log(data));
//         }
//    }

//    const getTotalCartAmount =()=>{
//     let totalAmount = 0;
//     for(const item in cartItems)
//     {
//         if(cartItems[item]>0)
//         {
//             let itemInfo =all_product.find((product)=>product.id===Number(item))
//             totalAmount += itemInfo.new_price * cartItems[item];
//         }
        
//     }
//     return totalAmount;
//    }
 
//    const  getTotalCartItems = () =>{
//       let totalItem =0;
//       for(const item in cartItems)
//       {
//         if(cartItems[item]>0)
//         {
//             totalItem+= cartItems[item]
//         }
//       }
//       return totalItem;
//    }
   

//    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

//     return(
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider;

import React, { createContext, useEffect, useState } from 'react';

// Utility function to get default cart data
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {  // Assuming 300 products
    cart[index] = 0;  // Initialize cart items quantity to 0
  }
  return cart;
};

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [sortOrder, setSortOrder] = useState(""); // "asc" for ascending or "desc" for descending

  useEffect(() => {
    // Fetch all products
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Verify that the availability has been updat
        setAll_Product(data);

      });

    // If user is logged in, fetch their cart
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));
    }
  }, []);

  // Add product to cart
  const addToCart = (itemId) => {
    const item = all_product.find((product) => product.id === itemId);
    if (item && item.available) { // Only add if product is available
      setCartItems((prev) => {
        const newCart = { ...prev };
        newCart[itemId] += 1;
        return newCart;
      });

      // Send request to backend to add item to user's cart
      if (localStorage.getItem("auth-token")) {
        fetch("http://localhost:4000/addtocart", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": `${localStorage.getItem("auth-token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }),
        }).then((response) => response.json());
      }
    } else {
      alert("This item is out of stock");
    }
  };

  // Remove product from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 0) {
        newCart[itemId] -= 1;
      }
      return newCart;
    });

    // Send request to backend to remove item from user's cart
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      }).then((response) => response.json());
    }
  };

  // Get the total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Get the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  // Handle sorting of products
  const handleSortChange = (order) => {
    setSortOrder(order);
    if (order === "asc") {
      setAll_Product((prev) =>
        [...prev].sort((a, b) => a.new_price - b.new_price)
      );
    } else if (order === "desc") {
      setAll_Product((prev) =>
        [...prev].sort((a, b) => b.new_price - a.new_price)
      );
    } else {
      // reset to default (no sort)
      fetch("http://localhost:4000/allproducts")
        .then((response) => response.json())
        .then((data) => setAll_Product(data));
    }
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    handleSortChange,
    sortOrder,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
