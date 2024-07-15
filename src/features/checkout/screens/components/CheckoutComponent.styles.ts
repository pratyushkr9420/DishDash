import { Avatar } from 'react-native-paper';
import styled from 'styled-components/native';

export const StyledCheckoutErrorIcon = styled(Avatar.Icon).attrs({
  size: 150,
})`
  background-color: ${(props) => props.theme.colors.ui.error};
`;

export const StyledCheckoutSuccessIcon = styled(Avatar.Icon).attrs({
  size: 150,
})`
  background-color: ${(props) => props.theme.colors.brand.secondary};
`;
