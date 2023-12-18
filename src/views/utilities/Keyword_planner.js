import React, { useEffect, useState } from 'react';
// import { Grid } from '@mui/material';
// import { Grid, Link } from '@mui/material'; useState,
import PropTypes from 'prop-types';
// import MuiTypography from '@mui/material/Typography';
import { Grid, TextField, Button, Chip, Box, Card, Typography } from '@mui/material';
import SubCard from '../../ui-component/cards/SubCard';
import useTokenStatus from '../../services/status';
import MainCard from '../../ui-component/cards/MainCard';
// import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import { gridSpacing } from '../../store/constant';
// import { getAdCampaigns } from '../../services/Ads_data';
import { SyncLoader } from 'react-spinners';
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
import TableSortLabel from '@mui/material/TableSortLabel';

// import { useDataContext } from '../../store/dataContext';
import { getKeywords } from '../../services';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));
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

const KeywordsPlanner = () => {
  const { tokenStatus, navigateToLogin } = useTokenStatus();
  //   const { ads, loading } = useDataContext();
  //   console.log('data to be rendered here', ads);
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [data, setdata] = useState([]);
  const [maxResults, setMaxResults] = useState(10);
  const [inputError, setInputError] = useState(false);
  const [loadingData, setloadingData] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const [orderBy, setOrderBy] = useState('text'); // Default sorting column
  const [order, setOrder] = useState('asc'); // Default sorting order
  const [filters, setFilters] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAddKeyword = () => {
    if (keyword.trim() !== '') {
      setKeywords([...keywords, keyword.trim()]);
      setKeyword('');
      setInputError(false); // Reset the error state when adding a keyword
    } else {
      setInputError(true); // Set the error state to true when adding an empty keyword
    }
  };

  const handleRemoveKeyword = (index) => {
    const updatedKeywords = [...keywords];
    updatedKeywords.splice(index, 1);
    setKeywords(updatedKeywords);
    setInputError(false); // Reset the error state when removing a keyword
  };

  const handleGenerateKeywords = async () => {
    if (keywords.length > 0) {
      const requestPayload = {
        keyword_texts: keywords,
        max_results: maxResults
      };

      try {
        console.log('Generating keywords:', requestPayload);
        setloadingData(true);
        let result = await getKeywords(requestPayload);
        setdata(result?.data?.keywords?.Results);
        setloadingData(false);

        console.log('Keywords generated:', result);
      } catch (error) {
        setdata([]);
        console.error('Error generating keywords:', error);
        setloadingData(false);
      }
    } else {
      setInputError(true);
      console.log('Please add keywords before generating.');
    }
  };

  const handleSortRequest = (columnId) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const handleFilterChange = (columnId, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [columnId]: value }));
  };

  const sortedAndFilteredData = data
    .filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        return !value || String(row[key]).toLowerCase().includes(value.toLowerCase());
      });
    })
    .sort((a, b) => {
      const isAsc = order === 'asc';
      if (orderBy === 'text') {
        return isAsc ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy]);
      } else if (orderBy === 'avg_monthly_searches' || orderBy === 'competition') {
        return isAsc ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy];
      }
      return 0;
    });

  useEffect(() => {
    if (tokenStatus === 0) {
      navigateToLogin();
    }
  }, [tokenStatus, navigateToLogin]);

  return (
    <MainCard title=" Google Ads. Keyword Planner" secondary={<SyncLoader size={8} color="#5E35B1" loading={loadingData} />}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Enter Keyword Here ..."
                  variant="outlined"
                  fullWidth
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setInputError(false);
                  }}
                  error={inputError}
                  helperText={inputError && 'Please enter a keyword'}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button variant="contained" color="primary" onClick={handleAddKeyword} style={{ backgroundColor: '#5e35b1' }}>
                  Add Keyword
                </Button>
              </Grid>
              <Grid item xs={12} md={2}>
                <TextField
                  label="Max Results"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={maxResults}
                  onChange={(e) => setMaxResults(Math.max(1, parseInt(e.target.value, 10)))}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {keywords.map((kw, index) => (
                    <Chip
                      key={index}
                      label={kw}
                      onDelete={() => handleRemoveKeyword(index)}
                      //   color="primary"
                      variant="outlined"
                      style={{ margin: '5px', color: '#5e35b1' }}
                    />
                  ))}
                </div>
              </Grid>
              <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleGenerateKeywords}>
                  Generate Keywords
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={gridSpacing} style={{ minHeight: '530px', marginTop: '10px' }}>
              {sortedAndFilteredData.length > 0 ? (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell align="center">No.</StyledTableCell>
                          <StyledTableCell align="center">
                            <TableSortLabel
                              active={orderBy === 'text'}
                              direction={orderBy === 'text' ? order : 'asc'}
                              onClick={() => handleSortRequest('text')}
                            >
                              Keywords
                            </TableSortLabel>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {' '}
                            <TableSortLabel
                              active={orderBy === 'avg_monthly_searches'}
                              direction={orderBy === 'avg_monthly_searches' ? order : 'asc'}
                              onClick={() => handleSortRequest('avg_monthly_searches')}
                            >
                              Avg. Monthly Searches
                            </TableSortLabel>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {' '}
                            <TableSortLabel
                              active={orderBy === 'competition'}
                              direction={orderBy === 'competition' ? order : 'asc'}
                              onClick={() => handleSortRequest('competition')}
                            >
                              Competition
                            </TableSortLabel>
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <StyledTableCell align="center">
                            <Typography variant="h6" style={{ textAlign: 'center' }}>
                              {' '}
                            </Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <TextField
                              label="Filter Keywords"
                              variant="standard"
                              value={filters.text || ''}
                              onChange={(e) => handleFilterChange('text', e.target.value)}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <TextField
                              label="Filter Searches"
                              variant="standard"
                              value={filters.avg_monthly_searches || ''}
                              onChange={(e) => handleFilterChange('avg_monthly_searches', e.target.value)}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <TextField
                              label="Filter Competition"
                              variant="standard"
                              value={filters.competition || ''}
                              onChange={(e) => handleFilterChange('competition', e.target.value)}
                            />
                          </StyledTableCell>
                        </TableRow>
                        {(rowsPerPage > 0
                          ? sortedAndFilteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : sortedAndFilteredData
                        )?.map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                            <StyledTableCell align="center">{item?.text}</StyledTableCell>
                            <StyledTableCell align="center">
                              {item?.avg_monthly_searches.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </StyledTableCell>
                            <StyledTableCell align="center">{item?.competition}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                          <StyledTableRow style={{ height: 41 * emptyRows }}>
                            <StyledTableCell colSpan={5} aria-hidden />
                          </StyledTableRow>
                        )}
                      </TableBody>
                      <tfoot>
                        <tr>
                          <CustomTablePagination
                            rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={sortedAndFilteredData.length}
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
              ) : (
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">No.</StyledTableCell>
                        <StyledTableCell align="center">Keywords</StyledTableCell>
                        <StyledTableCell align="center">Avg. Monthly Searches</StyledTableCell>
                        <StyledTableCell align="center">Competition</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <StyledTableCell align="center">
                          <Typography variant="h6" style={{ textAlign: 'center' }}>
                            {' '}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            label="Filter Keywords"
                            variant="standard"
                            value={filters.text || ''}
                            onChange={(e) => handleFilterChange('text', e.target.value)}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            label="Filter Searches"
                            variant="standard"
                            value={filters.avg_monthly_searches || ''}
                            onChange={(e) => handleFilterChange('avg_monthly_searches', e.target.value)}
                          />
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <TextField
                            label="Filter Competition"
                            variant="standard"
                            value={filters.competition || ''}
                            onChange={(e) => handleFilterChange('competition', e.target.value)}
                          />
                        </StyledTableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              )}{' '}
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default KeywordsPlanner;
