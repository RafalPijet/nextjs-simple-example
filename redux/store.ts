import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import requestReducer from './reducers/requestReducer';
import launchesReducer from './reducers/launchesReducer';

const rootReducer = combineReducers({
    request: requestReducer,
    launches: launchesReducer
});

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

let composeEnhancers = compose;
if (typeof window !== 'undefined') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    composeEnhancers && composeEnhancers()
));

export default store;