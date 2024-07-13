import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import axios from 'axios';
import Modal from './Modal';
import TodoOverview from './OrderOverview';
import TaskBarChart from './TaskBarChart';
import AddTask from './AddOrder';

const Table = ({ todos, isLoading, setTodos }) => {
  const [editText, setEditText] = useState({
    id: '',
    body: ''
  });
  const [sortCriteria, setSortCriteria] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [filterCriteria, setFilterCriteria] = useState('all'); // Filter criteria state
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

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
    setShowSortDropdown(false); // Hide dropdown after selection
  };

  const handleFilter = (criteria) => {
    setFilterCriteria(criteria);
    setShowFilterDropdown(false); // Hide dropdown after selection
  };

  const handleSearch = () => {
    // Perform search logic based on searchQuery
    // This can be done based on todo body, ID, etc.
    // For simplicity, let's filter by todo body containing the search query
    setFilterCriteria('search');
  };

  const sortedTodos = [...todos].sort((a, b) => {
    if (sortCriteria === 'name') {
      return a.body.localeCompare(b.body);
    } else if (sortCriteria === 'date') {
      return new Date(a.created) - new Date(b.created);
    }
    return 0;
  });

  // Filter logic
  let filteredTodos = sortedTodos;
  if (filterCriteria === 'incomplete') {
    filteredTodos = sortedTodos.filter(todo => !todo.completed);
  } else if (filterCriteria === 'done') {
    filteredTodos = sortedTodos.filter(todo => todo.completed);
  } else if (filterCriteria === 'all') {
    filteredTodos = sortedTodos;
  } else if (filterCriteria === 'search') {
    filteredTodos = sortedTodos.filter(todo =>
      todo.body.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Pagination logic
  const todosPerPage = 10;
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <div className="w-3/4">
        <div className="flex justify-between items-center mb-4">
          <AddTask todos={todos} setTodos={setTodos} />
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded-md border border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="p-2 bg-blue-500 text-white rounded-md ml-2">
              Search
            </button>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className={`p-2 bg-blue-500 text-white rounded-md mx-2`}
              >
                Sort
              </button>
              {showSortDropdown && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => handleSort('name')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left`}
                  >
                    Sort by Name
                  </button>
                  <button
                    onClick={() => handleSort('date')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left`}
                  >
                    Sort by Date
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`p-2 rounded-md mx-2`}
              >
                Filter
              </button>
              {showFilterDropdown && (
                <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={() => handleFilter('all')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left`}
                  >
                    All Orders
                  </button>
                  <button
                    onClick={() => handleFilter('incomplete')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleFilter('done')}
                    className={`block px-4 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white w-full text-left`}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <table className="w-full max-w-4xl">
          <thead className="border-b-2 border-black">
            <tr>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">Checkbox</th>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">Orders</th>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">Status</th>
              <th className="p-3 text-sm text-black font-semibold tracking-wide text-left">Ordered Date</th>
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
              currentTodos && currentTodos.length > 0 ? (
                currentTodos.map((todoItem) => (
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
                        {todoItem.completed ? "Done" : "Pending"}
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

        {/* Pagination Controls */}
        <div className="mt-4">
          {filteredTodos.length > todosPerPage && (
            <ul className="flex justify-center">
              {Array.from({ length: Math.ceil(filteredTodos.length / todosPerPage) }).map((_, index) => (
                <li key={index}>
                  <button
                    className={`p-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-1/4 ml-4">
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
