import { getInitialData } from '../utils/api'
import { receiveUsers } from './users'
import { receiveTweets } from './tweets'
import { setAuthedUser } from './authedUser'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
        .then(({users, tweets}) => {
            dispatch(receiveTweets(tweets))
            dispatch(receiveUsers(users))
            dispatch(setAuthedUser(AUTHED_ID))
        })
    }
}