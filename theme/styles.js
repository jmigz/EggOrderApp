import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputText: {
    flex: 1,
    height: 50,
    color: 'white',
  },
  showPasswordText: {
    color: 'white',
    fontSize: 14,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  filterButton: {
    padding: 5,
    backgroundColor: '#fb5b5a',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: '#465881',
  },
  filterButtonText: {
    color: 'white',
  },
  ordersContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  orderCard: {
    backgroundColor: '#3c008b',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    alignSelf: 'center',
  },
  orderList :{ 
    width: '100%',
    backgroundColor: '#465881',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10


  },

  orderName:{ 
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },

  orderDate:{ 
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
    alignSelf : 'flex-start',

  },
  orderDepartment: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
    alignSelf: 'flex-end',
  },

  orderText: {
    color: 'white',
    marginBottom: 5,
  },
  scrollView: {
    width: '100%',
  },
});

export default styles;
