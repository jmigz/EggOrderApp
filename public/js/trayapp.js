const trayapp = Vue.createApp({
  data() {
    return {
      existingEggtrays: [],
      newEggTrayType: '',
      newEggTrayPrice: '',
    };
  },
  methods: {
    formatPrice(price) {
      const numericPrice = parseFloat(price);
      if (isNaN(numericPrice)) {
        return '';
      }
      return `R${numericPrice.toFixed(2)}`;
    },
  
    fetchEggTrays() {
      axios
        .get('/trays')
        .then(response => {
          this.existingEggtrays = response.data.trays;
          console.log('Fetched egg trays:', this.existingEggtrays);
        })
        .catch(error => {
          console.error('Error fetching egg trays:', error);
        });
    },
    showDeleteConfirmation(event) {
      const eggTrayId = event.target.dataset.eggtrayId;
      console.log('Deleting tray with ID:', eggTrayId);
      if (confirm('Are you sure you want to delete this tray?')) {
        this.deleteTray(eggTrayId);
      }
    },
    deleteTray(trayId) {
      axios
        .delete(`/eggtrays/delete/${trayId}`)
        .then(() => {
          console.log('Tray deleted successfully.');
          // Fetch the updated egg trays after deletion
          this.fetchEggTrays();
        })
        .catch(error => {
          console.error('Error deleting tray:', error);
        });
    },
    addEggTray() {
      const data = {
        type: this.newEggTrayType,
        price: parseFloat(this.newEggTrayPrice),
      };
      axios
        .post('/eggtrays/add', data)
        .then(() => {
          console.log('Egg tray added successfully.');
          // Fetch the updated egg trays after adding
          this.fetchEggTrays();
          // Reset the form fields
          this.newEggTrayType = '';
          this.newEggTrayPrice = '';
        })
        .catch(error => {
          console.error('Error adding egg tray:', error);
        });
    },
  },
  mounted() {
    this.fetchEggTrays();
  },
});

trayapp.mount('#trayapp');
