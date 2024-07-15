import {
  ActivityIndicator,
  Avatar,
  Button,
  MD2Colors,
  TextInput,
} from 'react-native-paper';
import styled from 'styled-components/native';
import { Text } from '../../../components/TextComponent';
import { theme } from '../../../theme';
import { StyledCartText } from './components/CardItemComponent.styles';

// <Avatar.Icon
// style={{ backgroundColor: theme.colors.brand.secondary }}
// size={150}
// icon="cart-off"
// />

export const StyledCartIcon = styled(Avatar.Icon).attrs({
  size: 150,
})`
  background-color: ${(props) => props.theme.colors.brand.secondary};
`;

export const StyledEmptyCartText = styled(Text)`
  font-size: 25px;
`;

export const StyledTotalText = styled(StyledCartText)`
  margin-left: 20px;
`;

export const StyledCheckoutButton = styled(Button).attrs({
  mode: 'contained',
  icon: 'currency-usd',
  buttonColor: theme.colors.brand.secondary,
  labelStyle: {
    fontSize: 18,
  },
})`
  width: 60%;
  padding-horizontal: 15px;
  border-radius: 5px;
  align-self: center;
  margin-vertical: 10px;
  font-size: 20px;
`;

export const StyledClearCartButton = styled(Button).attrs({
  mode: 'contained',
  icon: 'cart-remove',
  buttonColor: theme.colors.ui.error,
  labelStyle: {
    fontSize: 18,
  },
})`
  width: 60%;
  padding-horizontal: 15px;
  border-radius: 5px;
  align-self: center;
  margin-vertical: 10px;
  font-size: 20px;
`;

export const StyledCheckoutInput = styled(TextInput).attrs({
  label: 'name',
  mode: 'outlined',
  textColor: theme.colors.ui.primary,
  outlineStyle: {
    backgroundColor: theme.colors.bg.primary,
  },
})`
  margin-horizontal: 20px;
  margin-vertical: 10px;
`;

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  //128
  size: 100,
  animating: true,
  color: MD2Colors.blue300,
})`
  position: absolute;
  top: 50%;
  left: 35%;
  z-index: 5;
`;
