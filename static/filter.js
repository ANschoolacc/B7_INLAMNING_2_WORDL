
const showFilter = document.querySelector('.filters__showFilter');
const closeFilter = document.querySelector('.filters__close')
const filterBox = document.querySelector('.filters');

showFilter.addEventListener('click', (e) => {
  const filterBox = document.querySelector('.filters');
  filterBox.style.display = 'flex'
  e.target.style.display = 'none'
})

closeFilter.addEventListener('click', () => {
  filterBox.style.display = 'none'
  showFilter.style.display = 'block'
})

document.querySelector('.filters__form').addEventListener('submit', (e) => {
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

