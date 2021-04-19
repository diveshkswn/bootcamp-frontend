import {
  Container, makeStyles, TextField, Typography, Button, Snackbar,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    padding: '25px',
  },
  heading: {
    fontSize: '35px',
  },
  formContainer: {
    padding: '10px',
  },
});

function AddBootcamp() {
  const [formInput, setFormInput] = useState({
    name: '',
    description: '',
    price: 0,
    rating: 0,
  });
  const [snackTrue, setSnackTrue] = useState(false);
  const [errorSnackTrue, setErrorSnackTrue] = useState(false);
  const [submitData, setSubmitData] = useState({
    name: '',
    description: '',
    price: 0,
    rating: 0,
  });
  const classes = useStyles();

  function handleFormInput(event) {
    setFormInput((oldVal) => ({ ...oldVal, [event.target.name]: event.target.value }));
  }
  function handleSubmit() {
    setSubmitData(formInput);
  }

  async function postData() {
    try {
      const data = await axios.post('https://stark-dusk-95651.herokuapp.com/api/v1/bootcamps/', submitData);
      if (data.data.success) {
        setSnackTrue(true);
        setTimeout(() => { setSnackTrue(false); }, 3000);
      } else {
        setErrorSnackTrue(true);
        setTimeout(() => { setErrorSnackTrue(false); }, 1000);
      }
    } catch (e) {
      setErrorSnackTrue(true);
      setTimeout(() => { setErrorSnackTrue(false); }, 1000);
    }
  }
  useEffect(() => {
    postData();
  }, [submitData]);

  return (
    <Container className={classes.root}>

      <Typography className={classes.heading}>Add New Bootcamps</Typography>
      <div className={classes.formContainer}>
        {/* Name */}
        <TextField
          size="small"
          name="name"
          label="Name"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          onChange={handleFormInput}
          value={formInput.name}
        />
        {/* Description */}
        <TextField
          size="small"
          name="description"
          label="Description"
          variant="outlined"
          type="text"
          fullWidth
          margin="normal"
          onChange={handleFormInput}
          value={formInput.description}
        />
        {/* Price */}
        <TextField
          size="small"
          name="price"
          label="Price"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleFormInput}
          value={formInput.price}
        />
        {/* Rating */}
        <TextField
          size="small"
          name="rating"
          label="Rating"
          variant="outlined"
          type="number"
          fullWidth
          margin="normal"
          onChange={handleFormInput}
          value={formInput.rating}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
        >
          Save
        </Button>

      </div>
      <Snackbar open={snackTrue} autoHideDuration={6000}>
        <Alert severity="success" variant="filled">Bootcamp added successfully</Alert>
      </Snackbar>
      <Snackbar open={errorSnackTrue} autoHideDuration={6000}>
        <Alert severity="error" variant="filled">Error occured while adding to database</Alert>
      </Snackbar>
    </Container>
  );
}

export default AddBootcamp;
