import { LOGIN, LOGOUT } from "./authActions"


const initialstate = {
    token: "",
    user: null
}

const authReducer = (state = initialstate, action: any) => {
    switch (action.type) {
        case LOGIN: return { ...state, token: action.payload.token, user: action.payload.user }
        case LOGOUT: return { token: "", user: null }
        default: return state
    }

}

export default authReducer