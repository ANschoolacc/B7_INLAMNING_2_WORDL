
document.querySelector('.filters').addEventListener('submit', (e) => {
  e.preventDefault();
  setParams(e.target.elements.lengthOption.value, e.target.elements.uniqueOption.checked)
})

function setParams(length, unique) {
  let urlParams = new URLSearchParams();
  if (length) {
    urlParams.set('word_length', length);
  }
  if (unique) {
    urlParams.set('unique_letters', unique)
  }
  window.location.href = window.location.pathname + '?' + urlParams.toString();
}

