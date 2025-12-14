import React, { useState } from 'react'
import { useCart } from '../context/CartProvider'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { API_ENDPOINTS } from '../config/api'

export default function Cart() {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        email: '',
        phone: '',
        address: '',
        paymentMethod: 'Cash on Delivery'
    });
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center">
                            <h2>Your Cart is Empty</h2>
                            <p>Add some delicious food items to get started!</p>
                            <a href="/" className="btn btn-success">Browse Food</a>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center mb-4">Your Cart</h2>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-8">
                        {cartItems.map((item) => (
                            <div key={item.cartId} className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img 
                                            src={item.img || "https://via.placeholder.com/200"} 
                                            className="img-fluid rounded-start"
                                            alt={item.name}
                                            style={{height: "120px", objectFit: "cover"}}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text">
                                                        <small className="text-muted">Size: {item.size}</small>
                                                    </p>
                                                    <p className="card-text">₹{item.price} each</p>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-center mb-2">
                                                        <label className="me-2">Quantity:</label>
                                                        <button 
                                                            className="btn btn-outline-secondary btn-sm me-2"
                                                            onClick={() => updateQuantity(item.cartId, item.qty - 1)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="mx-2 fw-bold">{item.qty}</span>
                                                        <button 
                                                            className="btn btn-outline-secondary btn-sm ms-2"
                                                            onClick={() => updateQuantity(item.cartId, item.qty + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <strong>₹{item.price * item.qty}</strong>
                                                        <button 
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => removeFromCart(item.cartId)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <h4>Order Summary</h4>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Items:</span>
                                    <span>{cartItems.reduce((total, item) => total + item.qty, 0)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>₹{getCartTotal()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Delivery Fee:</span>
                                    <span>₹20</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-3">
                                    <strong>Total:</strong>
                                    <strong>₹{getCartTotal() + 20}</strong>
                                </div>
                                
                                <button 
                                    className="btn btn-success w-100 mb-2"
                                    onClick={() => setShowCheckout(true)}
                                >
                                    Proceed to Checkout
                                </button>
                                <button 
                                    className="btn btn-outline-danger w-100"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Modal */}
            {showCheckout && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Checkout</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowCheckout(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handlePlaceOrder}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email"
                                            value={orderDetails.email}
                                            onChange={(e) => setOrderDetails({...orderDetails, email: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input 
                                            type="tel" 
                                            className="form-control" 
                                            id="phone"
                                            value={orderDetails.phone}
                                            onChange={(e) => setOrderDetails({...orderDetails, phone: e.target.value})}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Delivery Address</label>
                                        <textarea 
                                            className="form-control" 
                                            id="address" 
                                            rows="3"
                                            value={orderDetails.address}
                                            onChange={(e) => setOrderDetails({...orderDetails, address: e.target.value})}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
                                        <select 
                                            className="form-control" 
                                            id="paymentMethod"
                                            value={orderDetails.paymentMethod}
                                            onChange={(e) => setOrderDetails({...orderDetails, paymentMethod: e.target.value})}
                                        >
                                            <option value="Cash on Delivery">Cash on Delivery</option>
                                            <option value="Online Payment">Online Payment</option>
                                        </select>
                                    </div>
                                    
                                    <div className="border p-3 mb-3">
                                        <h6>Order Summary</h6>
                                        <div className="d-flex justify-content-between">
                                            <span>Subtotal:</span>
                                            <span>₹{getCartTotal()}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Delivery Fee:</span>
                                            <span>₹20</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between fw-bold">
                                            <span>Total:</span>
                                            <span>₹{getCartTotal() + 20}</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => setShowCheckout(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-success" 
                                    onClick={handlePlaceOrder}
                                    disabled={isPlacingOrder}
                                >
                                    {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    )

    async function handlePlaceOrder(e) {
        e.preventDefault();
        setIsPlacingOrder(true);

        try {
            const response = await fetch(API_ENDPOINTS.ORDER_DATA, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: orderDetails.email,
                    orderData: cartItems,
                    totalAmount: getCartTotal() + 20,
                    deliveryAddress: orderDetails.address,
                    phone: orderDetails.phone,
                    paymentMethod: orderDetails.paymentMethod
                })
            });

            const result = await response.json();

            if (result.success) {
                alert('Order placed successfully! Your order ID is: ' + result.orderId);
                clearCart();
                setShowCheckout(false);
                setOrderDetails({ email: '', phone: '', address: '', paymentMethod: 'Cash on Delivery' });
            } else {
                alert('Error placing order: ' + result.message);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Error placing order. Please try again.');
        } finally {
            setIsPlacingOrder(false);
        }
    }
}
