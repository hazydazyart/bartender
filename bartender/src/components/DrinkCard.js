import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
}));

export const DrinkCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {
    name,
    recipe,
    tags,
    directions,
    garnish
  } = props;

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
              <Chip label={tag} />
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleExpandClick} aria-expanded={expanded}>
            View
          </Button>
        </CardActions>
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
        </CardContent>
      </Collapse>
      </Card>
    </React.Fragment>
  );
}

export default DrinkCard;
