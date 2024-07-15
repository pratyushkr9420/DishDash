import React, { FC } from 'react';
import { View } from 'react-native';
import CompactRestaurantInfoCard from '../../../../components/CompactRestaurantInfo';
import { cartItem } from '../../../../utils/types';
import {
  StyledCartItemContainer,
  StyledCartText,
} from './CardItemComponent.styles';

type CartItemComponentProps = {
  cartItem: cartItem;
};

const CartItemComponent: FC<CartItemComponentProps> = ({ cartItem }) => {
  return (
    <StyledCartItemContainer>
      <CompactRestaurantInfoCard restaurant={cartItem.restaurant} />
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <StyledCartText variant="label">{cartItem.item}:</StyledCartText>
        <StyledCartText variant="label">
          {' '}
          ${cartItem.price / 100}{' '}
        </StyledCartText>
      </View>
    </StyledCartItemContainer>
  );
};

export default CartItemComponent;
