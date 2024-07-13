import PropTypes from 'prop-types';

const TodoOverview = ({ todos }) => {
  // Calculate total number of tasks
  const totalTasks = todos.length;

  // Calculate number of incomplete tasks
  const incompleteTasks = todos.filter(todo => !todo.completed).length;

  // Calculate number of tasks done
  const tasksDone = todos.filter(todo => todo.completed).length;

  return (
    <div className="mb-4">
      <h2 className="text-xl text-black font-bold mb-2">Order Overview</h2>
      <div className="flex justify-between mb-2">
        <div>
          <p className='text-black'>Total Orders: {totalTasks}</p>
          <p className='text-black'>Incomplete Orders: {incompleteTasks}</p>
          <p className='text-black'>Orders Done: {tasksDone}</p>
        </div>
      </div>
    </div>
  );
};

TodoOverview.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoOverview;
