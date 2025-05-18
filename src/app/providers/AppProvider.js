// src/app/providers/AppProvider.jsx
import { ThemeProvider as CustomThemeProvider, useTheme } from './ThemeProvider';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function MuiThemeSyncWrapper({ children }) {
  const { theme } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      background: {
        default: 'var(--bg-color)',
      },
    },
    typography: {
      fontFamily: '"Noto Sans KR", sans-serif',
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function AppProvider({ children }) {
  return (
    <CustomThemeProvider>
      <MuiThemeSyncWrapper>
        {children}
      </MuiThemeSyncWrapper>
    </CustomThemeProvider>
  );
}