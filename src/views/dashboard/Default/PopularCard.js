import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
// import { Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonPopularCard from '../../../ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from '../../../store/constant';
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const PopularCard = ({ isLoading, CountryClicks }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const data = [
  //   {
  //     name: 'Ireland',
  //     amount: '13,239',
  //     backgroundColor: theme.palette.success.light,
  //     color: theme.palette.success.dark,
  //     arrowIcon: <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
  //   },
  //   {
  //     name: 'Canada',
  //     amount: '10,420',
  //     backgroundColor: theme.palette.success.light,
  //     color: theme.palette.success.dark,
  //     arrowIcon: <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
  //   },
  //   {
  //     name: 'U.S.A',
  //     amount: '20,310',
  //     backgroundColor: theme.palette.success.light,
  //     color: theme.palette.success.dark,
  //     arrowIcon: <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
  //   },
  //   {
  //     name: 'South Africa',
  //     amount: '41,839',
  //     backgroundColor: theme.palette.success.light,
  //     color: theme.palette.success.dark,
  //     arrowIcon: <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
  //   },
  //   {
  //     name: 'India',
  //     amount: '18,319',
  //     backgroundColor: theme.palette.success.light,
  //     color: theme.palette.success.dark,
  //     arrowIcon: <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
  //   },
  //   {
  //     name: 'Egypt',
  //     amount: '41,839',
  //     backgroundColor: theme.palette.success.light,
  //     color: theme.palette.success.dark,
  //     arrowIcon: <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
  //   },
  //   {
  //     name: 'Nigeria',
  //     amount: '18,319',
  //     backgroundColor: theme.palette.success.light,
  //     color: theme.palette.success.dark,
  //     arrowIcon: <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
  //   }
  // ];

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4" sx={{ color: '#5E35B1' }}>
                      Popular Countries
                    </Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                      onClick={handleClick}
                    />
                    <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {CountryClicks.map((item, index) => (
                  <Grid key={index}>
                    <Grid container direction="column">
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              {item.countryCode}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1" color="#5E35B1">
                                  {item.clicks.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                </Typography>
                              </Grid>
                              {/* <Grid item>
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '5px',
                                    backgroundColor: item.backgroundColor,
                                    color: item.color,
                                    ml: 2
                                  }}
                                >
                                  {item.arrowIcon}
                                </Avatar>
                              </Grid> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* <Grid item>
                        <Typography variant="subtitle2" sx={{ color: item.color }}>
                          {item.profitLoss}
                        </Typography>
                      </Grid> */}
                    </Grid>
                    <Divider sx={{ my: 1.5 }} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </CardContent>
          {/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions> */}
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool,
  CountryClicks: PropTypes.bool
};

export default PopularCard;
