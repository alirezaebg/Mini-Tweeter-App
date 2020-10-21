export const SET_AUTHED_USER = 'SET_AUTED_USER'

export function setAuthedUser (id) {
    return {
        type: SET_AUTHED_USER,
        id,
    }
}

