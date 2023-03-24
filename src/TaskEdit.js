import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from './store';
import { useParams, useNavigate } from 'react-router-dom';

const TaskEdit = () => {
    const { id } = useParams();
    const { tasks } = useSelector(state => state);
    const [name, setName] = useState('');
    const [isComplete, setIsComplete] = useState('');
    console.log(tasks, id);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const task = tasks.find(task => task.id === id)


    useEffect(() => {
        // const task = tasks.find(task => task.id === id);
        if(task){
            setName(task.name);
            setIsComplete(task.isComplete);
        }
    }, [tasks])

    if(!task){
        return null;
    }

    const update = async(ev) => {
        ev.preventDefault();
        try{
            await dispatch(updateTask({ name, id, isComplete }));
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <h1>Task { task.name } </h1>
        <p>
            Add a little detail for this task.
        </p>

        <form onSubmit={ update }>

            <input value={ name } onChange={ ev => setName(ev.target.value)}/>

            Complete? <input type='checkbox' checked={ isComplete } onChange={ ev => setIsComplete(ev.target.checked)}/>

            <button>Update</button>
        </form>
        </>
    )
};

export default TaskEdit;
