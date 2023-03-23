import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Tasks = ()=> {
  const { tasks } = useSelector(state => state);
  return (
    <ul>
      {
        tasks.map( task => {
          return (
            <li key={ task.id }>
              <Link to={`/tasks/${task.id}`}>{ task.name }</Link>
            </li>
          );
        })
      }
    </ul>
  );
};

export default Tasks;
