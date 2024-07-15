import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import {
  StyledCenteredView,
  StyledSafeAreaView,
} from '../../../components/StyledComponents';
import { Text } from '../../../components/TextComponent';
import { useFavoritesContext } from '../../../services/favorites/favorites.context';
import { useLocationContext } from '../../../services/location/location.context';
import { useRestaurantsContext } from '../../../services/restaurants/restaurant.context';
import {
  RestaurantInfo,
  RestaurantsNavigatorParams,
} from '../../../utils/types';
import FavoritesList from '../components/FavoritesList';
import RestaurantInfoCard from '../components/RestaurantInfoCard';
import RestaurantSearch from '../components/RestaurantSearch';
import { StyledFlatList } from './RestaurantDisplayScreen.styles';

type RestaurantsDisplayScreenProps = {
  navigation: StackNavigationProp<
    RestaurantsNavigatorParams,
    'RestaurantsScreen'
  >;
};

const RestaurantDisplayScreen: FC<RestaurantsDisplayScreenProps> = ({
  navigation,
}) => {
  const { restaurants, isLoading, restaurantError } = useRestaurantsContext();
  const { locationError } = useLocationContext();
  const { favorites } = useFavoritesContext();
  const [favoritesVisible, setFavoritesVisible] = useState<boolean>(false);
  const toggleFavorites = () => setFavoritesVisible(!favoritesVisible);
  const hasretrievalErrors = !!locationError || !!restaurantError;
  if (isLoading) {
    return (
      <StyledCenteredView>
        <ActivityIndicator
          animating={true}
          color={MD2Colors.cyan400}
          size={50}
        />
      </StyledCenteredView>
    );
  }
  return (
    <StyledSafeAreaView>
      <RestaurantSearch
        favoritesVisible={favoritesVisible}
        toggleFavorites={toggleFavorites}
      />
      {favoritesVisible && favorites.length !== 0 && (
        <FavoritesList favorites={favorites} navigation={navigation} />
      )}
      {hasretrievalErrors ? (
        <StyledCenteredView>
          <Text variant="error">Error occured while fetching data</Text>
        </StyledCenteredView>
      ) : (
        <StyledFlatList
          data={restaurants}
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
      )}
    </StyledSafeAreaView>
  );
};

export default RestaurantDisplayScreen;
