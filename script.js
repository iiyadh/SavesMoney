let isTimerActive = false;
const confirmBtn = document.querySelector('.action-button');
const timerDisplay = document.querySelector('.time');
const totalBalanceInput = document.querySelector('.p4 input');
const todayBalanceInput = document.querySelector('.p2 input');
const expectedBalanceInput = document.querySelector('.p3 input');
function initializeValues() {
  if (!localStorage.getItem('Expected')) {
    expectedBalanceInput.value = 5;
    localStorage.setItem('Expected', 5);
  } else {
    expectedBalanceInput.value = localStorage.getItem('Expected');
  }
  if (!localStorage.getItem('Total')) {
    totalBalanceInput.value = 0;
    localStorage.setItem('Total', 0);
  } else {
    totalBalanceInput.value = localStorage.getItem('Total');
  }
  const endTime = localStorage.getItem('endTime');
  if (endTime && Date.now() < endTime) {
    isTimerActive = true;
    todayBalanceInput.disabled = true;
    confirmBtn.disabled = true;
  }
}
function pad(num) {
  return num.toString().padStart(2, '0');
}
function handleConfirm() {
  const depositAmount = parseFloat(todayBalanceInput.value);
  if (isNaN(depositAmount) || depositAmount < 5) {
    alert('Minimum deposit amount is $5');
  }
  const newTotal = parseFloat(totalBalanceInput.value) + depositAmount;
  totalBalanceInput.value = newTotal;
  localStorage.setItem('Total', newTotal);
  const newExpected = parseFloat(expectedBalanceInput.value) + 5;
  expectedBalanceInput.value = newExpected;
  localStorage.setItem('Expected', newExpected);
  todayBalanceInput.disabled = true;
  confirmBtn.disabled = true;
  isTimerActive = true;
  const endTime = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem('endTime', endTime);
}
function displayTime() {
  const endTime = localStorage.getItem('endTime');
  if (!endTime) return;

  let counter = endTime - Date.now();
  
  if (counter > 0) {
    isTimerActive = true;
    todayBalanceInput.disabled = true;
    confirmBtn.disabled = true;
    
    const hours = Math.floor(counter / (1000 * 60 * 60));
    const minutes = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((counter % (1000 * 60)) / 1000);
    
    timerDisplay.textContent = `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
  } else {
    isTimerActive = false;
    todayBalanceInput.disabled = false;
    confirmBtn.disabled = false;
    timerDisplay.textContent = '00 : 00 : 00';
    localStorage.removeItem('endTime');
  }
}
confirmBtn.addEventListener('click', handleConfirm);
initializeValues();
setInterval(displayTime, 1000);