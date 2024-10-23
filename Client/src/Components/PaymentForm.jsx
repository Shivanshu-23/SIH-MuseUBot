import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import "../Styles/PaymentForm.css"; // Updated import path to a relative path

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState(0);
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState(""); // State for email
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      setLoading(true);
      const parsedAmount = Math.floor(Number(amount) * 100); 

      if (isNaN(parsedAmount) || parsedAmount <= 0 || parsedAmount > 100000000) {
        setError("Amount must be a positive number and less than $1,000,000.");
        setLoading(false);
        return;
      }

      const { data: { clientSecret } } = await axios.post("http://localhost:5000/create-payment", {
        amount: parsedAmount, 
        email: email, // Include email in the request
      });

      const cardElement = elements.getElement(CardElement);
      const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: name, 
              email: email, // Include email in billing details
            },
          },
        }
      );

      if (stripeError) {
        setError(`Payment failed: ${stripeError.message}`);
        setSuccess(null);
      } else {
        if (paymentIntent.status === "succeeded") {
          setSuccess(`Payment successful for ${name}!`); 
          setError(null);
        }
      }
    } catch (error) {
      setError(`Error: ${error.response ? error.response.data.error : error.message}`);
      setSuccess(null);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="payment-form-container">
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name on card</label>
          <input
            type="text"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter name on card"
            required
            maxLength={50} // Limit the length of the name
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email change
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Amount in USD</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in USD"
            required
            
          />
          <CardElement />
        </div>


        <button type="submit" className="payment-btn" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay"}
        </button>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
      </form>
    </div>
  );
};

export default PaymentForm;
