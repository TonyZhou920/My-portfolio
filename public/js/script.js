
'use strict';

/**
 * Handle mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const body = document.querySelector('body');
let headerBtnClicked = false;

document.querySelector('#menu-icon').addEventListener('click', e => {
  !headerBtnClicked ? body.style.transform = 'translateX(300px)' : body.style.transform = 'translateX(0px)';
  return headerBtnClicked = !headerBtnClicked;
});
//Create Error function 
function Error() {
  const errorInfo = document.querySelector('.errorInfo');
  if (errorInfo.style.display === "none") {
    errorInfo.style.display = "block";
  } else {
    errorInfo.style.display = "none";
  }
}