import React, { FC } from 'react';
import styled from 'styled-components/native';
import { RestaurantInfo } from '../utils/types';

type CompactRestaurantInfoProps = {
  restaurant: RestaurantInfo;
};

const StyledView = styled.View`
  width: 150px;
  border-radius: 15px;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100px;
  border-radius: 15px;
`;

const StyledText = styled.Text`
  font-family: ${(props) => props.theme.fonts.heading};
  align-self: center;
`;

const CompactRestaurantInfoCard: FC<CompactRestaurantInfoProps> = ({
  restaurant,
}) => {
  return (
    <StyledView>
      <StyledImage source={{ uri: restaurant.photos[0] }} />
      <StyledText>{restaurant.name}</StyledText>
    </StyledView>
  );
};

export default CompactRestaurantInfoCard;
