import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { config } from '../../src/firebase.config'

firebase.initializeApp(config);

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export { firestore }
