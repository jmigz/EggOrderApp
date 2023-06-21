# EggOrderApp

This project is an Order Management System built with Node.js, Express, and Sequelize. It helps in managing orders for selling eggs, keeping track of payments, deliveries, and customer information.

## Getting Started

To get started with the Order Management System, follow the instructions below.

### Prerequisites

Make sure you have the following software and dependencies installed on your machine:

- Node.js (https://nodejs.org)
- npm (Node Package Manager, comes bundled with Node.js)
- PostgreSQL database (https://www.postgresql.org)

### Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/your-username/order-management-system.git
```
Navigate to the project directory:

```shell
cd order-management-system
```
Install the dependencies:

```shell
npm install express sequelize pg pg-hstore ejs axios
```
### Set up the database:

Create a PostgreSQL database for the project.
Update the database configuration in config/config.json with your PostgreSQL database credentials.
Run the database migrations:

```shell

npx sequelize-cli db:migrate
```

Start the server:

```shell

npm start
```

### Launch WebApp on Browser
Open your web browser and visit http://localhost:3000 to access the Order Management System.

### Features
+ Create new orders by filling out a form.
+ View a list of existing orders.
+ Edit existing orders by updating their details.
+ CRUD operations for egg trays including price 

Please note that you should replace your-username with your actual GitHub username in the repository URL.

## Additional Updates

## Updated the Vue app's code:

* Added a showPaymentDialog property to control the visibility of the payment dialog.
* Created a method named openPaymentDialog to handle opening the payment dialog and setting the selected order.
* Created a method named submitPayment to handle the payment submission.
* Created the markAsDelivered method to update the paid status of the order and trigger the payment dialog .
* Added logic to update the amountOwing and paid status based on the payment amount in the submitPayment method.
* Updated the submitForm method to reset the form inputs and reload the page after submitting an order.

## Modified the HTML code:

* Added a payment dialog section with inputs for the payment amount.
* Conditionally rendered the payment dialog using the v-if directive based on the showPaymentDialog flag.
* Added a button to open the payment dialog for a selected order.
* Added a button to submit the payment in the payment dialog.

* Introduced Vue.js framework for the front-end to enhance interactivity.
* Utilized Axios library for making asynchronous HTTP requests.
* Implemented reactivity using Vue.js to update the view after performing operations such as adding and deleting egg trays.
* Modified the server-side code to incorporate the changes required for the Vue.js integration.
* Adjusted the display of prices to show them in the South African Rand (ZAR) currency.
* Added an "Add New Egg Tray" form in the EJS file to enable the addition of egg trays through Vue.js.
* Updated the EJS file to fetch data from the Vue app using the fetchEggTrays method instead of server-side rendering.
* Replaced the server-side form submission for adding egg trays with an Axios POST request to /eggtrays/add through Vue.js.
* Added the functionality to fetch the updated egg trays after adding or deleting through the fetchEggTrays method.
* Fixed the issue where the page needed to be manually refreshed to see the updated data by automatically updating the existingEggtrays array in Vue.js after successful deletion or addition.

