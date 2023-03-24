import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { destroyTask } from './store';

const Tasks = ()=> {
  
  const { tasks } = useSelector(state => state);

  const dispatch = useDispatch();

  const destroy = (task) => {
    dispatch(destroyTask(task));
  }


  return (
    <ul>
      {
        tasks.map( task => {
          return (
            <li key={ task.id }>
              <Link to={`/tasks/${task.id}`} style={{textDecoration: task.isComplete ? 'line-through' : ''}}>{ task.name } </Link> { task.isComplete ? 'complete' : 'incomplete'}

              <button onClick={ ev => destroy(task)}>x</button>
            </li>
          );
        })
      }
    </ul>
  );
};

export default Tasks;
