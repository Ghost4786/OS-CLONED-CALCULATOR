import './style.css'

const historyEl = document.getElementById('history');
const currentInputEl = document.getElementById('currentInput');
const scientificPanel = document.getElementById('scientificPanel');
const toggleSciBtn = document.getElementById('toggle-sci');

let currentExpression = '';
let lastResult = '';
let isScientificOpen = false;
let isResultDisplayed = false;

// Initialize display
const updateDisplay = () => {
  currentInputEl.textContent = currentExpression || '0';
  historyEl.textContent = lastResult ? `Ans = ${lastResult}` : '';
  
  if (isResultDisplayed) {
    currentInputEl.classList.add('result');
  } else {
    currentInputEl.classList.remove('result');
  }

  // Improved Font scaling for full-screen display
  const len = currentInputEl.textContent.length;
  if (len > 12) {
    currentInputEl.style.fontSize = '2.5rem';
  } else if (len > 9) {
    currentInputEl.style.fontSize = '3rem';
  } else if (len > 6) {
    currentInputEl.style.fontSize = '4rem';
  } else {
    currentInputEl.style.fontSize = '5rem';
  }
};

// Math functions mapping
const mathFuncs = {
  sin: (x) => Math.sin(x * Math.PI / 180),
  cos: (x) => Math.cos(x * Math.PI / 180),
  tan: (x) => Math.tan(x * Math.PI / 180),
  log: (x) => Math.log10(x),
  ln: (x) => Math.log(x),
  sqrt: (x) => Math.sqrt(x),
  fact: (n) => {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }
};

// Expression Evaluator
const evaluateExpression = (expr) => {
  try {
    let processedExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, Math.PI.toString())
      .replace(/e/g, Math.E.toString());

    processedExpr = processedExpr.replace(/(\d+)\^(\d+)/g, 'Math.pow($1, $2)');
    processedExpr = processedExpr.replace(/sin\(/g, 'mathFuncs.sin(');
    processedExpr = processedExpr.replace(/cos\(/g, 'mathFuncs.cos(');
    processedExpr = processedExpr.replace(/tan\(/g, 'mathFuncs.tan(');
    processedExpr = processedExpr.replace(/log\(/g, 'mathFuncs.log(');
    processedExpr = processedExpr.replace(/ln\(/g, 'mathFuncs.ln(');
    processedExpr = processedExpr.replace(/sqrt\(/g, 'mathFuncs.sqrt(');

    const result = new Function('mathFuncs', `return ${processedExpr}`)(mathFuncs);
    
    if (isNaN(result) || !isFinite(result)) return 'Error';
    
    const res = Number(parseFloat(result.toFixed(10)));
    return res.toString().length > 15 ? res.toExponential(4) : res;
  } catch (err) {
    console.error(err);
    return 'Error';
  }
};

// Event Listeners
document.querySelectorAll('button[data-val]').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-val');
    
    if (isResultDisplayed) {
      if (!['+', '−', '×', '÷', '^', 'fact'].includes(val)) {
        currentExpression = '';
      }
      isResultDisplayed = false;
    }

    if (currentExpression === 'Error') currentExpression = '';

    if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt'].includes(val)) {
      currentExpression += val + '(';
    } else if (val === 'pow') {
      currentExpression += '^';
    } else if (val === 'fact') {
      currentExpression += '!';
    } else {
      currentExpression += val;
    }
    updateDisplay();
  });
});

document.getElementById('btn-clear').addEventListener('click', () => {
  currentExpression = '';
  lastResult = '';
  isResultDisplayed = false;
  updateDisplay();
});

document.getElementById('btn-delete').addEventListener('click', () => {
  if (isResultDisplayed) {
    isResultDisplayed = false;
    currentExpression = '';
  } else if (currentExpression === 'Error') {
    currentExpression = '';
  } else {
    const funcs = ['sin(', 'cos(', 'tan(', 'log(', 'sqrt('];
    let deleted = false;
    for (const f of funcs) {
      if (currentExpression.endsWith(f)) {
        currentExpression = currentExpression.slice(0, -f.length);
        deleted = true;
        break;
      }
    }
    if (!deleted) currentExpression = currentExpression.slice(0, -1);
  }
  updateDisplay();
});

document.getElementById('btn-sign')?.addEventListener('click', () => {
  if (!currentExpression || currentExpression === 'Error') return;
  isResultDisplayed = false;
  
  const lastNumMatch = currentExpression.match(/(-?\d+\.?\d*)$/);
  if (lastNumMatch) {
    const lastNum = lastNumMatch[0];
    const toggledNum = lastNum.startsWith('-') ? lastNum.slice(1) : '-' + lastNum;
    currentExpression = currentExpression.slice(0, -lastNum.length) + toggledNum;
  } else if (!/[+\-×÷/(^]/.test(currentExpression.slice(-1))) {
    currentExpression = currentExpression.startsWith('-') ? currentExpression.slice(1) : '-' + currentExpression;
  }
  updateDisplay();
});

document.getElementById('btn-equals').addEventListener('click', () => {
  if (!currentExpression || isResultDisplayed) return;
  
  let exprToEval = currentExpression;
  if (exprToEval.includes('!')) {
    exprToEval = exprToEval.replace(/(\d+)!/g, 'mathFuncs.fact($1)');
  }

  const result = evaluateExpression(exprToEval);
  lastResult = result.toString();
  currentExpression = lastResult;
  isResultDisplayed = true;
  updateDisplay();
});

// Scientific Toggle
toggleSciBtn.addEventListener('click', () => {
  isScientificOpen = !isScientificOpen;
  scientificPanel.classList.toggle('active', isScientificOpen);
  toggleSciBtn.classList.toggle('active', isScientificOpen);
});

// Keyboard support
window.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[0-9]/.test(key)) currentExpression += key;
  if (key === '.') currentExpression += '.';
  if (key === '+') currentExpression += '+';
  if (key === '-') currentExpression += '−';
  if (key === '*') currentExpression += '×';
  if (key === '/') currentExpression += '÷';
  if (key === '(') currentExpression += '(';
  if (key === ')') currentExpression += ')';
  if (key === 'Enter' || key === '=') document.getElementById('btn-equals').click();
  if (key === 'Backspace') document.getElementById('btn-delete').click();
  if (key === 'Escape') document.getElementById('btn-clear').click();
  updateDisplay();
});

updateDisplay();
