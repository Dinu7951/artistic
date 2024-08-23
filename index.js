var menu =document.querySelector(".menu");
var ham = document.querySelector(".ham");
var body = document.querySelector("body");
var wrong  = document.querySelector(".wrong");
var head = document.querySelector(".primary-head")


menu.addEventListener('click',()=>{
    menu.style.display = 'none';
    ham.style.display = 'block';
    head.style.display = 'none';
   
})
wrong.addEventListener('click',()=>{
    ham.style.display = 'none';
    menu.style.display = 'block';
    head.style.display = '';
    
})