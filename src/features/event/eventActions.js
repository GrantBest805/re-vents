import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockApi';

export const createEvent = event => ({
	type: CREATE_EVENT,
	payload: {
		event,
	},
});

export const updateEvent = event => ({
	type: UPDATE_EVENT,
	payload: {
		event,
	},
});

export const deleteEvent = eventId => ({
	type: DELETE_EVENT,
	payload: {
		eventId,
	},
});

export const loadEvents = () => {
	return async dispatch => {
		try {
			dispatch(asyncActionStart());
			const events = await fetchSampleData();
			dispatch({ type: FETCH_EVENTS, payload: { events } });
			dispatch(asyncActionFinish());
		} catch (error) {
			console.error(error);
			dispatch(asyncActionError());
		}
	};
};
