import PropTypes from 'prop-types';
import { logoutFunction } from '../../../../services';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Avatar,
  //   Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  linearProgressClasses
} from '@mui/material';
import { IconLogout } from '@tabler/icons';
// assets
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fff'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main
  }
}));

function LinearProgressWithLabel({ value, ...others }) {
  const theme = useTheme();

  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ color: theme.palette.primary[800] }}>
              Progress
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <BorderLinearProgress variant="determinate" value={value} {...others} />
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number
};

const LogoutCard = () => {
  const theme = useTheme();
  const handleClick = () => {
    logoutFunction();
  };

  return (
    <CardContent>
      <List sx={{ p: 0, m: 0 }}>
        <ListItem alignItems="flex" disableGutters sx={{ p: 0 }} onClick={handleClick}>
          <ListItemAvatar sx={{ mt: 0 }}>
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.largeAvatar,
                color: theme.palette.primary.main,
                border: 'none',
                borderColor: theme.palette.primary.main,
                background: '#fff',
                marginRight: '12px'
              }}
            >
              <IconLogout stroke={1.5} size="1.3rem" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            sx={{ mt: 0, cursor: 'pointer' }}
            primary={
              <Typography variant="subtitle1" sx={{ color: theme.palette.primary[800] }}>
                Logout
              </Typography>
            }
          />
        </ListItem>
      </List>
    </CardContent>
  );
};

export default LogoutCard;
