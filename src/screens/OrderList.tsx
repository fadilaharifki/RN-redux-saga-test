import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Card from '../components/Card';
import ModalComponent from '../components/ModalComponent';
import {useEffect, useState} from 'react';
import CustomText from '../components/CustomText';
import CustomButton from '../components/CustomButton';
import {
  useDeleteOrderByIdMutation,
  useGetOrdersQuery,
} from '../stores/services/orderApi';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import LoadingModal from '../components/Loading';

const OrderListScreen = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {data, isFetching, isLoading, refetch} = useGetOrdersQuery({
    page,
    limit,
  });

  const [deleteOrderById, {isLoading: isLoadingDelete, isSuccess}] =
    useDeleteOrderByIdMutation();

  const [modalVisible, setModalVisible] = useState(false);
  const [idDelete, setIdDelete] = useState<null | number | string>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setPage(1);

      setTimeout(() => {
        refetch();
      }, 500);
    }
  }, [isSuccess]);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);

    setTimeout(() => {
      refetch()
        .then(() => {
          setRefreshing(false);
        })
        .finally(() => {
          setRefreshing(false);
        });
    }, 500);
  };

  const handleLoadMore = () => {
    if (
      !isFetching &&
      !isLoading &&
      data?.list?.length &&
      page < Math.ceil(data.total / limit)
    ) {
      setPage(prev => prev + 1);
    }
  };

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <SafeAreaView style={styles.container}>
      {isLoadingDelete && (
        <LoadingModal
          isVisible={isLoadingDelete}
          message="Please wait, processing..."
        />
      )}
      <FlatList
        data={data?.list ?? []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Card
            item={item}
            onDelete={id => {
              setModalVisible(true);
              setIdDelete(id);
            }}
          />
        )}
        contentContainerStyle={styles.containerFlatList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.8}
        ListFooterComponent={isFetching || isLoading ? <SkeletonCard /> : null}
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
              onPress={() => {
                if (idDelete) {
                  toggleModal();
                  deleteOrderById({id: idDelete});
                }
              }}
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
