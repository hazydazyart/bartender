import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {StoreContext} from '../modules/store';

const useStyles = makeStyles((theme) => ({
  card: {
    position: '-webkit-sticky',
    zIndex: 100,
    bottom: '1rem',
    position: 'sticky',
    width: '300px'
  }
}));

export const ShoppingList = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StoreContext);

  const {
    shoppingList
  } = state;

  if (!shoppingList.length) {
    return null;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Card className={classes.card}>
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
