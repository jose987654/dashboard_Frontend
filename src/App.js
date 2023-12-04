import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import Routes from './routes';
import themes from './themes';
import NavigationScroll from './layout/NavigationScroll';
import { DataProvider } from './store/dataContext';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <DataProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </DataProvider>
  );
};

export default App;
