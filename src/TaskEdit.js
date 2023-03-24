import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from './store';
import { useParams, useNavigate } from 'react-router-dom';

const TaskEdit = () => {
    const { id } = useParams();
    const { tasks } = useSelector(state => state);
    const [name, setName] = useState('');
    const [isComplete, setIsComplete] = useState('');
    const [priority, setPriority] = useState(5);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const task = tasks.find(task => task.id === id)


    useEffect(() => {
        // const task = tasks.find(task => task.id === id);
        if(task){
            setName(task.name);
            setIsComplete(task.isComplete);
            setPriority(task.priority);
        }
    }, [tasks])

    if(!task){
        return null;
    }

    const update = async(ev) => {
        ev.preventDefault();
        try{
            await dispatch(updateTask({ name, id, isComplete, priority }));
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }

    const priorities = [];
    for(let i = 1; i <= 20; i++){
        priorities.push(i);
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

            <select value = {priority} onChange={ev => setPriority(ev.target.value)}>
            {
                priorities.map( p => {
                    return(
                        <option key = { p }>{ p }</option>
                    )
                })
            }
            
            </select>

            <button>Update</button>
        </form>
        </>
    )
};

export default TaskEdit;
