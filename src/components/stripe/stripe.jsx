// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm({ item, email }) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const amountInCents = item.quantity * 200;
    const ticket = item.ticket_id;

    try {
      const res = await fetch('http://localhost:5000/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountInCents, ticket, email }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
        setIsProcessing(false);
      } else if (result.paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        setErrorMessage('');
        setIsProcessing(false);
      }
    } catch (error) {
      setErrorMessage('Something went wrong.');
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      {paymentSuccess ? (
        <div style={{ color: 'green' }}>✅ Payment for {item.name} Successful!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            style={{ marginTop: '20px' }}
          >
            {isProcessing ? 'Processing...' : `Pay $${item.quantity * 2}`}
          </button>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </form>
      )}
    </div>
  );
}

export default CheckoutForm;
