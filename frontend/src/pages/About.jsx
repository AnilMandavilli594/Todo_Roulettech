const About = () => {
  return (
    <div className="max-w-4xl text-black mx-auto my-8 p-4">
      <h1 className="text-3xl font-bold mb-4">About Our Order Management Application</h1>
      <p className="text-lg mb-4">
        Welcome to our Order Management Application! This application is designed to streamline your order processing and improve operational efficiency. 
        With a user-friendly interface and essential features, it simplifies order management and enhances productivity.
      </p>
      <h2 className="text-2xl font-bold mb-3">Key Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">
          <strong>Add Orders:</strong> Easily add new orders with a simple input form. Keep track of all your orders in one place.
        </li>
        <li className="mb-2">
          <strong>Edit Orders:</strong> Update order details effortlessly. Edit order information directly from the order list.
        </li>
        <li className="mb-2">
          <strong>Delete Orders:</strong> Remove orders that are no longer needed. Keep your order list clean and organized.
        </li>
        <li className="mb-2">
          <strong>Order Status:</strong> Mark orders as completed, pending, or cancelled. Visual indicators show the status of each order.
        </li>
        <li className="mb-2">
          <strong>Overview:</strong> Get a quick overview of your orders, including the total number of orders, completed orders, and pending orders.
        </li>
        <li className="mb-2">
          <strong>Sort by Name and Date:</strong> Sort your orders alphabetically by customer name or by date created for better organization.
        </li>
        <li className="mb-2">
          <strong>Responsive Design:</strong> The application is designed to be responsive and works seamlessly on different devices.
        </li>
      </ul>
      <h2 className="text-2xl font-bold mb-3">How to Use</h2>
      <ol className="list-decimal list-inside mb-4">
        <li className="mb-2">
          Start by adding new orders using the input form and the <span className="text-black font-bold">Add Order</span> button at the top of the order list.
        </li>
        <li className="mb-2">
          View your orders in the list. Use the status indicators to manage and track order progress.
        </li>
        <li className="mb-2">
          Edit order details by clicking the edit icon next to the order. A modal will appear where you can update order information.
        </li>
        <li className="mb-2">
          Delete orders by clicking the delete icon next to the order. The order will be removed from your list.
        </li>
        <li className="mb-2">
          Check the overview section to see a summary of your orders and their current status.
        </li>
      </ol>
      <p className="text-lg mb-4">
        This application aims to provide a simple and efficient way to manage your orders. We hope you find it useful and it helps you streamline your operations effectively.
      </p>
      <p className="text-lg mb-4">
        If you have any questions or feedback, feel free to reach out to us. Thank you for using our Order Management Application!
      </p>
      <br />
    </div>
  );
};

export default About;
