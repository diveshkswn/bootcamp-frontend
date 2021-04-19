/* eslint-disable no-console */
import {
  CircularProgress, Container, FormControl,
  FormControlLabel, Grid, makeStyles, Paper, Radio, RadioGroup, Slider, TextField, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import BootcampCard from '../components/BootcampCard';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  loader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    marginBottom: '1rem',
    padding: '13px',
  },

  filters: {

    padding: '0 1.5rem',
  },
  priceRangeInputs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
function BootcampsPage() {
  // Material UI Styles
  const classes = useStyles();
  // Component state
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderVal, setSliderVal] = useState(1500);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  // let cancel;

  // History URL
  const history = useHistory();

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://stark-dusk-95651.herokuapp.com/api/v1/bootcamps/${filter}${sort}`,
        // cancelToken: new axios.CancelToken((c) => { cancel = c; }),
      });
      console.log(data);
      setBootcamps(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // Side effects
  useEffect(() => {
    fetchData();
  }, [filter, sort]);

  function populateBootcamps(bootcamp) {
    return (
      <Grid item key={bootcamp.id} xs={12} sm={6} md={4} lg={3}>
        {/* BootcampCard Component */}
        <BootcampCard
          bootcamp={bootcamp}
        />
      </Grid>
    );
  }

  function onSliderCommitHandler(event, newValue) {
    const urlFilter = `?price[lte]=${newValue}`;
    setFilter(urlFilter);
    history.push(urlFilter);
  }

  function handleSort(event) {
    console.log(event.target.name);
    if (!filter) {
      setFilter('?price[lte]=2000');
    }
    if (event.target.name === 'high') {
      setSort('&sort=-price');
    } else if (event.target.name === 'low') {
      setSort('&sort=price');
    }
  }

  return (
    <Container className={classes.root}>
      {/* {filtering and sorting section} */}
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Price Filters</Typography>
            <div className={classes.filters}>
              <Slider
                min={0}
                max={2000}
                valueLabelDisplay="auto"
                onChange={(e, newValue) => setSliderVal(newValue)}
                onChangeCommitted={onSliderCommitHandler}
              />
            </div>
            <div className={classes.priceRangeInputs}>
              <TextField
                size="small"
                id="lower"
                label="Min Price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={sliderVal}

              />

              <TextField
                size="small"
                id="upper"
                label="Max Price"
                variant="outlined"
                type="number"
                disabled={loading}

              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort by </Typography>
            <FormControl component="fieldset" className={classes.filters}>
              <RadioGroup
                aria-label="price-order"
                name="price-order"
              >
                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Price : Higest - Lowest"
                  name="high"
                  onClick={handleSort}
                />

                <FormControlLabel
                  disabled={loading}
                  control={<Radio />}
                  label="Price : Lowest - Higest"
                  name="low"
                  onClick={handleSort}
                />
              </RadioGroup>
            </FormControl>

          </Grid>
        </Grid>
      </Paper>
      {/* {bootcamps listing} */}
      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          bootcamps.map(populateBootcamps)
        )}
      </Grid>

    </Container>
  );
}

export default BootcampsPage;
