import React, {useState, useRef, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import {DrinkCard} from './components/DrinkCard';
import {recipes} from './data/recipes';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
}));

export default function Album() {
  const classes = useStyles();
  const [ingredientFilters, setIngredientFilters] = useState([]);
  const [tagFilters, setTagFilters] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [additionalFilter, setAdditionalFilter] = useState("include-any");

  const ingredientRef = useRef(null);
  const tagRef = useRef(null);

  const updateAdditionalFilter = (e) => {
    setAdditionalFilter(e.target.value);
  }

  const updateIngredients = () => {
    const ingredients = [...ingredientFilters, ingredientRef.current.value];

    ingredientRef.current.value = '';
    setIngredientFilters(ingredients);
  }

  const updateTags = () => {
    const tags = [...tagFilters, tagRef.current.value];

    tagRef.current.value = '';
    setTagFilters(tags);
  }

  const handleIngredientDelete = (ingredient) => {
    const ingredients = ingredientFilters.filter((name) => {
        return name !== ingredient
    });

    setIngredientFilters(ingredients);
  }

  const getUniqueListBy = (arr, key) => {
      return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  const filterRecipes = () => {
    const tempArray = [];
    let toBeRemoved;

    if (additionalFilter === "include-any") {
      recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          if (ingredientFilters.includes(ingredient)) {
            tempArray.push(recipe)
          }
        })
      });
    } else {
      recipes.forEach((recipe) => {
        toBeRemoved = false;
        recipe.ingredients.forEach((ingredient) => {
          if (!ingredientFilters.includes(ingredient)) {
            console.log('it aint in here')
            toBeRemoved = true;
          }
        })

        !toBeRemoved && tempArray.push(recipe);
      });
    }

    setFilteredRecipes(getUniqueListBy(tempArray, 'name'));
  }

  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h1" color="inherit" noWrap>
            Mix Me A Drink
          </Typography>
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
          <Grid container spacing={2} justify="center">
            <Grid item>
              <RadioGroup row aria-label="Additional filter options" name="other-filter" value={additionalFilter} onChange={updateAdditionalFilter}>
                <FormControlLabel value="include-any" control={<Radio />} label="Include recipes with any of the following ingredients" />
                <FormControlLabel value="include-only" control={<Radio />} label="Include recipes wtih only the following ingredients" />
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid container spacing={2} justify="center">
              <Grid item>
                <TextField
                  id="ingredient-filter"
                  label="Ingredient"
                  variant="outlined"
                  inputRef={ingredientRef} />
                  <Button
                    className={classes.filterButton}
                    variant="outlined"
                    color="primary"
                    onClick={() => updateIngredients()}>
                    Add
                  </Button>
              </Grid>
          </Grid>
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
          {/* End hero unit */}
          <Grid container spacing={4}>
            {filteredRecipes.map((recipe, idx) => (
              <Grid item key={idx} xs={12} sm={8} md={4}>
                <DrinkCard {...recipe} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </div>
  );
}
