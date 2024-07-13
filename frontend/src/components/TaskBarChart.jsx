import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskBarChart = ({ todos }) => {
  const doneTasks = todos.filter(todo => todo.completed).length;
  const incompleteTasks = todos.length - doneTasks;

  const data = {
    labels: ['Completed', 'Incomplete'],
    datasets: [
      {
        label: 'Tasks',
        data: [doneTasks, incompleteTasks],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
        max: todos.length,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

TaskBarChart.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TaskBarChart;
