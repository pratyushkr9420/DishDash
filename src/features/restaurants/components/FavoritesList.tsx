import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { ScrollView } from 'react-native';
import CompactRestaurantInfoCard from '../../../components/CompactRestaurantInfo';
import {
  RestaurantInfo,
  RestaurantsNavigatorParams,
} from '../../../utils/types';
import {
  StyledFavoriteTouchableOpacity,
  StyledFavoritesContainer,
} from './FavoritesList.styles';

type FavoritesListProps = {
  favorites: RestaurantInfo[];
  navigation: StackNavigationProp<
    RestaurantsNavigatorParams,
    'RestaurantsScreen'
  >;
};

const FavoritesList: FC<FavoritesListProps> = ({ favorites, navigation }) => {
  return (
    <StyledFavoritesContainer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favorites.map((restaurant) => {
          return (
            <StyledFavoriteTouchableOpacity
              key={restaurant.placeId}
              onPress={() =>
                navigation.navigate('RestaurantDetail', { restaurant })
              }
            >
              <CompactRestaurantInfoCard restaurant={restaurant} />
            </StyledFavoriteTouchableOpacity>
          );
        })}
      </ScrollView>
    </StyledFavoritesContainer>
  );
};

export default FavoritesList;
