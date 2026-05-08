const buttons = document.querySelectorAll('.button');
const body = document.querySelector('body');

buttons.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    console.log(e);
    console.log(e.target);

    //using if else condition:

    // if (e.target.id === 'grey') {
    //   body.style.backgroundColor = e.target.id;
    // }
    // if (e.target.id === 'white') {
    //   body.style.backgroundColor = e.target.id;
    // }
    // if (e.target.id === 'blue') {
    //   body.style.backgroundColor = e.target.id;
    // }
    // if (e.target.id === 'yellow') {
    //   body.style.backgroundColor = e.target.id;
    // }
    // if (e.target.id === 'purple') {
    //   body.style.backgroundColor = e.target.id;
    // }

    //using switch case:

    const color = e.target.id;

    switch (color) {
      case 'grey':
        body.style.background = 'linear-gradient(135deg, #1e293b, #0f172a)';
        break;

      case 'white':
        body.style.background = 'linear-gradient(135deg, #cbd5e1, #64748b)';
        break;

      case 'blue':
        body.style.background = 'linear-gradient(135deg, #1e3a8a, #0f172a)';
        break;

      case 'yellow':
        body.style.background = 'linear-gradient(135deg, #78350f, #451a03)';
        break;

      case 'purple':
        body.style.background = 'linear-gradient(135deg, #4c1d95, #2e1065)';
        break;

      default:
        console.log('Default color: ', color);
    }
  });
});
