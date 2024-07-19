import { SET_LOADING, SET_NAVIGATION } from '../../actions/authActions';

const initialState = {
    loading: false,
    navigationPath: '/',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_NAVIGATION:
            return {
                ...state,
                navigationPath: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;

