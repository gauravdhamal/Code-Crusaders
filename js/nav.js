document.querySelector(".open-btn").addEventListener("click", function(){
    document.querySelector(".mobileMenu").classList.toggle("show")
    // console.log("hi");
 });
 document.querySelector(".menu-close").addEventListener("click", function () {
    document.querySelector(".mobileMenu").classList.toggle("show")
    // console.log("hi");
 });


   $(window).scroll(function () {
      $('.fixed-navbar').toggleClass('scrolled', $(this).scrollTop() > 100);
   });
