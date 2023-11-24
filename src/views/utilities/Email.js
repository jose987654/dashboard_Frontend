import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';import * as React from 'react';
// import { Box, Card, Grid, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
// import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '../../store/constant';
import { getEmailList } from '../../services/email';
import { SyncLoader } from 'react-spinners';

// ===============================|| EMAIL ||=============================== //
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
const EmailComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await getEmailList();
      console.log('data 1', data);
      setData(data?.data?.all_recipients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  console.log('data', data);
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <MainCard title="Emails">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} alignitems="center">
            <SubCard title="Email Recepients" secondary={<SyncLoader size={8} color="#5E35B1" loading={loading} />}>
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
      <MainCard title="Emails">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCard title="Email Recepients">
              <Grid container spacing={gridSpacing} style={{ minHeight: '200px' }}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">No.</StyledTableCell>
                          <StyledTableCell>Email Address</StyledTableCell>
                          <StyledTableCell align="center">Role</StyledTableCell>
                          <StyledTableCell align="center">Update</StyledTableCell>
                          <StyledTableCell align="center">Remove</StyledTableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((email, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                              {email?.email}
                            </StyledTableCell>
                            <StyledTableCell align="center">{email?.role}</StyledTableCell>
                            <StyledTableCell align="center">Update</StyledTableCell>
                            <StyledTableCell align="center">Remove</StyledTableCell>
                           
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

export default EmailComponent;
