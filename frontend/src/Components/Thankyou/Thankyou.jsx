// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import './Thankyou.css';

// const ThankYou = () => {
//   // Generate current date
//   const currentDate = new Date();

//   // Create dummy shipping and delivery dates
//   const shippingDate = currentDate.toLocaleDateString();
  
//   // Assuming delivery is 2 days after the shipping date
//   const deliveryDate = new Date(currentDate.setDate(currentDate.getDate() + 2)).toLocaleDateString();
  
//   // Dummy delivery address
//   const deliveryAddress = '123, Example Street, City, Country';

//   return (
//     <div className="thank-you-page">
//       <h1>Thank You for Your Purchase!</h1>
//       <h3>Your order has been successfully processed.</h3>

//       {/* Displaying the delivery details */}
//       <div className="delivery-details">
//         <h2>Delivery Details</h2>
//         <div>
//           <strong>Shipping Date:</strong> {shippingDate}
//         </div>
//         <div>
//           <strong>Delivered By:</strong> {deliveryDate}
//         </div>
//         <div>
//           <strong>Delivered To Address:</strong> {deliveryAddress}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThankYou;

import React from 'react';
import { useLocation } from 'react-router-dom';
import './Thankyou.css';

const ThankYou = () => {
  const location = useLocation();
  const { shippingDate, deliveryDate, deliveryAddress } = location.state || {};

  return (
    <div className="thank-you-page">
      <h1>Thank You for Your Purchase!</h1>
      <h3>Your order has been successfully processed.</h3>

      {shippingDate && deliveryDate && deliveryAddress ? (
        <div className="delivery-details">
          <h2>Delivery Details</h2>
          <div>
            <strong>Shipping Date:</strong> {shippingDate}
          </div>
          <div>
            <strong>Delivered By:</strong> {deliveryDate}
          </div>
          <div>
            <strong>Delivered To Address:</strong> {deliveryAddress}
          </div>
        </div>
      ) : (
        <div>Delivery details are not available at this time.</div>
      )}
    </div>
  );
};

export default ThankYou;
