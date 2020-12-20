import React, { useState } from "react";
import {
  TextField,
  Button,
  Layout,
  Page,
  Icon,
  Card,
  List,
  Banner,
  Spinner,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

export default function App() {
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [results, setResults] = useState([]);
  const [nominations, setNominations] = useState(JSON.parse(localStorage.getItem('nominations')) || []);
  const [loading, setLoading] = useState(false);
  const fetchMovies = (movieName) => {
    setLoading(true);
    setSearchTitle(movieName);
    fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.Search) {
          setResults(data.Search);
        } else {
          setResults([])
        }
      });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchMovies(searchFieldValue);
    }
  };

  const nominateMovie = (movie) => {
    const { Title, Year, imdbID } = movie;
    const newNominations = [...nominations, { Title, Year, imdbID }];
    setNominations(newNominations);
    localStorage.setItem('nominations', JSON.stringify(newNominations));
  };

  const removeMovie = (idx) => {
    setNominations(
      nominations.filter((_, nominationIdx) => nominationIdx !== idx)
    );
  };

  const shouldBeDisabled = (movie) => {
    return nominations.length === 5 || nominations.some((nomination) => nomination.imdbID === movie.imdbID);
  };

  return (
    <Page title="The Shoppies">
      <Layout>
        <Layout.Section
          title="Style"
          description="Customize the style of your checkout"
        >
          {nominations.length >= 5 && (
            <Banner title="YAY YOU HAVE 5 NOMINATIONS" status="success" />
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
          <Card title={searchTitle.length > 0 ? `Results for "${searchTitle}"` : "Please search for a movie title and press 'Enter'"}>
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
                    </List.Item>
                  ))}
                  {searchTitle.length > 0 && results.length === 0 && "No results found."}
                </List>
              )}
            </Card.Section>
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
                {nominations.length === 0 && "Your nominations will appear here."}
              </List>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
