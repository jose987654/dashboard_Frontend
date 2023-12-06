import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
// import { Grid, Link } from '@mui/material';
// import MuiTypography from '@mui/material/Typography';
import SubCard from '../../ui-component/cards/SubCard';
import useTokenStatus from '../../services/status';
import MainCard from '../../ui-component/cards/MainCard';
// import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '../../store/constant';
import { getAdCampaigns } from '../../services/Ads_data';
import { SyncLoader } from 'react-spinners';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const AdCampaigns = () => {
  const { tokenStatus, navigateToLogin } = useTokenStatus();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await getAdCampaigns();
      console.log('data 1', data);
      setData(data?.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
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
      <MainCard title="Ads. Campaign API">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} alignitems="center">
            <SubCard title="Campaigns" secondary={<SyncLoader size={8} color="#5E35B1" loading={loading} />}>
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
      <MainCard title=" Google Ads. Campaign API">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCard title={`Campaigns currently running  ${data?.campaigns?.length}`}>
              <Grid container spacing={gridSpacing} style={{ minHeight: '530px' }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">No.</StyledTableCell>
                          <StyledTableCell align="center">Id </StyledTableCell>
                          <StyledTableCell align="center">Name</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data?.campaigns?.map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">{item?.id}</StyledTableCell>
                            <StyledTableCell align="center">{item?.name}</StyledTableCell>
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

export default AdCampaigns;
