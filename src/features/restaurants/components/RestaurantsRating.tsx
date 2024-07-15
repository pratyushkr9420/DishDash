import React, { FC } from 'react';
import { SvgXml } from 'react-native-svg';
import styled from 'styled-components/native';
import star from '../../../../assets/star';

type RestaurantRatingProps = {
  rating: number;
};

const StyledRatingView = styled.View`
  flex-direction: row;
  margin-top: ${(props) => props.theme.space[0]};
`;

const RestaurantRating: FC<RestaurantRatingProps> = ({ rating }) => {
  const newArray = new Array(Math.floor(rating)).fill(0);
  return (
    <StyledRatingView>
      {[0, 0, 0, 0, 0].map((item, index) => (
        <SvgXml width={22} height={22} xml={star} key={index} />
      ))}
    </StyledRatingView>
  );
};

export default RestaurantRating;
