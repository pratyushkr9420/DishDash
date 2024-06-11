import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-top: ${Platform.OS === 'android' ? '50px' : '0px'};
`;

export const StyledView = styled.View`
  padding: ${(props) => props.theme.space[3]};
  flex: 1;
`;

export const StyledCenteredView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
