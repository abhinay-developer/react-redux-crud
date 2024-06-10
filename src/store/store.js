import { createStore } from "redux";

const intialState = {
    usersList: [],
    loggedInUser: "",
    isLoggedIn: false,
    userDetails: ""
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case "USERS_LIST":
            console.log(action.payload)
            return { ...state, usersList: action.payload }
        case "LOGIN":
            return { ...state, loggedInUser: action.payload }
        case "LOGGED_IN":
            return { ...state, isLoggedIn: action.payload }
        case "CREATE_ACCOUNT":
            return { ...state, usersList: action.payload }
        case "USER":
            return { ...state, userDetails: action.payload }
        case "UPDATE_ACCOUNT":
            return {
                ...state, usersList: state.usersList.map((user) => {
                    if (user.id === action.payload.id) {
                        return {
                            ...user,
                            firstName: action.payload.firstName,
                            lastName: action.payload.lastName,
                            email: action.payload.email,
                            password: action.payload.password,
                            mobileNumber: action.payload.mobileNumber
                        };
                    }
                    return user;
                })
            }
        case "DELETE_ACCOUNT":
            return { ...state, usersList: state.usersList.filter((user) => user.id !== action.payload.id) }
        default:
            return state
    }
}


const store = createStore(reducer);

export default store;