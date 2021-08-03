import { createStore, combineReducers, applyMiddleware } from 'redux';
import articleReducer from './articles/articleReducer';
import connectedReducer from './connectedReducer/connectedReducer';
import usersReducer from './usersReducer/usersReduser';
import reportReducer from './reportReducer/reportReducer';
import socketReducer from './socketReducer/socketReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    articleReducer,
    connectedReducer,
    usersReducer,
    reportReducer,
    socketReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;