import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import {
    Col,
    Form,
    FormGroup,
    ControlLabel,
    FormControl,
    Button
} from 'react-bootstrap';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' component={Main}/>
                </div>
            </BrowserRouter>
        );
    }
}

class Main extends Component {

    userData = () => this.generateNames()

    generateNames() {
        const data = [];
        const names = [
            'Mantas',
            'Gintaras',
            'Ernestas',
            'Vitalija',
            'Darius',
            'Julius',
            'Modestas',
            'Ernestas'
        ];
        names.map((name, index) => {
            data.push({
                email: name.toLowerCase() + '@gmail.com',
                password: '123123',
                id: index,
                group: 'I11-2',
                isRegistered: false,
                name: name
            });
        });
        return data;
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            users: this.userData()
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    setRegistered(id) {
        return this.state.users.map((user, index) => {
            if (user.id != id) {
                return user;
            }
            return {
                ...user,
                isRegistered: true
            };
        });
    }

    handleLogin(e) {
        e.preventDefault();
        const users = this.state.users;
        for (var i = 0; i < users.length; i++) {
            if (users[i].email === this.state.email.toLowerCase() && users[i].password == this.state.password) {
                console.log(true);
                this.setState({
                    users: this.setRegistered(users[i].id)
                });
                break;
            }
        }
        console.log(this.state.users);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className='myForm'>
                <Form horizontal onSubmit={this.handleLogin}>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl value={this.state.email} type="email" placeholder="Email" onChange={this.handleEmailChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl value={this.state.password} type="text" placeholder="Password" onChange={this.handlePasswordChange}/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={(event) => this.handleLogin(event)} type="submit">
                                Priregistruoti
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
                <Info users={this.state.users}/>
            </div>

        )
    }
}

class Info extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: this.props.users
        }
    }

    render() {
        const userData = this.props.users.map((user) => {
            return (
                <div key={user.id}>
                    {user.group} {user.name}
                    <span className='registered'>
                        {user.isRegistered && ' prisiregistraves'}
                    </span>
                    <span className='notRegistered'>
                        {!user.isRegistered && ' neprisiregistraves'}
                    </span>
                </div>
            )
        });

        return (
            <div className='myData'>{userData}</div>
        );
    }
}

export default App;
