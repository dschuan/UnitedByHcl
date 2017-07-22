import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { PageHeader, Jumbotron, Grid, Form, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom';

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      validate:null,
      password:'',
      redirect: false

    };
  }

  redirect(){
    if(this.state.redirect){
      return <Redirect to='/'/>
    }
  }
  onSubmit(e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();
    const username = this.username.value.trim();
    const profile = {type:'contributor'};


    if (password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters long',
                            validate: false});
    }

    Meteor.call('userExists', username, (err, res) => {
      if (err) {
        this.setState(
          {error: err,
          validate: false}
        );
      }
    });
    if(this.state.validate === null){


      Meteor.call('adduser', {username, email, password, profile}, (err, res) => {
        if (err) {
          console.log(err);
          this.setState({error: err.reason});
        } else {
          this.setState({error: ''});
        }
      });
      setTimeout(() => { this.setState({redirect: true})}, 1000);
    }
  }

  getValidationState(){
    if(this.state.validate) {
      return 'success';
    } else if (this.state.validate === null) {
      return null;
    }
    else { return 'error'};
  }

  getPasswordValidity(){
    if(this.state.password.length > 8) {
      return 'success'
    } else if(this.state.password.length === 0) {
      return null;
    } else {
      return 'error'
    }
  }

  handlePassChange(e){
      this.setState({
        password: e.target.value
      })
  }

  render() {
    return (
      <Jumbotron>
          <PageHeader>Join REPPO</PageHeader>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} >
            <FormGroup validationState={this.getValidationState()} controlId='formUsername'>
            <ControlLabel>Username here</ControlLabel>
            <FormControl
              type='text'
              placeholder='Enter the username you want'
              inputRef={(ref) => {this.username = ref}}/>
            </FormGroup>

            <FormGroup validationState={this.getPasswordValidity()} controlId='formPassword'>
              <ControlLabel>Password here </ControlLabel>
              <FormControl
                type='password'
                placeholder='Enter your password'
                value={this.state.password}
                onChange={this.handlePassChange.bind(this)}
                inputRef={(ref) => {this.password = ref}}/>
            </FormGroup>

            <FormGroup controlId='email'>
              <ControlLabel> Email address here </ControlLabel>
              <FormControl
                type='text'
                placeholder='foo@bar.com'
                inputRef={(ref) => {this.email = ref}} />
            </FormGroup>

            <Button bsStyle='success' block type='submit'>Create Account</Button>
          </form>
          <hr />
          <Link to='/login'><Button bsStyle='primary' bsSize='small'> Have an account?</Button></Link>
          {this.redirect()}
      </Jumbotron>
    );
  }

}
