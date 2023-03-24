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
  if(action.type === 'UPDATE_TASK'){
    return state.map(task => {
      if(task.id === action.task.id){
        return action.task;
      }
      return task;
    })
  }
  if(action.type === 'DESTROY_TASK'){
    return state.filter(_task => _task.id !== action.task.id)
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

export const updateTask = (task) => {
  return async(dispatch) => {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    dispatch({ type: 'UPDATE_TASK', task: response.data});
  }
}

export const destroyTask = (task) => {
  return async(dispatch) => {
    await axios.delete(`/api/tasks/${task.id}`);
    dispatch({ type: 'DESTROY_TASK', task});
  }
}


export default store;
