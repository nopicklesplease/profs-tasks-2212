import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';

const tasks = (state = [], action)=> {
  if(action.type === 'SET_TASKS'){
    return action.tasks;
  }
  if(action.type === 'CREATE_TASK'){
    return [...state, action.task];
  }
  return state;
};

const reducer = combineReducers({
  tasks
});

const store = createStore(reducer, applyMiddleware(logger, thunk));

export const fetchTasks = ()=> {
  return async(dispatch)=> {
    const response = await axios.get('/api/tasks');
    dispatch({ type: 'SET_TASKS', tasks: response.data });
  };
};

export const createTask = (task)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/tasks', task);
    dispatch({ type: 'CREATE_TASK', task: response.data });
  };
};

export default store;
