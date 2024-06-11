import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyledCenteredView } from '../../../components/StyledComponents';
import { useFavoritesContext } from '../../../services/favorites/favorites.context';
import {
  RestaurantInfo,
  RestaurantsNavigatorParams,
} from '../../../utils/types';
import RestaurantInfoCard from '../../restaurants/components/RestaurantInfoCard';
import { StyledFavoritesFlatList } from './FavoriteScreen.styles';

type FavoriteScreenProps = {
  navigation: StackNavigationProp<RestaurantsNavigatorParams>;
};

const FavoritesScreen: FC<FavoriteScreenProps> = ({ navigation }) => {
  const { favorites } = useFavoritesContext();
  if (favorites.length === 0) {
    return (
      <StyledCenteredView>
        <Text>No favorites to show</Text>
      </StyledCenteredView>
    );
  }
  return (
    <>
      <StyledFavoritesFlatList
        data={favorites}
        renderItem={({ item }: { item: RestaurantInfo }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RestaurantDetail', { restaurant: item })
              }
            >
              <RestaurantInfoCard restaurant={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item: RestaurantInfo) => item.name}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default FavoritesScreen;
