import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Grid } from '@mui/material';
import { SyncLoader } from 'react-spinners';
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
// import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '../../store/constant';
import useTokenStatus from '../../services/status';
import { getConsoleData } from '../../services';

const ShadowBox = ({ shadow }) => (
  <Card sx={{ mb: 3, boxShadow: shadow }}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4.5,
        bgcolor: 'primary.light',
        color: 'grey.800'
      }}
    >
      <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
    </Box>
  </Card>
);

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired
};

const SearchAPIComponent = () => {
  const { tokenStatus, navigateToLogin } = useTokenStatus();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await getConsoleData();
      console.log('data 1', data);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  console.log('data to be rendered here', data);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (tokenStatus === 0) {
      navigateToLogin();
    }
  }, [tokenStatus, navigateToLogin]);
  if (loading) {
    return (
      <MainCard title="Seach Console API">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} alignitems="center">
            <SubCard title="Search Data" secondary={<SyncLoader size={8} color="#5E35B1" loading={loading} />}>
              <Grid container spacing={gridSpacing} alignitems="center" style={{ minHeight: '200px' }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {/* <FadeLoader size={192} color="#006064" loading={loading} /> */}
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </MainCard>
    );
  } else {
    return (
      <MainCard title="Seach Console API">
        <Grid container spacing={gridSpacing}>
          {/* <Grid item xs={12}>
        <SubCard title="Basic Shadow">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="0" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="1" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="2" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="3" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="4" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="5" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="6" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="7" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="8" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="9" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="10" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="11" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="12" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="13" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="14" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="15" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="16" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="17" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="18" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="19" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="20" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="21" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="22" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="23" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ShadowBox shadow="24" />
            </Grid>
          </Grid>
        </SubCard>
      </Grid> */}
        </Grid>
      </MainCard>
    );
  }
};

export default SearchAPIComponent;
