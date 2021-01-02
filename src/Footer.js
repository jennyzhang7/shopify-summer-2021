import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import WhiteTextTypography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Toolbar from "@material-ui/core/Toolbar";
import "./Footer.css";
import popcorn from "./popcorn.png";

export default function Footer(props) {
  return (
    <footer>
      <div className="info">
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Thanks for checking this out!
          </Typography>
          <WhiteTextTypography variant="subtitle1" align="center" component="p">
            Feel free to learn more about me{" "}
            <Link href="https://jennyz.dev/">here</Link>
          </WhiteTextTypography>
        </Container>
      </div>
      <div className="background">
        <Toolbar>
          <img src={popcorn} alt="popcorn"></img>
        </Toolbar>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
