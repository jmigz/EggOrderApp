const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { Order } = require('./models');
const ordersRoutes = require('./routes/orders');
const eggtrayRoutes = require('./routes/eggtrays');
const { EggTray } = require('./models');


const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Define the route handler for '/trays'
app.get('/trays', (req, res) => {
  EggTray.findAll()
    .then((trays) => {
      res.json({ trays });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch trays' });
    });
});


app.use('/js', express.static(path.join(__dirname, 'public/js'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  },
}));

app.use('/orders', ordersRoutes);
app.use('/eggtrays', eggtrayRoutes);

app.use((req, res, next) => {
  if (req.body && req.body._method) {
    req.method = req.body._method.toUpperCase();
    delete req.body._method;
  }
  next();
});

app.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.render('index', { existingOrders: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/edit/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.render('edit', { order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/edit/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { name, dept, quantity, price, delivered, paid } = req.body;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update the order details
    order.name = name;
    order.dept = dept;
    order.quantity = quantity;
    order.price = price;

    // Update delivered status and date
    if (order.delivered !== delivered) {
      order.delivered = delivered;
      if (delivered) {
        order.deliveredAt = order.deliveredAt || new Date();
      } else {
        order.deliveredAt = null;
      }
    }

    // Update paid status and date
    if (order.paid !== paid) {
      order.paid = paid;
      if (paid) {
        order.paidAt = order.paidAt || new Date();
      } else {
        order.paidAt = null;
      }
    }
    // Recalculate the total
    order.total = parseFloat(quantity) * parseFloat(price);


    await order.save();
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/eggtrays/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eggTray = await EggTray.findByPk(id);
    if (!eggTray) {
      res.status(404).send('Egg Tray not found');
      return;
    }
    const { type, price } = req.body;
    eggTray.type = type;
    eggTray.price = price;
    await eggTray.save();
    res.redirect('/edit-eggtray');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/edit-eggtray', async (req, res) => {
  try {
    const eggtrays = await EggTray.findAll();
    res.render('edit-eggtray', { existingEggtrays: eggtrays });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get route
app.get('/edit-eggtray/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eggTray = await EggTray.findByPk(id);
    if (!eggTray) {
      // Handle case when egg tray is not found
      res.status(404).send('Egg Tray not found');
      return;
    }
    res.render('edit-eggtray', { eggTray });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/trayedit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eggTray = await EggTray.findByPk(id);
    if (!eggTray) {
      res.status(404).send('Egg Tray not found');
      return;
    }
    res.render('trayedit', { eggTray });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route for adding a new egg tray
app.post('/eggtrays/add', async (req, res) => {
  try {
    const { type, price } = req.body;
    await EggTray.create({ type, price });
    // Return success response
    res.status(200).json({ message: 'Egg tray added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add egg tray' });
  }
});


app.post('/create', async (req, res) => {
  try {
    const { name, dept, quantity, price, delivered, paid } = req.body;
    const total = parseFloat(quantity) * parseFloat(price);
    const order = await Order.create({
      name,
      dept,
      quantity,
      price,
      total,
      delivered,
      paid,
      paidAt: paid ? new Date() : null,
      deliveredAt: delivered ? new Date() : null,
    });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/eggtrays/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const eggTray = await EggTray.findByPk(id);
    if (!eggTray) {
      res.status(404).send('Egg Tray not found');
      return;
    }
    await eggTray.destroy();
    res.status(200).json({ message: 'Egg tray deleted successfully', trayId: id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
