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
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));
ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired
};

const SearchAPIComponent = () => {
  const { tokenStatus, navigateToLogin } = useTokenStatus();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const reversedRows = data?.search_analytics_data?.rows.slice().reverse() || {};

  const fetchData = async () => {
    try {
      const data = await getConsoleData();
      // console.log('data 1', data);
      setData(data?.data);
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
              <Grid container spacing={gridSpacing} alignitems="center" style={{ minHeight: '530px' }}>
                <Grid item xs={12} sm={12} md={12} lg={12}></Grid>
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
          <Grid item xs={12}>
            <SubCard title="Site info from Search API ">
              <Grid container spacing={gridSpacing} style={{ minHeight: '530px' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  Site URL : {data?.first_site?.siteUrl}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">No.</StyledTableCell>
                          <StyledTableCell align="center">Date</StyledTableCell>
                          <StyledTableCell align="center">Clicks</StyledTableCell>
                          <StyledTableCell align="center">Impressions</StyledTableCell>
                          <StyledTableCell align="center">ctr</StyledTableCell>
                          {/* <StyledTableCell align="center">Update</StyledTableCell> */}
                          {/* <StyledTableCell align="center">Remove</StyledTableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {reversedRows.map((day, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">
                              {day?.keys?.[0]}
                            </StyledTableCell>
                            <StyledTableCell align="center">{day?.clicks}</StyledTableCell>
                            <StyledTableCell align="center">{day?.impressions}</StyledTableCell>
                            <StyledTableCell align="center">{day?.ctr}</StyledTableCell>
                            {/* <StyledTableCell align="center">Update</StyledTableCell> */}
                            {/* <StyledTableCell align="center">Remove</StyledTableCell> */}
                            {/* <StyledTableCell align="center">
                              <Button
                                variant="contained"
                                style={{ backgroundColor: '#8B0000', color: 'white' }}
                                onClick={() => deleteSingle(day?.day)}
                              >
                                Remove user
                              </Button>
                            </StyledTableCell> */}
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        </Grid>
      </MainCard>
    );
  }
};

export default SearchAPIComponent;
