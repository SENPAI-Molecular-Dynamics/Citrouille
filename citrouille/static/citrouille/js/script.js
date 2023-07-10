// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Get the form and button elements
  const addNodeForm = document.querySelector('.add-node-form');
  const addButton = addNodeForm.querySelector('button[type="submit"]');
  const computeNodesList = document.querySelector('.compute-nodes'); // Parent element for event delegation
  const logContainer = document.querySelector('.log-container');

  // Add event listener for form submission
  addNodeForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    // Get the input values
    const hostname = document.getElementById('node-hostname').value;
    const port = document.getElementById('node-port').value;
    const name = document.getElementById('node-name').value;

    // Clear the input fields
    document.getElementById('node-hostname').value = '';
    document.getElementById('node-port').value = '';
    document.getElementById('node-name').value = '';

    // Create a new compute node element
    const newNode = document.createElement('li');
    newNode.textContent = `${hostname}:${port} (${name})`;
    newNode.classList.add('compute-node');

    // Add a click event listener to the new node
    newNode.addEventListener('click', () => {
      updateLogs(`Clicked on compute node: ${name}`);
    });

    // Append the new compute node to the list
    computeNodesList.appendChild(newNode);
    updateLogs(`Added compute node: ${name}`);
  });

  function updateLogs(log) {
    const logItem = document.createElement('div');
    logItem.textContent = log;
    logContainer.appendChild(logItem);
    // Scroll to the bottom of the log container
    logContainer.scrollTop = logContainer.scrollHeight;
  }
});
