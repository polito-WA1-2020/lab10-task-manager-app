import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from'react-bootstrap/Button';
import Alert from'react-bootstrap/Alert';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../auth/AuthContext'

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', submitted: false};
    }

    onChangeUsername = (event) => {
        this.setState({username : event.target.value});
    }; 
    
    onChangePassword = (event) => {
        this.setState({password : event.target.value});
    };
    
    handleSubmit = (event, onLogin) => {
        event.preventDefault();
        onLogin(this.state.username,this.state.password);
        this.setState({submitted : true});
    }

    render() {
        if (this.state.submitted)
            return <Redirect to='/' />;
        return(
            <AuthContext.Consumer>
                {(context) => (
                <>
                <Container fluid>
                    <Row>
                        <Col>
                            <h2 className="ui teal image header">
                                <svg className="bi bi-check-all" width="30" height="30" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z" clipRule="evenodd"/>
                                    <path d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"/>
                                </svg>  
                                <div className="content">
                                    Log-in to your account
                                </div>
                            </h2>

                            <Form method="POST" onSubmit={(event) => this.handleSubmit(event, context.loginUser)}>
                                <Form.Group controlId="username">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="E-mail" value = {this.state.username} onChange={(ev) => this.onChangeUsername(ev)} required autoFocus/>
                                </Form.Group>

                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" value = {this.state.password} onChange={(ev) => this.onChangePassword(ev)} required/>
                                </Form.Group>

                                <Button variant="primary" type="submit">Login</Button>

                            </Form>

                            {context.authErr && 
                            <Alert variant= "danger">
                                {context.authErr.msg}
                            </Alert>
                            }
                        </Col>
                    </Row>
                </Container>
                </>
                )}
            </AuthContext.Consumer>

        );
    }


}

export default LoginForm;