import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const CheckOut = ({ bookingsData }) => {
    const { sellingPrice, name, email, _id } = bookingsData;

    const [cardError, setCardError] = useState('');
    const [cardSuccess, setCardSuccess] = useState('');
    const [cardProcessing, setCardProcessing] = useState(false);
    const [cardTransection, setCardTransection] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("https://recarnation-react-server.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sellingPrice }),
        })
            .then((res) => res.json())
            .then((data) => {
                setClientSecret(data.clientSecret);
                console.log(data);
            });
    }, [sellingPrice]);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            console.log("paymentMethod:", paymentMethod);
            setCardError('');
        }
        setCardSuccess('');
        setCardProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email,
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            const payment = {
                sellingPrice,
                email,
                transactionId: paymentIntent.id,
                bookingId: _id,
            };

            fetch('https://recarnation-react-server.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setCardSuccess('Congrats! Your payment is successful');
                    setCardTransection(paymentIntent.id);
                });
        }
        setCardProcessing(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                    <label className="label text-white">Name</label>
                    <input
                        type="text"
                        className="input input-bordered input-ghost w-full text-white"
                        value={name}
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label text-white">Email</label>
                    <input
                        type="email"
                        className="input input-bordered input-ghost w-full text-white"
                        value={email}
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label text-white">Selling Price</label>
                    <input
                        type="number"
                        className="input input-bordered input-ghost w-full text-white"
                        value={sellingPrice}
                        readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label text-white">Card Details</label>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#CCCCCC',
                                    '::placeholder': {
                                        color: '#CCCCCC',
                                    },

                                },
                                invalid: {
                                    color: '#ff5757',
                                },
                            },
                        }}
                        className="p-3 border shadow-sm bg-base-100"
                    />
                </div>
                <button className='btn btn-ghost btn-outline text-white w-full transition-transform duration-300 transform hover:scale-105' type="submit" disabled={!stripe || !clientSecret || cardProcessing}>
                    Purchase
                </button>
            </form>
            {cardError && (
                <div className='text-red-500 mt-2 flex items-center'>
                    <FaExclamationCircle className='mr-2' />
                    <p>{cardError}</p>
                </div>
            )}
            {cardSuccess && (
                <div className='mt-4 text-green-500 flex flex-col items-center'>
                    <div className='flex items-center justify-center text-nowrap'>
                        <FaCheckCircle className='mr-2' />
                        <p>{cardSuccess}</p>
                    </div>
                    <span className='font-semibold ml-2'>Your Transaction ID: {cardTransection}</span>
                </div>
            )}
        </>
    );
};

export default CheckOut;
