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
import Button from '@mui/material/Button';
import useTokenStatus from '../../services/status';
// import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '../../store/constant';
import { getEmailList, deleteEmail } from '../../services/email';
// import { getEmailList, updateEmail, deleteEmail, deleteAllEmail } from '../../services/email';
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
  const { tokenStatus, navigateToLogin } = useTokenStatus();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await getEmailList();
      // console.log('data 1', data);
      setData(data?.data?.all_recipients);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tokenStatus === 0) {
      navigateToLogin();
    }
  }, [tokenStatus, navigateToLogin]);
  console.log('data', data);
  useEffect(() => {
    fetchData();
  }, []);

  // const deleteAllemails = async () => {
  //   const response = await deleteAllEmail();
  // window.location.reload();
  // };
  const deleteSingle = async (email) => {
    const response = await deleteEmail({ email: email });
    setLoading(true);
    console.log('response', response);
    const data = await getEmailList();
    // console.log('data 1', data);
    setData(data?.data?.all_recipients);
    setLoading(false);
  };
  // const updateEmail = async () => {
  // {"old_email": "emaiel2@example.com", "new_email": "Vmaiel2@example.com"}
  //   const response = await updateEmail();
  // };

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
                          <StyledTableCell>First Name</StyledTableCell>
                          <StyledTableCell>Last Name</StyledTableCell>
                          <StyledTableCell align="center">Role</StyledTableCell>
                          {/* <StyledTableCell align="center">Update</StyledTableCell> */}
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
                            <StyledTableCell align="center">{email?.first_name}</StyledTableCell>
                            <StyledTableCell align="center">{email?.last_name}</StyledTableCell>
                            <StyledTableCell align="center">{email?.role}</StyledTableCell>
                            {/* <StyledTableCell align="center">Update</StyledTableCell> */}
                            {/* <StyledTableCell align="center">Remove</StyledTableCell> */}
                            <StyledTableCell align="center">
                              <Button
                                variant="contained"
                                style={{ backgroundColor: '#8B0000', color: 'white' }}
                                onClick={() => deleteSingle(email?.email)}
                              >
                                Remove user
                              </Button>
                            </StyledTableCell>
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
