import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

const MAX_NOMINATIONS = 5;

export default function App() {
  const url = new URL(window.location.href);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations")) || []
  );
  useEffect(() => {
    const searchValue = url.searchParams.get("search");
    if (searchValue) {
      fetchMovies(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = (movieName) => {
    setSearchTitle(movieName);
    fetch(
      `https://www.omdbapi.com/?s=${movieName}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        url.searchParams.set("search", movieName);
        window.history.pushState("", "The Shoppies", url.href);
        if (data.Search) {
          setResults(data.Search);
        } else {
          setResults([]);
        }
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchMovies(searchFieldValue);
    }
  };

  const nominateMovie = (movie) => {
    const { Title, Year, imdbID, Poster } = movie;
    const newNominations = [...nominations, { Title, Year, imdbID, Poster }];
    setNominations(newNominations);
    localStorage.setItem("nominations", JSON.stringify(newNominations));
  };

  const removeMovie = (idx) => {
    const newNominations = nominations.filter(
      (_, nominationIdx) => nominationIdx !== idx
    );
    setNominations(newNominations);
    localStorage.setItem("nominations", JSON.stringify(newNominations));
  };

  const shouldBeDisabled = (movie) => {
    return (
      nominations.length === MAX_NOMINATIONS ||
      nominations.some((nomination) => nomination.imdbID === movie.imdbID)
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 345,
    },
    card: {
      display: "flex",
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 100,
      margin: 10,
      cursor: "pointer",
    },
    media: {
      height: 200,
      width: "100%",
    },
    button: {
      height: 35,
    },
    nominationButton: {
      height: 35,
      marginLeft: "auto",
      marginRight: "auto",
    },
    resultsText: {
      fontSize: 17,
      margin: 10,
    },
    nominateButton: {
      display: "flex",
      height: 20,
      margin: 20,
    },
    banner: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className="banner">
          {nominations.length >= MAX_NOMINATIONS && (
            <>
              <Confetti />
              <Alert className="test" elevation={6} variant="filled" severity="success">
                YAY!! 🥳🥳 You have {MAX_NOMINATIONS} nominations! 🎉🎉
              </Alert>
            </>
          )}
        </div>

        <Grid container spacing={10}>
          <Grid item md={6}>
            <div className="heading">
              <h1>Search</h1>
            </div>
            <Card style={{ marginBottom: 12 }}>
              <div onKeyPress={handleKeyPress}>
                <TextField
                  style={{ margin: 10, width: "96%" }}
                  placeholder="Search Movie Title"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(change) =>
                    setSearchFieldValue(change.target.value)
                  }
                  value={searchFieldValue}
                />
              </div>
            </Card>

            <Card>
              <Typography className={classes.resultsText} gutterBottom>
                {(() => {
                  if (searchTitle.length === 0) {
                    return "Please search for a movie title and press 'Enter'";
                  }
                  if (results.length > 0) {
                    return `Results for "${searchTitle}"`;
                  }
                  return "No results found.";
                })()}
              </Typography>

              {results.map((movie, idx) => (
                <>
                  <Card key={`movie-${idx}`} className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={movie.Poster}
                      title={movie.Title}
                      onClick={() =>
                        window.open(
                          `https://imdb.com/title/${movie.imdbID}`,
                          "_blank"
                        )
                      }
                    />
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography>{movie.Title}</Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {movie.Year}
                        </Typography>
                      </CardContent>
                    </div>
                    <div className={classes.nominateButton}>
                      <Button
                        variant="outlined"
                        size="medium"
                        className={classes.button}
                        disabled={shouldBeDisabled(movie)}
                        onClick={() => nominateMovie(movie)}
                      >
                        Nominate
                      </Button>
                    </div>
                  </Card>
                </>
              ))}
            </Card>
          </Grid>
          <Grid item md={6}>
            <div className="heading">
              <h1>Nominations ({nominations.length} / {MAX_NOMINATIONS})</h1>
            </div>
              <Grid container item xs={12} spacing={3}>
                {nominations.map((nomination, idx) => (
                  <Grid item key={`nomination-${idx}`} xs={12} md={4}>
                    <Card className={classes.root}>
                      <CardActionArea
                        href={`https://imdb.com/title/${nomination.imdbID}`}
                        target="_blank"
                      >
                        <CardMedia
                          className={classes.media}
                          image={nomination.Poster}
                          title={nomination.Title}
                        />
                        <CardContent>
                          <Typography>{nomination.Title}</Typography>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            color="textSecondary"
                          >
                            {nomination.Year}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button
                          color="secondary"
                          size="medium"
                          className={classes.nominationButton}
                          startIcon={<DeleteIcon />}
                          onClick={() => removeMovie(idx)}
                        >
                          Remove
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
