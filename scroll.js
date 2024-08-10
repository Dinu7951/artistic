document.querySelector('.potrait').addEventListener('click',()=>{
  document.querySelector('.container-potrait').style.display = 'block';
  document.querySelector('.sec-box').style.display = 'none';
  document.querySelector('body').style.backgroundColor = '#F1E5D1';
  document.querySelector('.potrait').style.display = 'none';
  document.querySelector('.land').style.display = 'block';

})

document.querySelector('.land').addEventListener('click',()=>{
  document.querySelector('.container-potrait').style.display = 'none';
  document.querySelector('.sec-box').style.display = 'block';
  document.querySelector('body').style.backgroundColor = '#FFDE4D';
   document.querySelector('.land').style.display = 'none';
   document.querySelector('.potrait').style.display = 'block';
})