const app = Vue.createApp({
  data() {
    return {
      name: '',
      dept: '',
      trayType: '',
      quantity: 0,
      price: 0,
      delivered: false,
      paid: false,
      trays: [],
      filter: 'pending_payment',
      orders: [],
      filter: 'all',
      showPaymentDialog: false,
      amountPaid: 0, 
      order: {
        delivered: false,
        paid: false,
        
      },
    };
  },
  computed: {
    filteredOrders() {
      switch (this.filter) {
        case 'pending_payment':
          return this.orders.filter((order) => order.delivered && !order.paid);
        case 'pending_delivery':
          return this.orders.filter((order) => !order.delivered);
        case 'delivered_paid':
          return this.orders.filter((order) => order.delivered && order.paid);
        default:
          return this.orders;
      }
    },
    calculateAmountOwing() {
      const filteredOrders = this.orders.filter((order) => order.delivered && !order.paid);
      
      return filteredOrders.map((order) => ({
        id : order.id,
        name: order.name,
        amountOwing: order.balance,
        orderTotal: order.total,

      }));
    },
    pendingDelivery() {
      const filteredOrders = this.orders.filter((order) => !order.delivered);
      
      return filteredOrders.map((order) => ({
        id : order.id,
        name: order.name,
        orderTotal: order.total,

      }));
    },


  },
  mounted() {
    this.fetchOrders();
    this.fetchTrays();
    this.filter = 'pending_payment';
  },
  methods: {
    
    openPaymentDialog(order) {
     
      this.order = order;
    
      this.showPaymentDialog = true;
      
    },
    
    

    formatPrice(price) {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice)) {
        return '';
      }
      return `R${numericPrice.toFixed(2)}`;
    },
    editOrder(orderId) {
      window.location.href = '/edit/' + orderId;
    },
    editEggtray() {
      window.location.href = '/edit-eggtray';
    },
    trayedit(eggTrayId) {
      window.location.href = '/trayedit/' + eggTrayId;
    },
    
    
    showDeleteConfirmation(order) {
      if (confirm(`This will delete the order "${order.name}". Are you sure?`)) {
        this.deleteOrder(order.id);
      }
    },
    deleteOrder(orderId) {
      // Find the order index
      const index = this.orders.findIndex(order => order.id === orderId);
      if (index !== -1) {
        // Remove the order from the orders list
        this.orders.splice(index, 1);
    
        // Send a DELETE request to the server to delete the order
        axios.delete(`/${orderId}`)
          .then(response => {
            console.log('Order deleted successfully.');
          })
          .catch(error => {
            console.error('Error deleting order:', error);
          });
      }
    },
        
    formatDate(date) {
      const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      };
      return new Date(date).toLocaleString(undefined, options);
    },
    fetchOrders() {
      fetch('/orders')
        .then((response) => response.json())
        .then((data) => {
          this.orders = data.orders.map((order) => ({
            ...order,
            delivered: Boolean(order.delivered),
            paid: Boolean(order.paid),
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchTrays() {
      return new Promise((resolve, reject) => {
        fetch('/trays')
          .then((response) => response.json())
          .then((data) => {
            this.trays = data.trays;
            if (this.trays.length > 0) {
              this.trayType = this.trays[0].id;
              this.price = this.trays[0].price;
            }
            resolve(); // Resolve the promise when trays are fetched
          })
          .catch((error) => {
            reject(error); // Reject the promise if an error occurs
          });
      });
    },
    updatePrice() {
      this.selectedTray = this.trays.find((tray) => tray.id === this.trayType);
      if (this.selectedTray) {
        this.price = this.selectedTray.price;
      }
    },
    submitForm() {
      // Create a new order object with the form data
      
      const order = {
        name: this.name,
        dept: this.dept,
        trayType: this.trayType,
        quantity: this.quantity,
        price: this.price,
        delivered: this.delivered,
        paid: this.paid,
        
      };
      // console.log('Current date:', new Date()); // Add this line to log the current date

      
      // Send a POST request to the server to add the order
      axios
        .post('/create', order)
        .then((response) => {
          // Add the new order to the orders list
          // this.orders.push(response.data);

          // Reset the form inputs
          this.name = '';
          this.dept = '';
          this.trayType = '';
          this.quantity = 0;
          this.price = 0;
          this.delivered = false;
          this.paid = false;
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    submitPayment() {
      console.log("Before:", this.order.amountOwing);
      this.order.amountOwing -= this.amountPaid;
      console.log("After:", this.order.amountOwing);
    
      // Update the paid status if the amount owing is 0 or less
      if (this.order.amountOwing <= 0) {
        this.order.paid = true;
      }
    
      // Send a POST request to update the order in the database
      console.log(this.order);
      axios
        .put(`/pay`, { order: this.order }) // Send the order object in the request body
        .then(response => {
        console.log('Order updated successfully.');
        })
          .catch(error => {
            console.error('Error updating order:', error);
      });

    
      this.showPaymentDialog = false; // Close the payment dialogue
    }
    
    
    
    
    
  

 
  },
});

app.mount('#app');
