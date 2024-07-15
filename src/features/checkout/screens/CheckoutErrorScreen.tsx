import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import { StyledCenteredView } from '../../../components/StyledComponents';
import { CheckoutNavigatorParams } from '../../../utils/types';
import { StyledCheckoutErrorIcon } from './components/CheckoutComponent.styles';

type CheckoutErrorScreenProps = {
  route: RouteProp<CheckoutNavigatorParams, 'CheckoutErrorScreen'>;
};

const StyledErrorText = styled.Text`
  font-size: 25px;
  color: ${(props) => props.theme.colors.ui.error};
  margin-vertical: 20px;
`;

const CheckoutErrorScreen: FC<CheckoutErrorScreenProps> = ({ route }) => {
  return (
    <StyledCenteredView>
      <StyledCheckoutErrorIcon icon="close" />
      {route.params && <StyledErrorText>{route.params.error}</StyledErrorText>}
    </StyledCenteredView>
  );
};

export default CheckoutErrorScreen;
