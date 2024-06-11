import { Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { colors } from '../../../theme/colors';

export const StyledTitle = styled.Text`
  font-size: 40px;
  font-weight: bold;
  align-self: center;
  color: ${(props) => props.theme.colors.brand.secondary};
`;

export const StyledAuthButton = styled(Button).attrs({
  buttonColor: colors.brand.secondary,
  labelStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})`
  margin-vertical: 2px;
  padding: 5px;
`;
