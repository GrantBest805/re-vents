import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyA0QLDixWcS2W7NIlYRFFAeA_bGq7TYSBM',
	authDomain: 'crew-up-b4bdb.firebaseapp.com',
	databaseURL: 'https://crew-up-b4bdb.firebaseio.com',
	projectId: 'crew-up-b4bdb',
	storageBucket: 'crew-up-b4bdb.appspot.com',
	messagingSenderId: '150257138115',
	appId: '1:150257138115:web:8fde64d94e477a65'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
