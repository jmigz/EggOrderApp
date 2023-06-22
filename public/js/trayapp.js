const trayapp = Vue.createApp({
  data() {
    return {
      existingEggtrays: [],
      newEggTrayType: '',
      newEggTrayPrice: '',
      eggTray: {},
      showEditModal:false
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

    openEditModal(eggTray) {
      this.eggTray = Object.assign({}, eggTray);
      this.showEditModal = true;
      console.log("show edit modal status :", this.showEditModal)
    },

    closeEditModal() {
      this.showEditModal = false;
    },


    trayEdit(eggTray) {
      this.eggTray = Object.assign({}, eggTray);
      window.location.href = '/trayedit/' + eggTray.id;
      console.log("When we click trayedit  : ", this.eggTray);

    },

    editEggTrayDetails() {

      console.log("When we find it manually  : ", this.eggTray);
      const modalElement = document.getElementById('TrayModal');
      const modal = bootstrap.Modal.getInstance(modalElement);
      const type = this.eggTray.type;
      const price = this.eggTray.price;
      const eggTrayId = this.eggTray.id;


      const updatedEggTray = {
        type,
        price

      };

      axios
        .put(`/eggtrays/edit/${eggTrayId}`, updatedEggTray)
        .then(response => {
          // Handle the successful response
          console.log(response.data); // You can customize this part based on your requirements
          this.fetchEggTrays();
          
        modal.hide();
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
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
    this.$nextTick(() => {
      const modalElement = document.getElementById('TrayModal');
      const modal = new bootstrap.Modal(modalElement);
    });
  },
  
});

trayapp.mount('#trayapp');
