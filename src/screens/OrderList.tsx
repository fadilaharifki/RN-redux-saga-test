import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Card from '../components/Card';

const OrderListScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1, 3, 4, 5]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Card />}
        contentContainerStyle={styles.containerFlatList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  containerFlatList: {
    padding: 20,
    gap: 16,
  },
});

export default OrderListScreen;
