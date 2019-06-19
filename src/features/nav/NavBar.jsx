import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { openModal } from '../modals/modalActions';

const actions = {
	openModal,
};

const mapState = state => ({
	auth: state.firebase.auth, 
	profile: state.firebase.profile
});

class NavBar extends Component {
	handleSignedIn = () => {
		this.props.openModal('LoginModal');
	};

	handleRegister = () => {
		this.props.openModal('RegisterModal');
	};

	handleSignedOut = () => {
		this.props.firebase.logout();
		this.props.firebase.auth().signOut();
		this.props.history.push('/');
	};

	render() {
		const { auth, profile } = this.props;
		const authenticated = auth.isLoaded && !auth.isEmpty;
		return (
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item as={Link} to='/' header>
						<img src='/assets/logo.png' alt='logo' />
						Crew-Up
					</Menu.Item>
					<Menu.Item as={NavLink} exact to='/events' name='Current Crews' />
					{authenticated && (
						<Fragment>
							<Menu.Item as={NavLink} to='/test' name='Test' />
							<Menu.Item as={NavLink} to='/users' name='Users' />
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
						</Fragment>
					)}
					{authenticated ? (
						<SignedInMenu signOut={this.handleSignedOut} profile={profile} />
					) : (
						<SignedOutMenu signIn={this.handleSignedIn} register={this.handleRegister} />
					)}
				</Container>
			</Menu>
		);
	}
}
export default withRouter(
	withFirebase(
		connect(
			mapState,
			actions
		)(NavBar)
	)
);
