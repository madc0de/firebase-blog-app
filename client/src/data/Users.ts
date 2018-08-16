import { firestore } from './firestore-init';
import { Dispatch } from 'redux'
import { userActions } from '../store/actions'
import { IUser } from '../interface';


interface IUserHandler {
    get(id: string): Promise<IUser | undefined | IError>
}

interface IError {
    message: string
}

class UsersHandler implements IUserHandler {

    constructor(public dispatch: Dispatch) {
    }

    get = async (id: string): Promise<IUser | undefined | IError> => {
        try {
            const ref = firestore.doc(`users/${id}`)
            const docSnapshot = await ref.get()
            if (docSnapshot.exists) {
                const user = docSnapshot.data() as IUser
                this.dispatch(userActions.userAddedAction(user))
                return user
            }
            return undefined
        } catch (err) {
            return {
                message: `error getting post by ID`
            }
        }
    }
}

export default UsersHandler