import { useContext } from 'react';
import { ThemeContext } from '../context/useTheme';

export const useTheme = () => useContext(ThemeContext);
