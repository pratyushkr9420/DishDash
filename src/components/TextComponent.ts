import styled, { DefaultTheme } from 'styled-components/native';
import { VariantsType } from '../utils/types';

type VariantKeys = keyof VariantsType;

interface VariantProps {
  variant?: VariantKeys;
}

const defaultTextStyles = (theme: DefaultTheme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.primary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme: DefaultTheme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme: DefaultTheme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme: DefaultTheme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.bold};
`;

const variants: VariantsType = {
  body,
  label,
  caption,
  error,
  hint,
};

export const Text = styled.Text<VariantProps>`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant = 'body', theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: 'body',
};
