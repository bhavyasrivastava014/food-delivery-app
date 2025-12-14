const express = require('express');
const router = express.Router();
const Order = require('../model/Order');

// Place a new order
router.post('/orderData', async (req, res) => {
    try {
        const { email, orderData, totalAmount, deliveryAddress, phone, paymentMethod } = req.body;

        if (!email || !orderData || !totalAmount || !deliveryAddress || !phone) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const newOrder = new Order({
            email,
            orderData,
            totalAmount,
            deliveryAddress,
            phone,
            paymentMethod: paymentMethod || 'Cash on Delivery'
        });

        await newOrder.save();

        res.json({
            success: true,
            message: 'Order placed successfully!',
            orderId: newOrder._id
        });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Get orders for a specific user
router.post('/myorders', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const orders = await Order.find({ email }).sort({ orderDate: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Update order status (for admin/restaurant use)
router.put('/updateOrderStatus', async (req, res) => {
    try {
        const { orderId, status } = req.body;

        if (!orderId || !status) {
            return res.status(400).json({ success: false, message: 'Order ID and status are required' });
        }

        const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, order });

    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// Get all orders (for admin use)
router.get('/allorders', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ orderDate: -1 });
        res.json({ success: true, orders });

    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
