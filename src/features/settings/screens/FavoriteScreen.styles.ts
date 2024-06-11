import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { RestaurantInfo } from '../../../utils/types';

export const StyledFavoritesContainer = styled.ScrollView`
  padding-horizontal: 10px;
  margin-top: 10px;
`;

export const StyledFavoritesFlatList = styled(
  FlatList as new <T>() => FlatList<T>,
)<FlatListProps<RestaurantInfo>>`
  margin-top: 20px;
  padding-horizontal: 10px;
`;
