const buttons = document.querySelectorAll('.button');
// console.log(buttons);
const body = document.querySelector('body');

buttons.forEach(function (btn) {
  console.log(btn);
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
        body.style.backgroundColor = color;
        break;

      case 'white':
        body.style.backgroundColor = color;
        break;

      case 'blue':
        body.style.backgroundColor = color;
        break;

      case 'yellow':
        body.style.backgroundColor = color;
        break;

      case 'purple':
        body.style.backgroundColor = color;
        break;

      default:
        console.log('Default color: ', color);
    }
  });
});
