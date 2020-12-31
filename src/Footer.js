import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import WhiteTextTypography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Toolbar from "@material-ui/core/Toolbar";
import "./Footer.css";
import popcorn from "./popcorn.png";

function Copyright() {
  return (
    <WhiteTextTypography variant="body2" align="center">
      <Link color="inherit" href="https://jennyz.dev/">
        here
      </Link>{' '}
    </WhiteTextTypography>
  );
}

export default function Footer(props) {
  return (
    <>
      <div class="info">
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Thanks for checking this out!
        </Typography>
        <WhiteTextTypography variant="subtitle1" align="center" component="p">
          Feel free to learn more about me
        </WhiteTextTypography>
        <Copyright />
      </Container>
      </div>
      <div class="background">
        <Toolbar>
          <img src={popcorn}></img>
        </Toolbar>
      </div>
</>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
