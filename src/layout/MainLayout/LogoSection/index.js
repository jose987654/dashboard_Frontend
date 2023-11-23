import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase, Typography, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

// project imports
import config from '../../../config';
// import Logo from '../../../ui-component/Logo';
import { MENU_OPEN } from '../../../store/actions';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
      {/* <Logo /> */}
      <Stack direction="row" alignItems="center" spacing={0}>
        <GoogleIcon sx={{ fontSize: '2rem', color: '#5E35B1' }} />
        <Typography variant="h3" sx={{ fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', color: '#5E35B1' }}>
          oogle Reports
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

export default LogoSection;
