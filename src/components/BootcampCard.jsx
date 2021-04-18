import {
  Avatar, Card, CardHeader, Typography, CardContent, CardActions, Button,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';

// Price formatter
const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});
function BootcampCard(props) {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant="h6">{props.bootcamp.name}</Typography>}
      />
      <CardContent>
        <Typography variant="caption">{props.bootcamp.description}</Typography>
        <Typography variant="h6" gutterBottom>
          {/* using the formatter to format the price */}
          { formatter.format(props.bootcamp.price) }

        </Typography>
        <Rating
          value={props.bootcamp.rating}
          readOnly
          name={props.bootcamp.name}
          size="small"
          precision={0.5}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" color="primary">Book Now</Button>
        <Button size="small" variant="outlined" color="primary">Learn More</Button>
      </CardActions>
    </Card>
  );
}
export default BootcampCard;
