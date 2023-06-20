const Sequelize = require('sequelize');
const path = require('path');
const config = require('./config/config.json'); // Replace './config/config.json' with the correct path to your config file

const { Order } = require('./models');


async function updateOrders() {
    try {
      // Fetch the orders where paid is false
      const orders = await Order.findAll({
        where: { paid: false },
      });
  
      // Update the balance for each order
      for (const order of orders) {
        order.balance = order.total;
        await order.save();
      }
  
      console.log('Orders updated successfully.');
    } catch (error) {
      console.error('Error updating orders:', error);
    }
  }
  

// Run the script
updateOrders();
