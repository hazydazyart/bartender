import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {StoreContext} from '../modules/store';

const useStyles = makeStyles((theme) => ({
  card: {
    zIndex: 100,
    bottom: '1rem',
    position: 'sticky',
    width: '300px'
  }
}));

export const ShoppingList = (props) => {
  const classes = useStyles();
  const state = useContext(StoreContext)[0];

  const {
    shoppingList
  } = state;

  if (!shoppingList.length) {
    return null;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Card className={classes.card} tabIndex='0'>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            Shopping List
          </Typography>
          <Typography>
            <ul>
              {shoppingList.map((item) =>
                <li>{item}</li>
              )}
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default ShoppingList;
