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
import TablePagination from '@mui/material/TablePagination';
import { tablePaginationClasses as classes } from '@mui/material/TablePagination';

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

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

const SearchAPIComponent = () => {
  const { tokenStatus, navigateToLogin } = useTokenStatus();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const reversedRows = data?.search_analytics_data?.rows.slice().reverse() || {};
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reversedRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
      <MainCard title="Google Seach Console API">
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <SubCard title="Site info from Search API ">
              <Grid container spacing={gridSpacing} style={{ minHeight: '530px' }}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  Site URL:{' '}
                  <a href={data?.first_site?.siteUrl} target="_blank" rel="noopener noreferrer">
                    {data?.first_site?.siteUrl}
                  </a>
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
                        {(rowsPerPage > 0 ? reversedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : reversedRows).map(
                          (day, index) => (
                            <StyledTableRow key={index}>
                              <StyledTableCell align="center">{index + 1}</StyledTableCell>
                              <StyledTableCell align="center">{day?.keys?.[0]}</StyledTableCell>
                              <StyledTableCell align="center">
                                {day.clicks.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                {day.impressions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                              </StyledTableCell>
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
                          )
                        )}
                        {emptyRows > 0 && (
                          <StyledTableRow style={{ height: 41 * emptyRows }}>
                            <StyledTableCell colSpan={5} aria-hidden />
                          </StyledTableRow>
                        )}
                      </TableBody>
                      <tfoot>
                        <tr>
                          <CustomTablePagination
                            rowsPerPageOptions={[15, 20, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={reversedRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                              select: {
                                'aria-label': 'rows per page'
                              },
                              actions: {
                                showFirstButton: true,
                                showLastButton: true
                              }
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                          />
                        </tr>
                      </tfoot>
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
