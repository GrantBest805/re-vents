import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';
import { reducer as ToastrReducer } from 'react-redux-toastr';
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
	auth: authReducer,
	async: asyncReducer,
	events: eventReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	form: FormReducer,
	modals: modalReducer,
	test: testReducer,
	toastr: ToastrReducer,
});

export default rootReducer;
