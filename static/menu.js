const menu = document.querySelector('.dropdown');
const menuContent = document.querySelector('.dropdown__content')

menu.addEventListener('click', () => {
  menuContent.style.display = 'block';
})

const onClickOutside = (element) => {
  document.addEventListener('click', e => {
    if (!element.contains(e.target)){
      menuContent.style.display = 'none';
    } ;
  });
};

onClickOutside(menu)