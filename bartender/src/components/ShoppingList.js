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
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0
  }
}));

export const ShoppingList = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StoreContext);

  const {
    shoppingList
  } = state;

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
