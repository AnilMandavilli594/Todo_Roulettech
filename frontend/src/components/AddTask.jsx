import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from './ErrorModal';

const AddTask = ({ todos, setTodos }) => {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = async () => {
    if (!task.trim()) {
      setError('Task cannot be empty');
      return;
    }

    // Check for duplicates
    if (todos.some(todo => todo.body.toLowerCase() === task.toLowerCase())) {
      setError('Duplicate task found');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/todo/', { body: task, completed: false });
      setTodos([...todos, response.data]);
      setTask('');
      setError('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setError('');
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="p-2 border border-gray-300 rounded-md flex-1 mr-2"
          placeholder="Add new task"
        />
        <button onClick={handleAddTask} className="p-2 bg-blue-500 text-white rounded-md">
          Add Todo
        </button>
      </div>
      {error && (
        <Modal
          id="error-modal"
          title="Error"
          value={error}
          handleClick={handleCloseModal}
        />
      )}
    </div>
  );
};

AddTask.propTypes = {
  todos: PropTypes.array.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default AddTask;
