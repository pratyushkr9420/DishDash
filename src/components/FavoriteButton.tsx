import { AntDesign } from '@expo/vector-icons';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { useFavoritesContext } from '../services/favorites/favorites.context';
import { RestaurantInfo } from '../utils/types';

const StyledTouchable = styled.TouchableOpacity`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 2;
`;

type FavoriteButtonProps = {
  restaurant: RestaurantInfo;
};

const FavoriteButton: FC<FavoriteButtonProps> = ({ restaurant }) => {
  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext();

  const isFavorite = favorites.find(
    (item) => item.placeId === restaurant.placeId,
  );

  const handlePress = () => {
    if (isFavorite) {
      removeFromFavorites(restaurant);
    } else {
      addToFavorites(restaurant);
    }
  };

  return (
    <StyledTouchable onPress={handlePress}>
      <AntDesign
        name={isFavorite ? 'heart' : 'hearto'}
        size={24}
        color={isFavorite ? 'red' : 'white'}
      />
    </StyledTouchable>
  );
};

export default FavoriteButton;
