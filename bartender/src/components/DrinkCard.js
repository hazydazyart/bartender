/* eslint-disable no-unused-expressions */
import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingListButtons from './ShoppingListButtons';
import {StoreContext} from '../modules/store';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  boozy: {
    backgroundColor: '#b5efff'
  },
  classic: {
    backgroundColor: '#b5c3ff'
  },
  easy: {
    backgroundColor: '#fdffb5'
  },
  sweet: {
    backgroundColor: '#ffc6b5'
  },
  bitter: {
    backgroundColor: '#d5ffb5'
  },
  spicy: {
    backgroundColor: '#ffb5b5'
  }
}));

export const DrinkCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [state, dispatch] = useContext(StoreContext);

  const {
    additionalFilter,
    ingredientFilters
  } = state;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddToListClick = (ingredient) => {
    dispatch({
      type: 'ACTIONS/ADD_TO_SHOPPING_LIST',
      ingredient
    })
  }

  const {
    name,
    recipe,
    tags,
    directions,
    garnish,
    ingredients
  } = props;

  const ingredientsForShoppingList = ingredients.filter(ingredient => !ingredientFilters.includes(ingredient));

  console.log(ingredientFilters, ingredients)

  console.log(ingredientsForShoppingList)

  return (
    <React.Fragment>
      <CssBaseline />
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h3">
            {name}
          </Typography>
          <Typography>
            {tags.map((tag) =>
              <Chip className={classes[tag]} label={tag} />
            )}
          </Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>How to make:</Typography>
            {recipe.map((step, idx) => 
              <Typography paragraph>
                - {step}
              </Typography>
            )}
            <Typography paragraph>
              Garnish: {garnish}
            </Typography>
            <Typography paragraph>
              {directions}
            </Typography>
            {additionalFilter === "include-any" &&
              <>
                <Typography paragraph>
                  Add the missing ingredients to your shopping list:
                </Typography>
                <div>
                  <ShoppingListButtons ingredients={ingredientsForShoppingList} />
                </div>
              </>
            }
          </CardContent>
        </Collapse>
        <CardActions>
          <Button size="small" color="primary" onClick={handleExpandClick} aria-expanded={expanded}>
            View
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default DrinkCard;
