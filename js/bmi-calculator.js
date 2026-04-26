const myForm = document.querySelector('form');

myForm.addEventListener('submit', function (e) {
  e.preventDefault(); //stop default actions

  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);
  const results = document.querySelector('#results');

  const message = document.querySelector('#message');

  if (height === '' || height < 0 || isNaN(height)) {
    results.innerHTML = `Please enter a valid height ${height}`;
  } else if (weight === '' || weight < 0 || isNaN(weight)) {
    results.innerHTML = `Please enter a valid weight ${weight}`;
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    //show the result
    results.innerHTML = `<span>${bmi}</span>`;

    //show the message
    const bmiValue = parseFloat(bmi);

    if (bmiValue < 18.6) {
      message.innerHTML = 'You are Underweight';
      message.style.color = 'red';
    } else if (bmiValue >= 18.6 && bmiValue <= 24.9) {
      message.innerHTML = 'You are in normal renge';
      message.style.color = 'green';
    } else {
      message.innerHTML = 'You are over weight';
      message.style.color = 'orange';
    }
  }
});
