import * as firebase from 'firebase/app'

export function getMapKey(obj: Object) {
    return Object.keys(obj)[0]
}

export function getMapValue<T>(obj:Object): T {
    const id = getMapKey(obj)
    return obj[id] as T
}

export function snapshotToMap(snapshot: firebase.firestore.QueryDocumentSnapshot | firebase.firestore.DocumentSnapshot): Object {
    const fields = snapshot.data() 
    return {
        [snapshot.id]: { ...fields }
    }
}