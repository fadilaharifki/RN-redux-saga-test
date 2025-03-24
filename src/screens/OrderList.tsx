import {Button, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import Card from '../components/Card';
import ModalComponent from '../components/ModalComponent';
import {useState} from 'react';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';

const OrderListScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!modalVisible);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1, 3, 4, 5]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Card
            onDelete={id => {
              setModalVisible(true);
            }}
          />
        )}
        contentContainerStyle={styles.containerFlatList}
        showsVerticalScrollIndicator={false}
      />

      <ModalComponent
        visible={modalVisible}
        onClose={toggleModal}
        title="Are you sure to delete this?"
        footer={
          <View style={styles.btnGroup}>
            <CustomButton
              buttonContainerStyle={styles.btn}
              title="Yes, delete i"
              variant="outline"
              color="error"
              onPress={() => {}}
            />
            <CustomButton
              buttonContainerStyle={styles.btn}
              title="Back"
              onPress={toggleModal}
            />
          </View>
        }>
        <CustomText style={styles.descModal}>
          You can't recover data because it will be deleted permanently
        </CustomText>
      </ModalComponent>
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
  descModal: {
    textAlign: 'center',
  },
  btnGroup: {
    gap: 16,
  },
  btn: {flex: 0},
});

export default OrderListScreen;
