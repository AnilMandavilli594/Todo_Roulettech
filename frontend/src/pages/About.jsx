
const About = () => {
  return (
    <div className="max-w-4xl text-black mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">About Our Todo Application</h1>
      <p className="text-lg mb-4">
        Welcome to our Todo Application! This application is designed to help you manage your tasks efficiently and keep track of your daily activities. 
        With a user-friendly interface and essential features, it simplifies task management and improves productivity.
      </p>
      <h2 className="text-2xl font-bold mb-3">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">
          <strong>Add Tasks:</strong> Easily add new tasks with a simple input field and button. Keep track of all your tasks in one place.
        </li>
        <li className="mb-2">
          <strong>Edit Tasks:</strong> Update task details effortlessly. Edit the task description directly from the table.
        </li>
        <li className="mb-2">
          <strong>Delete Tasks:</strong> Remove tasks that are no longer needed. Keep your task list clean and organized.
        </li>
        <li className="mb-2">
          <strong>Task Status:</strong> Mark tasks as completed or incomplete using checkboxes. Visual indicators show the status of each task.
        </li>
        <li className="mb-2">
          <strong>Overview:</strong> Get a quick overview of your tasks, including the total number of tasks, number of completed tasks, and number of incomplete tasks.
        </li>
        <li className="mb-2">
          <strong>Sort by Name and Date:</strong> Sort your tasks alphabetically by name or by date created for better organization.
        </li>
        <li className="mb-2">
          <strong>Responsive Design:</strong> The application is designed to be responsive and works seamlessly on different devices.
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-3">How to Use</h2>
      <ol className="list-decimal list-inside mb-4">
        <li className="mb-2">
          Start by adding your tasks using the input field and the <span className="text-black font-bold">Add Todo</span> button at the top of the task table.
        </li>
        <li className="mb-2">
          View your tasks in the table on the left. Use the checkboxes to mark tasks as completed or incomplete.
        </li>
        <li className="mb-2">
          Edit task details by clicking the edit icon next to the task. A modal will appear where you can update the task description.
        </li>
        <li className="mb-2">
          Delete tasks by clicking the delete icon next to the task. The task will be removed from your list.
        </li>
        <li className="mb-2">
          Check the overview section on the right to see the summary of your tasks.
        </li>
      </ol>
      <p className="text-lg mb-4">
        This application aims to provide a simple and efficient way to manage your daily tasks. We hope you find it useful and it helps you stay organized and productive.
      </p>
      <p className="text-lg mb-4">
        If you have any questions or feedback, feel free to reach out to us. Thank you for using our Todo Application!
      </p>
      <br />
    </div>
  );
};

export default About;
