import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { openModal } from '../modals/modalActions';
import { logout } from '../auth/authActions'

const actions = {
	openModal,
	logout,
};

const mapState = state => ({
	auth: state.auth,
});

class NavBar extends Component {

	handleSignedIn = () => {
		this.props.openModal('LoginModal');
	};

	handleRegister = () => {
		this.props.openModal('RegisterModal');
	};

	handleSignedOut = () => {
		this.props.logout()
		this.props.history.push('/');
	};

	render() {
		const { auth } = this.props;
		const authenticated = auth.authenticated;
		return (
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item as={Link} to='/' header>
						<img src='/assets/logo.png' alt='logo' />
						Crew-Up
					</Menu.Item>
					<Menu.Item as={NavLink} exact to='/events' name='Jobs' />
					<Menu.Item as={NavLink} to='/test' name='Test' />
					{authenticated && <Menu.Item as={NavLink} to='/users' name='Users' />}
					{authenticated && (
						<Menu.Item>
							<Button
								as={Link}
								to='/createEventForm'
								floated='right'
								positive
								inverted
								content='Create Event'
							/>
						</Menu.Item>
					)}

					{authenticated ? (
						<SignedInMenu signOut={this.handleSignedOut} currentUser={auth.currentUser} />
					) : (
						<SignedOutMenu signIn={this.handleSignedIn} register={this.handleRegister} />
					)}
				</Container>
			</Menu>
		);
	}
}
export default withRouter(
	connect(
		mapState,
		actions
	)(NavBar)
);
