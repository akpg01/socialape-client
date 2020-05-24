import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";

// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux stuf
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThis,
});

export class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      laoding: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <img src={AppIcon} alt="monkey" className={classes.image} />
            <Typography variant="h2" className={classes.pageTitle}>
              Sign Up
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                className={classes.textField}
                value={this.state.emai}
                error={errors.email ? true : false}
                onChange={this.handleChange}
                helperText={errors.email}
                fullWidth
              />
              <TextField
                id="password"
                type="password"
                label="Password"
                name="password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange}
                error={errors.password ? true : false}
                helperText={errors.password}
                fullWidth
              />
              <TextField
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                className={classes.textField}
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword}
                fullWidth
              />
              <TextField
                id="handle"
                type="text"
                label="Handle"
                name="handle"
                className={classes.textField}
                value={this.state.handle}
                onChange={this.handleChange}
                error={errors.handle ? true : false}
                helperText={errors.handle}
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
              >
                Sign Up
                {loading && (
                  <CircularProgress size={20} className={classes.progress} />
                )}
              </Button>
              <br />
              <small>
                Already have an account? <Link to="/login"> Log In </Link>
              </small>
            </form>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(Signup)
);
