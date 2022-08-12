import { combineReducers } from 'redux';
const userConstants = {

    LOGIN: 'USERS_LOGIN',
    LOGOUT: 'USERS_LOGOUT',
    LOADING: 'LOADING'

};

export const userActions = {
    login: (user) => (dispatch) => {
        console.log('dispatch',user);
        dispatch({ type: userConstants.LOGIN, user });
    },
    logout: () => (dispatch) => {
        dispatch({ type: userConstants.LOGOUT });
    },
    loading: (loading) => (dispatch) => {
        dispatch({ type: userConstants.LOADING, loading });
    }
};

const user = null;
const resetState = { loading: false, loggedIn: false };
const initialState = user ? { loading: false, loggedIn: true, isAdmin: user.isAdmin, user, } : { loading: false, loggedIn: false };

export function global(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN:
            return {
                ...state,
                loggedIn: true,
                isAdmin: action.user.isAdmin,
                user: action.user,
            };
        case userConstants.LOGOUT:
            return {
                ...resetState
            };
        case userConstants.LOADING:
            return {
                ...state,
                loading: action.loading
            };
        default:
            return state
    }
}


const rootReducer = combineReducers({
    global
});

// creating Persistor 
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


/// Creating an store
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();


export const store = createStore(
    persistedReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);

export const persistor = persistStore(store)