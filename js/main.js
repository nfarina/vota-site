---
---

// FORM INPUT BEHAVIOR

var input = document.querySelector("input[type='tel']");

if (input && input.value) {
  input.classList.add('filled');
} // for Firefox that keeps form input values on reload

input.addEventListener('blur', function() {
  if (input && input.value) {
    input.classList.add('filled');
  }
  else {
    input.classList.remove('filled');
  }
});

// CLEAR ERROR STATE WHEN CLICKING INPUTS

input.addEventListener('click', function() {
    input.classList.remove('error');
});

input.addEventListener('keyup', function() {
    input.classList.remove('error');
});
