import React, { FC, useEffect, useState } from 'react';
import { useLocationContext } from '../../../services/location/location.context';
import { StyledSearchBar, StyledSearchContainer } from './MapSearch.styles';

const MapSearch: FC = () => {
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
        elevation={1}
        value={searchQuery}
        onChangeText={setSearchQuery}
        icon="map"
        onIconPress={() => {
          searchLocation(searchQuery);
        }}
        onSubmitEditing={() => searchLocation(searchQuery)}
      />
    </StyledSearchContainer>
  );
};

export default MapSearch;
