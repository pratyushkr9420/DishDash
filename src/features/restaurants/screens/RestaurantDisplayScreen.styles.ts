import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
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
