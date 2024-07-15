import { FlatList, FlatListProps } from 'react-native';
import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { theme } from '../../../theme';
import { RestaurantInfo } from '../../../utils/types';

// export const StyledFlatList = styled(
//   FlatList as new () => FlatList<MockRestaurantFlatListData>,
// )`
//   padding-horizontal: 10px;
// `;

export const StyledFlatList = styled(FlatList as new <T>() => FlatList<T>)<
  FlatListProps<RestaurantInfo>
>`
  margin-top: 60px;
  padding-horizontal: 10px;
`;

export const StyledOrderButton = styled(Button).attrs({
  mode: 'contained',
  icon: 'currency-usd',
  buttonColor: theme.colors.brand.secondary,
  labelStyle: {
    fontSize: 18,
  },
})`
  width: 90%;
  padding-horizontal: 10px;
  border-radius: 10px;
  align-self: center;
  margin-vertical: 20px;
  font-size: 20px;
`;
