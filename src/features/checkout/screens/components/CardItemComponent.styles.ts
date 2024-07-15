import styled from 'styled-components/native';
import { Text } from '../../../../components/TextComponent';

export const StyledCartItemContainer = styled.View`
  flex-direction: row;
  width: '100%';
  justify-content: space-between;
  align-items: center;
  margin-vertical: 20px;
  padding-horizontal: 5px;
`;

export const StyledCartText = styled(Text)`
  font-size: 18px;
`;
