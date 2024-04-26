  // First, we select all the elements we'll interact with.
  const output = document.getElementById('output');
  let currentInput = '';
  let previousInput = '';
  let operation = null;

  // A function to update the output display.
  function updateDisplay() {
    output.innerText = currentInput;
  }

  // A function to handle number and dot buttons.
  function appendNumber(number) {
    // Avoid multiple dots
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
  }

  // A function to handle all the operations.
  function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
      compute();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
  }

  // Function to compute the result based on the operation selected.
  function compute() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      case '%':
        computation = prev % current;
        break;
      default:
        return;
    }
    currentInput = computation.toString();
    operation = undefined;
    previousInput = '';
  }

  // Function to clear the output.
  function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay();
  }

  // Function to handle the plus/minus button to toggle between negative and positive values.
  function toggleSign() {
    currentInput = currentInput.charAt(0) === '-' ? currentInput.substr(1) : `-${currentInput}`;
    updateDisplay();
  }

  // Add event listeners to each button.
  document.querySelectorAll('.calculator button').forEach(button => {
    button.addEventListener('click', () => {
      switch (button.innerText) {
        case 'AC':
          clear();
          break;
        case '+/-':
          toggleSign();
          break;
        case '%':
        case '/':
        case '*':
        case '-':
        case '+':
          chooseOperation(button.innerText);
          break;
        case '=':
          compute();
          updateDisplay();
          break;
        default:
          appendNumber(button.innerText);
          break;
      }
    });
  });