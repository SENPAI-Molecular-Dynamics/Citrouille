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

    // Add click event listener to compute node
    newNode.addEventListener('click', () => {
      const nodeText = newNode.textContent.trim();
      const logMessage = `Clicked compute node: ${nodeText}\n`;
      logContainer.textContent += logMessage;
      logContainer.scrollTop = logContainer.scrollHeight;
    });

    // Append the new compute node to the list
    computeNodesList.appendChild(newNode);

    // Log the addition of the compute node
    const logMessage = `Added compute node: ${hostname}:${port} (${name})\n`;
    logContainer.textContent += logMessage;
    logContainer.scrollTop = logContainer.scrollHeight;
  });
});
