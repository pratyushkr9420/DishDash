import { Card } from 'react-native-paper';
import styled from 'styled-components/native';

export const StyledView = styled.View`
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const StyledCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const StyledCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const StyledCardContent = styled(Card.Content)`
  row-gap: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[3]};
`;

export const StyledRestaurantDetailsView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledRestaurantStatusIconsView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 20%;
`;
