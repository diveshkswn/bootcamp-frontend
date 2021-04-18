/* eslint-disable no-console */
import {
  CircularProgress, Container, Grid, makeStyles,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
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
});
function BootcampsPage() {
  // Material UI Styles
  const classes = useStyles();
  // Component state
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);

  // let cancel;

  async function fetchData() {
    setLoading(true);
    try {
      const { data } = await axios({
        method: 'GET',
        url: '/api/v1/bootcamps/',
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
  }, []);

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

  return (
    <Container className={classes.root}>

      {/* {filtering and sorting section} */}
      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          bootcamps.map(populateBootcamps)
        )}
      </Grid>
      {/* {bootcamps listing} */}
    </Container>
  );
}

export default BootcampsPage;
