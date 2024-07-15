import React, { FC } from 'react';
import styled from 'styled-components/native';
import { StyledCenteredView } from '../../../components/StyledComponents';
import { StyledCheckoutSuccessIcon } from './components/CheckoutComponent.styles';

const StyledSuccessText = styled.Text`
  font-size: 25px;
  color: ${(props) => props.theme.colors.brand.secondary};
  margin-vertical: 20px;
`;

const CheckoutSuccessScreen: FC = () => {
  return (
    <StyledCenteredView>
      <StyledCheckoutSuccessIcon icon="check-bold" />
      <StyledSuccessText>Payment successfull!</StyledSuccessText>
    </StyledCenteredView>
  );
};

export default CheckoutSuccessScreen;
