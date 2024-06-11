import React, { FC, useEffect, useState } from 'react';
import { useLocationContext } from '../../../services/location/location.context';
import {
  StyledSearchBar,
  StyledSearchContainer,
} from './RestaurantSearch.styles';

type RestaurantSearchProps = {
  favoritesVisible: boolean;
  toggleFavorites: () => void;
};

const RestaurantSearch: FC<RestaurantSearchProps> = ({
  favoritesVisible,
  toggleFavorites,
}) => {
  const { searchLocation, keyword } = useLocationContext();
  const [searchQuery, setSearchQuery] = useState<string>(keyword);
  useEffect(() => {
    setSearchQuery(keyword);
  }, [keyword]);
  return (
    <StyledSearchContainer>
      <StyledSearchBar
        inputStyle={{
          height: 20,
        }}
        placeholder="Search location"
        icon={favoritesVisible ? 'heart' : 'heart-outline'}
        elevation={1}
        value={searchQuery}
        onChangeText={setSearchQuery}
        onIconPress={() => toggleFavorites()}
        onSubmitEditing={() => searchLocation(searchQuery)}
      />
    </StyledSearchContainer>
  );
};

export default RestaurantSearch;
