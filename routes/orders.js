const express = require('express');
const router = express.Router();
const { Order } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { name, dept, quantity, price, total } = req.body;
    const order = await Order.create({ name, dept, quantity, price, total });
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:orderId/delivered', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.delivered = true;
    order.deliveredAt = new Date();
    await order.save();
    res.status(200).json({ message: 'Order marked as delivered' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:orderId/paid', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    order.paid = true;
    order.paidAt = new Date();
    await order.save();
    res.status(200).json({ message: 'Order marked as paid' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
