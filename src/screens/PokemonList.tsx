import {FlatList, RefreshControl, SafeAreaView, StyleSheet} from 'react-native';
import Card from '../components/Card';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../stores/store';
import {fetchPokemon, resetPokemon} from '../stores/slices/pokemonSlice';

const PokemonListScreen = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 30;
  const [refreshing, setRefreshing] = useState(false);

  const {data, isLoading} = useSelector((state: RootState) => state.pokemon);
  console.log(data, '???????');

  useEffect(() => {
    const offset = (page - 1) * limit;
    dispatch(fetchPokemon({offset, limit}));
  }, [page, dispatch]);

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(resetPokemon());
    setPage(1);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleLoadMore = () => {
    if (!isLoading) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <Card item={item}></Card>}
        contentContainerStyle={styles.containerFlatList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        // ListFooterComponent={isLoading ? <SkeletonCard /> : null}
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

export default PokemonListScreen;
