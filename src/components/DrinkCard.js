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
  },
  focusAnchor: {
    position: 'absolute',
    left: '-5000px'
  }
}));

export const DrinkCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const state = useContext(StoreContext)[0];

  const {
    additionalFilter
  } = state;

  const {
    name,
    recipe,
    tags,
    directions,
    garnish,
    ingredients
  } = props;

  const handleExpandClick = () => {
    const topOfCard = document.querySelector(`#${name}-top`);
    topOfCard && topOfCard.focus();
    setExpanded(!expanded);
  };

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
          <span tabIndex={expanded ? '0' : '-1'} className={classes.focusAnchor} id={`${name}-top`}>{name} recipe</span>
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
            {additionalFilter === "include-any" && <ShoppingListButtons for={name} ingredients={ingredients} />}
          </CardContent>
        </Collapse>
        <CardActions>
          <Button aria-label={expanded ? 'Show recipe' : 'Hide recipe'} color="primary" onClick={handleExpandClick} aria-expanded={expanded}>
            {expanded ? 'Hide' : 'View'}
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default DrinkCard;
