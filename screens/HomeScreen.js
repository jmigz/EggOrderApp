import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../theme/styles';

const HomeScreen = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://www.brystal.co.za/getOrders');
        const data = await response.json();
        
        setOrders(data.existingOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);

    let filteredOrders = [];

    if (filter === 'all') {
      filteredOrders = orders;
    } else if (filter === 'pendingPayment') {
      filteredOrders = orders.filter((order) => order.paid == false && order.delivered== true);
    } else if (filter === 'pendingDelivery') {
      filteredOrders = orders.filter((order) => order.delivered == false);
    } else if (filter === 'completed') {
      filteredOrders = orders.filter((order) => order.delivered == true && order.paid == true);
    }

    setFilteredOrders(filteredOrders);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>You have successfully logged in!</Text>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'all' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilter('all')}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'pendingPayment' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilter('pendingPayment')}
        >
          <Text style={styles.filterButtonText}>Pending Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'pendingDelivery' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilter('pendingDelivery')}
        >
          <Text style={styles.filterButtonText}>Pending Delivery</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'completed' && styles.activeFilterButton,
          ]}
          onPress={() => handleFilter('completed')}
        >
          <Text style={styles.filterButtonText}>Completed</Text>
        </TouchableOpacity> */}
      </View>

      <ScrollView style={styles.orderList}>
        {filteredOrders.map((order) => (
          <View style={styles.orderCard} key={order.id}>
            <Text style={styles.orderName}>{order.name}</Text>
            <Text style={styles.orderDepartment}>Tray Type: {order.trayType}</Text>
            <Text style={styles.orderDepartment}>{order.trayType}</Text>
            <Text style={styles.orderDepartment}>{order.dept}</Text>
            <Text style={styles.orderDepartment}>{order.quantity}</Text>
            <Text style={styles.orderDepartment}>{order.price}</Text>
            <Text style={styles.orderDepartment}>{order.total}</Text>
            <Text style={styles.orderDepartment}>{order.balance}</Text>
            {/* Add other order details to the card */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
