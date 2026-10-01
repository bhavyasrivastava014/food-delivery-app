import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // In a real app, you'd get this from auth context or localStorage
        // For now, we'll ask user for email
        const email = localStorage.getItem('userEmail') || '';
        setUserEmail(email);
    }, []);

    const fetchOrders = async () => {
        if (!userEmail) {
            alert('Please enter your email address to view orders');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://food-delivery-app-c4kw.onrender.com/api/myorders", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            const result = await response.json();

            if (result.success) {
                setOrders(result.orders);
                localStorage.setItem('userEmail', userEmail); // Save for future use
            } else {
                alert('Error fetching orders: ' + result.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Error fetching orders. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-success';
            case 'Out for Delivery': return 'bg-info';
            case 'Preparing': return 'bg-warning';
            case 'Confirmed': return 'bg-primary';
            case 'Cancelled': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center mb-4">My Orders</h2>
                    </div>
                </div>

                {/* Email Input */}
                <div className="row mb-4">
                    <div className="col-md-6 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label htmlFor="emailInput" className="form-label">Enter your email to view orders</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="emailInput"
                                        placeholder="your-email@example.com"
                                        value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)}
                                    />
                                </div>
                                <button 
                                    className="btn btn-success w-100" 
                                    onClick={fetchOrders}
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Get My Orders'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {orders.length > 0 && (
                    <div className="row">
                        <div className="col-12">
                            {orders.map((order) => (
                                <div key={order._id} className="card mb-4">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h5>Order #{order._id.slice(-8)}</h5>
                                                <small className="text-muted">
                                                    Placed on: {formatDate(order.orderDate)}
                                                </small>
                                            </div>
                                            <div className="col-md-4 text-end">
                                                <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                                <div className="mt-2">
                                                    <strong>₹{order.totalAmount}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h6>Items Ordered:</h6>
                                                {order.orderData.map((item, index) => (
                                                    <div key={index} className="d-flex justify-content-between align-items-center border-bottom py-2">
                                                        <div className="d-flex align-items-center">
                                                            <img 
                                                                src={item.img || "https://via.placeholder.com/50"} 
                                                                alt={item.name}
                                                                className="rounded me-3"
                                                                style={{width: "50px", height: "50px", objectFit: "cover"}}
                                                            />
                                                            <div>
                                                                <strong>{item.name}</strong>
                                                                <br />
                                                                <small className="text-muted">
                                                                    Size: {item.size} | Qty: {item.qty}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <strong>₹{item.price * item.qty}</strong>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="col-md-4">
                                                <h6>Delivery Details:</h6>
                                                <p className="mb-2">
                                                    <strong>Address:</strong><br />
                                                    {order.deliveryAddress}
                                                </p>
                                                <p className="mb-2">
                                                    <strong>Phone:</strong> {order.phone}
                                                </p>
                                                <p className="mb-0">
                                                    <strong>Payment:</strong> {order.paymentMethod}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {orders.length === 0 && userEmail && !loading && (
                    <div className="row">
                        <div className="col-12 text-center">
                            <div className="alert alert-info">
                                <h4>No orders found</h4>
                                <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
                                <a href="/" className="btn btn-success">Browse Food</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}
