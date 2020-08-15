import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';
import {DrinkCard} from './components/DrinkCard';
import {ShoppingList} from './components/ShoppingList';
import {FilterSettings} from './components/FilterSettings';
import {StoreContext} from './modules/store';

const useStyles = makeStyles((theme) => ({
  filterButton: {
    marginLeft: '5px',
    height: '100%'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    marginTop: '10px',
  },
  chip: {
    marginLeft: '5px'
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  container: {
    alignItems: 'flex-start'
  },
  github: {
    marginLeft: '10px'
  }
}));

export default function App(props) {
  const classes = useStyles();

  const [state, dispatch] = useContext(StoreContext);

  const {
    filteredRecipes,
    ingredientFilters,
    loading
  } = state;

  const handleIngredientDelete = (ingredient) => {
    dispatch({
      type: 'ACTIONS/DELETE_FILTER',
      ingredient
    })
  }

  const filterRecipes = () => {
      dispatch({
        type: 'ACTIONS/LOADING'
      });

      setTimeout(() => {
        dispatch({
          type: 'ACTIONS/DO_SEARCH'
        });
      }, 500)
  }

  const noResultsSubtitle = ingredientFilters.length ? "No results found - adjust your filter options and try again." : "Add ingredients to your filter and click 'Mix Me A Drink!' to get your results!"

  return (
    <div className={classes.container}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h1" color="inherit" noWrap>
            Mix Me A Drink
          </Typography>
          <a className={classes.github} target="_blank" rel="noopener noreferrer" href="https://github.com/megaconle/bartender" color="secondary"><GitHubIcon aria-label="Go to Github repository" /></a>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
            Mix Me A Drink
          </Typography>
          <Typography variant="h5" component="h3" align="center" color="textSecondary" paragraph>
            Add ingredients to filter recipes
          </Typography>
          <FilterSettings />
        </Container>
        {ingredientFilters && ingredientFilters.length ?
          <React.Fragment>
            <Container maxWidth="sm">
              <Paper component="ul" className={classes.root}>
              {ingredientFilters.map((ingredient, idx) => {
                  return (
                      <li key={idx}>
                        <Chip
                            label={ingredient}
                            onDelete={() => handleIngredientDelete(ingredient)}
                          />
                        </li>
                    );
                })}
              </Paper>
            </Container>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button onClick={() => filterRecipes()} variant="contained" color="primary">Mix Me A Drink!</Button>
              </Grid>
            </Grid>
          </React.Fragment>
        : null}
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          {loading && <LinearProgress />}
          {!loading && !filteredRecipes.length &&
            <div aria-live='polite'>
              <Typography variant="h6" component="h3" align="center" gutterBottom>
                No Results :(
              </Typography>
              <Typography variant="body2" color="textSecondary" align="center">
                {noResultsSubtitle}
              </Typography>
            </div>
          }
          <Grid container spacing={4}>
            {filteredRecipes.map((recipe, idx) => (
              <Grid item key={idx} xs={12} sm={8} md={4}>
                <DrinkCard {...recipe} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <ShoppingList />
    </div>
  );
}
