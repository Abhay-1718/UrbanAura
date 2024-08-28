import  { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast, } from "react-toastify";

// Function to load the Razorpay script
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const RazorpayButton = ({ amount, onSuccess, onError, isFormComplete }) => {
  useEffect(() => {
    loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  const handlePayment = () => {
    if (!isFormComplete()) {
      // Check if form is complete
      toast.error("Please fill out all required information before proceeding with Razorpay.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace with your Razorpay key
      amount: amount * 100, // Amount in the smallest currency unit
      currency: 'INR', // Currency code
      name: 'Your Company Name',
      description: 'Test Transaction',
      handler: function (response) {
        console.log('Payment successful:', response);
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button onClick={handlePayment} className="bg-black text-white px-16 py-3 text-sm">
      PAY WITH RAZORPAY
    </button>
  );
};

RazorpayButton.propTypes = {
  amount: PropTypes.number.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  isFormComplete: PropTypes.func.isRequired, // Add prop type for isFormComplete
};

export default RazorpayButton;
