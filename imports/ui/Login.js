import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { PageHeader, Form, FormControl, FormGroup, ControlLabel, Col, Button, Panel, Grid, Row} from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      redirect: false
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let username = this.username.value.trim();
    let password = this.password.value.trim();

    Meteor.loginWithPassword({username}, password, (err) => {
      if (err) {
        this.setState({error: 'Unable to login. Check username and password.'});
      } else {
        this.setState({error: ''});
        this.setState({redirect: true});
      }
    });
  }
  redirect(){
    if (this.state.redirect) {
      console.log('redirecting');
      return <Redirect to='/' />
    }
  }
  redirect2(){
    if(this.props.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    console.log(this.props);

    return (
      <Grid>
        <Row>
          <Col xs={2} md={4} />
          <Col xs={10} md={6} >
          <PageHeader>REPPO Login
            <hr />
            <small>{this.state.error ? <p>{this.state.error}</p> : undefined}</small>
            </PageHeader>
          </Col>
          <Col xs={2} md={4} />
        </Row>

        <Row>
          <Col xs={2} md={4}></Col>
          <Col xs={10} md={6}>


            <Form horizontal onSubmit={this.onSubmit.bind(this)}>
              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Username
                </Col>
                <Col sm={10}>
                  <FormControl type='text' inputRef={(ref) => {this.username = ref}} placeholder='username' />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type='password' inputRef={(ref) => {this.password = ref}} placeholder='password'/>
                </Col>
              </FormGroup>
              <FormGroup>
              <Col sm= {2} />
              <Button type='submit' block bsStyle='primary'>Login </Button>
              <Col sm = {2} />
              </FormGroup>
            </Form>
            <hr />
            <Link to='/signUp'><Button bsStyle='default'bsSize='small'>Need an account?</Button></Link>
          </Col>
          <Col xs={2} md={4}></Col>
        </Row>
        {this.redirect()};
        {this.redirect2()};
      </Grid>
    );
  }
}

export default createContainer((props) => {
  const authenticated = !!Meteor.user();
  const loggingIn = !Meteor.loggingIn();

  return{
    redirect: (authenticated && loggingIn),
    ...props
  }
}, Login)
