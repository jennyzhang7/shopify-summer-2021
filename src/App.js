import React, { useEffect, useState } from "react";
import {
  TextField,
  Layout,
  Page,
  Icon,
  Card,
  List,
  Banner,
  Spinner,
  Button,
} from "@shopify/polaris";
// import Button from "@material-ui/core/Button";
import { SearchMinor } from "@shopify/polaris-icons";
import Confetti from "react-confetti";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MaterialUICard from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function App() {
  const url = new URL(window.location.href);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations")) || []
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const searchValue = url.searchParams.get("search");
    if (searchValue) {
      fetchMovies(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = (movieName) => {
    setLoading(true);
    setSearchTitle(movieName);
    fetch(
      `https://www.omdbapi.com/?s=${movieName}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        url.searchParams.set("search", movieName);
        window.history.pushState("", "The Shoppies", url.href);
        setLoading(false);
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
      nominations.length === 5 ||
      nominations.some((nomination) => nomination.imdbID === movie.imdbID)
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();
  return (
    <Page title="The Shoppies">
      <Layout>
        <Layout.Section
          title="Style"
          description="Customize the style of your checkout"
        >
          {nominations.length >= 5 && (
            <>
              {/* <Confetti /> */}
              <Banner title="YAY YOU HAVE 5 NOMINATIONS" status="success" />
              <div className={classes.root}>
                <Grid container spacing={3}>
                  {nominations.map((nomination, idx) => (
                    <Grid item xs>
                      <MaterialUICard className={classes.root}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            width="140"
                            image={nomination.Poster}
                          />
                          <CardContent>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {nomination.Title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {nomination.Year}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </MaterialUICard>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </>
          )}
        </Layout.Section>
        <Layout.Section title="Search" description="Search for movies">
          <Card sectioned>
            <div onKeyPress={handleKeyPress}>
              <TextField
                onChange={(change) => {
                  setSearchFieldValue(change);
                }}
                label="Movie title"
                value={searchFieldValue}
                prefix={<Icon source={SearchMinor} color="inkLighter" />}
                clearButton
                onClearButtonClick={() => setSearchFieldValue("")}
                placeholder="Search"
              />
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card
            title={
              searchTitle.length > 0
                ? `Results for "${searchTitle}"`
                : "Please search for a movie title and press 'Enter'"
            }
          >
            <div className="listItem">
              <Card.Section>
                {loading ? (
                  <Spinner
                    accessibilityLabel="Spinner example"
                    size="large"
                    color="teal"
                  />
                ) : (
                  <List type="bullet">
                    {results.map((movie) => (
                      <List.Item key={movie.imdbID}>
                        {movie.Title} ({movie.Year}){" "}
                        <Button
                          size="slim"
                          disabled={shouldBeDisabled(movie)}
                          onClick={() => nominateMovie(movie)}
                        >
                          Nominate
                        </Button>
                        {/* <Button variant="contained" color="primary">
                          Nominate
                        </Button> */}
                      </List.Item>
                    ))}

                    {searchTitle.length > 0 &&
                      results.length === 0 &&
                      "No results found."}
                  </List>
                )}
              </Card.Section>
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card title="Nominations">
            <Card.Section>
              <List type="bullet">
                {nominations.map((nomination, idx) => (
                  <List.Item key={nomination.imdbID}>
                    {nomination.Title} ({nomination.Year}){" "}
                    <Button size="slim" onClick={() => removeMovie(idx)}>
                      Remove
                    </Button>
                  </List.Item>
                ))}
                {nominations.length === 0 &&
                  "Your nominations will appear here."}
              </List>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
