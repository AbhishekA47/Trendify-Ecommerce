// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';  
// import './DummyPayment.css';

// const DummyPayment = () => {
//   const navigate = useNavigate();  
//   const [formData, setFormData] = useState({
//     name: '',
//     cardNumber: '',
//     expirationDate: '',
//     cvv: '',
//     deliveryAddress: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (
//       !formData.name ||
//       !formData.cardNumber ||
//       !formData.expirationDate ||
//       !formData.cvv ||
//       !formData.deliveryAddress 
//     ) {
//       toast.error('Please fill in all fields!');
//       return;
//     }

//     toast.info('Processing payment...');

//     setTimeout(() => {
//       toast.success('Payment successful! Thank you for your purchase.');

//       // Mark the purchased products as out of stock
//       // Fetch products from cart and mark them out of stock
//       fetch("http://localhost:4000/mark-out-of-stock", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "auth-token": `${localStorage.getItem("auth-token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           productId: 1 // You can dynamically pass the product ID here
//         }),
//       }).then((response) => response.json());

//       // Navigate to the Thank You page
//       navigate('/thank-you');
//     }, 2000); // Simulate payment processing
//   };

//   return (
//     <div className="payment-form">
//       <h2>Dummy Payment Gateway</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name on Card</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Name"
//           />
//         </div>
//         <div>
//           <label>Card Number</label>
//           <input
//             type="text"
//             name="cardNumber"
//             value={formData.cardNumber}
//             onChange={handleChange}
//             placeholder="1234 5678 1234 5678"
//           />
//         </div>
//         <div>
//           <label>Expiration Date</label>
//           <input
//             type="text"
//             name="expirationDate"
//             value={formData.expirationDate}
//             onChange={handleChange}
//             placeholder="MM/YY"
//           />
//         </div>
//         <div>
//           <label>CVV</label>
//           <input
//             type="text"
//             name="cvv"
//             value={formData.cvv}
//             onChange={handleChange}
//             placeholder="123"
//           />
//         </div>
//         <div>
//           <label>Delivery Address</label>
//           <input
//             type="text"
//             name="deliveryAddress"
//             value={formData.deliveryAddress}
//             onChange={handleChange}
//             placeholder="Enter your delivery address"
//           />
//         </div>
//         <button type="submit">Pay Now</button>
//       </form>
//     </div>
//   );
// };

// export default DummyPayment;

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  
import './DummyPayment.css';

const DummyPayment = () => {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    deliveryAddress: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.cardNumber ||
      !formData.expirationDate ||
      !formData.cvv ||
      !formData.deliveryAddress 
    ) {
      toast.error('Please fill in all fields!');
      return;
    }

    toast.info('Processing payment...');

    setTimeout(() => {
      toast.success('Payment successful! Thank you for your purchase.');

      // Simulating marking products out of stock (example)
      fetch("http://localhost:4000/mark-out-of-stock", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: 1 // Pass the actual product ID dynamically
        }),
      }).then((response) => response.json());

      // Navigate to the Thank You page and pass delivery address in the state
      navigate('/thank-you', {
        state: {
          deliveryAddress: formData.deliveryAddress,
          shippingDate: new Date().toLocaleDateString(),
          deliveryDate: new Date(new Date().setDate(new Date().getDate() + 2)).toLocaleDateString(), // Delivery 2 days later
        },
      });
    }, 2000); // Simulate payment processing delay
  };

  return (
    <div className="payment-form">
      <h2>Dummy Payment Gateway</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name on Card</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div>
          <label>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 1234 5678"
          />
        </div>
        <div>
          <label>Expiration Date</label>
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            placeholder="123"
          />
        </div>
        <div>
          <label>Delivery Address</label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            placeholder="Enter your delivery address"
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default DummyPayment;
