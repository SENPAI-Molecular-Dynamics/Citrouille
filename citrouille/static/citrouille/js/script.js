document.addEventListener('DOMContentLoaded', () => {
  // Handles logging
  function updateLogs(log) {
    const logItem = document.createElement('div');
    logItem.textContent = log;
    logContainer.appendChild(logItem);
    logContainer.scrollTop = logContainer.scrollHeight;
  }

  // Check if a compute node with the same address and port exists
  function isDuplicateNode(hostname, port) {
    const nodes = Array.from(document.querySelectorAll('.compute-node'));
    return nodes.some((node) => {
      const [existingHostname, existingPort] = node.textContent.split(':');
      return existingHostname.trim() === hostname && existingPort.trim() === port;
    });
  }

  // Validate the hostname field
  function isValidHostname(hostname) {
    const hostnameRegex = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)*[a-zA-Z]{2,}$/;
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return hostnameRegex.test(hostname) || ipv4Regex.test(hostname);
  }

  // Validate the port field
  function isValidPort(port) {
    const portNumber = parseInt(port, 10);
    return Number.isInteger(portNumber) && portNumber > 0 && portNumber <= 65535;
  }

  // Get the form and button elements
  const addNodeForm = document.querySelector('.add-node-form');
  const addButton = addNodeForm.querySelector('button[type="submit"]');
  const computeNodesList = document.querySelector('.compute-nodes');
  const logContainer = document.querySelector('.log-container');

  // Add event listener for form submission
  addNodeForm.addEventListener('submit', (e) => {
    // Prevent form submission
    e.preventDefault();

    // Get the input values
    const hostname = document.getElementById('node-hostname').value.trim();
    const port = document.getElementById('node-port').value.trim();
    const name = document.getElementById('node-name').value.trim();

    // Clear the input fields
    document.getElementById('node-hostname').value = '';
    document.getElementById('node-port').value = '';
    document.getElementById('node-name').value = '';

    // Validate the input fields
    if (!isValidHostname(hostname)) {
      updateLogs('Invalid hostname or IP address');
      return;
    }

    if (!isValidPort(port)) {
      updateLogs('Invalid port');
      return;
    }

    // Check for duplicate nodes
    if (isDuplicateNode(hostname, port)) {
      updateLogs('Node with the same address and port already exists');
      return;
    }

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
});
