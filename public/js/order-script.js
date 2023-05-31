const orderApp = Vue.createApp({
  data() {
    return {
      name: '',
      dept: '',
      quantity: '',
      price: '',
      delivered: false,
      paid: false,
      orders: []
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter((order) => order.delivered && !order.paid);
    },
    calculateAmountOwing() {
      return this.filteredOrders.map((order) => ({
        name: order.name,
        amountOwing: order.quantity * order.price
      }));
    }
  },
  methods: {
    submitForm(event) {
      event.preventDefault();

      const newOrder = {
        name: this.name,
        dept: this.dept,
        quantity: this.quantity,
        price: this.price,
        delivered: this.delivered,
        paid: this.paid
      };

      axios.post('/create', newOrder)
        .then((response) => {
          console.log(response.data);
          this.name = '';
          this.dept = '';
          this.quantity = '';
          this.price = '';
          this.delivered = false;
          this.paid = false;
          this.fetchOrders();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchOrders() {
      fetch('/orders')
        .then((response) => response.json())
        .then((data) => {
          this.orders = data.orders;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.fetchOrders();
  }
});

orderApp.mount('#apporder');
