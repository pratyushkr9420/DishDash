import React, { ReactNode } from 'react';
import { StyledImageBackground } from './BackgroundImage.styles';

const BackgroundImage = ({ children }: { children: ReactNode }) => {
  return <StyledImageBackground>{children}</StyledImageBackground>;
};
export default BackgroundImage;
