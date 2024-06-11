import { Searchbar } from 'react-native-paper';
import styled from 'styled-components/native';

export const StyledSearchContainer = styled.View`
  position: absolute;
  top: 50px;
  left: 10px;
  right: 10px;
  z-index: 100;
`;

export const StyledSearchBar = styled(Searchbar)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
