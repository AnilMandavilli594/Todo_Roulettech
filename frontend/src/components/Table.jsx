import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import axios from 'axios';
import Modal from './Modal';
import TodoOverview from './TodoOverview';
import TaskBarChart from './TaskBarChart';
import AddTask from './AddTask';

const Table = ({ todos, isLoading, setTodos }) => {
  const [editText, setEditText] = useState({
    id: '',
    body: ''
  });
  const [sortCriteria, setSortCriteria] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newList = todos.filter(todo => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value);
      const newTodos = todos.map(todo => todo.id === id ? response.data : todo);
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setEditText(prev => ({
      ...prev,
      body: e.target.value
    }));
  };

  const handleClick = () => {
    handleEdit(editText.id, editText);
    setEditText({ id: '', body: '' });
  };

  const handleCheckbox = (id, completed) => {
    handleEdit(id, { completed: !completed });
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.body.localeCompare(b.body);
    } else if (sortCriteria === 'date') {
      return new Date(a.created) - new Date(b.created);
    }
    return 0;
  });

  return (
    <div className="flex">
      <div className="w-3/4">
        <div className="flex justify-between items-center mb-4">
          <AddTask todos={todos} setTodos={setTodos} />
          <div>
            <button onClick={() => handleSort('name')} className="p-2 bg-blue-500 text-white rounded-md mx-2">
              Sort by Name
            </button>
            <button onClick={() => handleSort('date')} className="p-2 bg-blue-500 text-white rounded-md mx-2">
              Sort by Date
            </button>
          </div>
        </div>
        <table className="w-full max-w-4xl">
          <thead className="border-b-2 border-black">
            <tr>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">Checkbox</th>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">To Do</th>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">Status</th>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">Date Created</th>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : (
              sortedTodos && sortedTodos.length > 0 ? (
                sortedTodos.map((todoItem) => (
                  <tr key={todoItem.id} className="border-b border-black">
                    <td className="p-3">
                      <span
                        onClick={() => handleCheckbox(todoItem.id, todoItem.completed)}
                        className="inline-block cursor-pointer"
                      >
                        {todoItem.completed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                      </span>
                    </td>
                    <td className="p-3 text-black text-sm" title={todoItem.id}>
                      {todoItem.body}
                    </td>
                    <td className="p-3 text-sm text-center">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-md ${
                          todoItem.completed ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"
                        }`}
                      >
                        {todoItem.completed ? "Done" : "Incomplete"}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-black font-medium">
                      {new Date(todoItem.created).toLocaleString()}
                    </td>
                    <td className="p-3 text-sm font-medium flex items-center">
                      <label htmlFor="my-modal">
                        <MdEditNote
                          onClick={() => setEditText(todoItem)}
                          className="text-xl cursor-pointer text-blue-600 hover:text-blue-800 focus:outline-none mr-2"
                        />
                      </label>
                      <MdOutlineDeleteOutline
                        onClick={() => handleDelete(todoItem.id)}
                        className="text-xl cursor-pointer text-red-600 hover:text-red-800 focus:outline-none"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No todos found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {editText.id && (
          <Modal
            id="my-modal"
            title="Edit Todo"
            value={editText.body}
            handleChange={handleChange}
            handleClick={handleClick}
          />
        )}
      </div>
      <div className="w-1/4 pl-4">
        <TodoOverview todos={todos} />
        <TaskBarChart todos={todos} />
      </div>
    </div>
  );
};

Table.propTypes = {
  todos: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setTodos: PropTypes.func.isRequired,
};

export default Table;
