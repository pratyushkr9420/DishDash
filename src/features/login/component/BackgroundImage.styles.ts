import styled from 'styled-components/native';

export const StyledImageBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/dishdashbg.jpg'),
})`
  flex: 1;
`;

export const StyledLoginCover = styled.View`
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  width: 100%;
  height: 100%;
`;
