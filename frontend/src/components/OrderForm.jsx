// TodoForm.js

import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from './Button';

const TodoForm = ({ setTodos, fetchData }) => {
    const [newTodo, setNewTodo] = useState({
        'body': ''
    })

    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value
        }))
    }

    const postTodo = async () => {
        try {
            await axios.post(`http://ec2-174-129-60-54.compute-1.amazonaws.com:8000/api/todo/`, newTodo)
            setNewTodo({ 'body': '' })
            setTodos(prevTodos => [...prevTodos, newTodo])
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <input
                type="text"
                placeholder="Add Order"
                value={newTodo.body}
                className="w-full max-w-xs px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        postTodo();
                    }
                }}
            />
            <Button
                onClick={postTodo}
                label="Add"
                className="ml-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white focus:outline-none"
            />
        </>
    )
}

TodoForm.propTypes = {
    setTodos: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
};

export default TodoForm;
