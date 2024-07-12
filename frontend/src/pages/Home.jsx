import PropTypes from 'prop-types';
import Table from '../components/Table';

const Home = ({ todos, isLoading, setTodos }) => {
  return (
    <div className="container mx-auto p-4">
      <Table todos={todos} isLoading={isLoading} setTodos={setTodos} />
    </div>
  );
};

Home.propTypes = {
  todos: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setTodos: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default Home;
