document.querySelector(".bios").addEventListener("click", function () {
  document.querySelector(".bio").style.display = "block";
  document.querySelector(".upload").style.display = "none";
  document.querySelector(".password").style.display = "none";
  document.querySelector(".social").style.display = "none";
  document.querySelector(".achievement").style.display = "none";
});
document.querySelector(".uploads").addEventListener("click", function () {
  document.querySelector(".bio").style.display = "none";
  document.querySelector(".upload").style.display = "block";
  document.querySelector(".password").style.display = "none";
  document.querySelector(".social").style.display = "none";
  document.querySelector(".achievement").style.display = "none";
});
document.querySelector(".passwords").addEventListener("click", function () {
  document.querySelector(".bio").style.display = "none";
  document.querySelector(".upload").style.display = "none";
  document.querySelector(".password").style.display = "block";
  document.querySelector(".social").style.display = "none";
  document.querySelector(".achievement").style.display = "none";
});
document.querySelector(".socials").addEventListener("click", function () {
  document.querySelector(".bio").style.display = "none";
  document.querySelector(".upload").style.display = "none";
  document.querySelector(".password").style.display = "none";
  document.querySelector(".social").style.display = "block";
  document.querySelector(".achievement").style.display = "none";
});
document.querySelector(".achievement").addEventListener("click", function () {
  document.querySelector(".bio").style.display = "block";
  document.querySelector(".upload").style.display = "none";
  document.querySelector(".password").style.display = "none";
  document.querySelector(".social").style.display = "none";
  document.querySelector(".achievement").style.display = "block";
});

var menu = document.querySelector(".menu");
var ham = document.querySelector(".ham");
var body = document.querySelector("body");
var wrong = document.querySelector(".wrong");

menu.addEventListener("click", () => {
  menu.style.display = "none";
  ham.style.display = "block";
});
wrong.addEventListener("click", () => {
  ham.style.display = "none";
  menu.style.display = "block";
});
