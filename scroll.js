document.querySelector('.container1').addEventListener('click',function(){
    document.querySelector('.hidden0').style.display = 'block';
    document.querySelector('.hidden1').style.display = 'none';
    document.querySelector('.hidden2').style.display = 'none';
    document.querySelector('.hidden3').style.display = 'none';
    document.querySelector('.wish').textContent = "";
})

document.querySelector('.container2').addEventListener('click',function(){
    document.querySelector('.hidden1').style.display = 'block';
    document.querySelector('.hidden0').style.display = 'none';
    document.querySelector('.hidden2').style.display = 'none';
    document.querySelector('.hidden3').style.display = 'none';
    document.querySelector('.wish').textContent = "";
})

document.querySelector('.container3').addEventListener('click',function(){
    document.querySelector('.hidden0').style.display = 'none';
    document.querySelector('.hidden1').style.display = 'none';
    document.querySelector('.hidden2').style.display = 'block';
    document.querySelector('.hidden3').style.display = 'none';
    document.querySelector('.wish').textContent = "";
    
})
document.querySelector('.container4').addEventListener('click',function(){
    document.querySelector('.hidden0').style.display = 'none';
    document.querySelector('.hidden1').style.display = 'none';
    document.querySelector('.hidden3').style.display = 'block';
    document.querySelector('.hidden2').style.display = 'none';
    document.querySelector('.wish').textContent = "";
})
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)

btnsOpenModal[i].addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});