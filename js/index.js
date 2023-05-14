(function($) {

    "use strict";


    /*------------------------------------------
        = ALL ESSENTIAL FUNCTIONS
    -------------------------------------------*/

    // Toggle mobile navigation
    function toggleMobileNavigation() {
        let navbar = $(".navigation-holder");
        let openBtn = $(".navbar-header .open-btn");
        let closeBtn = $(".navigation-holder .close-navbar");
        let body = $(".page-wrapper");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
                body.addClass("body-overlay");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            body.removeClass("body-overlay");
            return false;
        })
    }

    toggleMobileNavigation();


    // Function for toggle class for small menu
    function toggleClassForSmallNav() {
        let windowWidth = window.innerWidth;
        let mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        let windowWidth = window.innerWidth;
        let mainNav = $(".navigation-holder");
        let smallNav = $(".navigation-holder > .small-nav");
        let subMenu = smallNav.find(".sub-menu");
        let megamenu = smallNav.find(".mega-menu");
        let menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                let $this = $(this);
                $this.siblings().slideToggle();
                e.preventDefault();
                e.stopImmediatePropagation();
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                let height = $(this).position().top;
                let resize = height - $(window).scrollTop();
                let doParallax = -(resize / 5);
                let positionValue = doParallax + "px";
                let img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

    // SLIDER
    let menu = [];
    jQuery('.swiper-slide').each(function(index) {
        menu.push(jQuery(this).find('.slide-inner').attr("data-text"));
    });
    let interleaveOffset = 0.5;
    let swiperOptions = {
        loop: true,
        speed: 1000,
        parallax: true,
        autoplay: {
            delay: 6500,
            disableOnInteraction: false,
        },
        watchSlidesProgress: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        on: {
            progress: function() {
                let swiper = this;
                for (const element of swiper.slides) {
                    let slideProgress = element.progress;
                    let innerOffset = swiper.width * interleaveOffset;
                    let innerTranslate = slideProgress * innerOffset;
                    element.querySelector(".slide-inner").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },

            touchStart: function() {
                let swiper = this;
                for (const element of swiper.slides) {
                    element.style.transition = "";
                }
            },

            setTransition: function(speed) {
                let swiper = this;
                for (const element of swiper.slides) {
                    element.style.transition = speed + "ms";
                    element.querySelector(".slide-inner").style.transition =
                        speed + "ms";
                }
            }
        }
    };

    let swiper = new Swiper(".swiper-container", swiperOptions);

    // DATA BACKGROUND IMAGE
    let sliderBgSetting = $(".slide-bg-image");
    sliderBgSetting.each(function(indx) {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });



    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();

            });
        }
    }




    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.site-header .navigation').length) {
        cloneNavForSticyMenu($('.site-header .navigation'), "sticky-header");
    }

    let lastScrollTop = '';

    function stickyMenu($targetMenu, $toggleClass) {
        let st = $(window).scrollTop();
        let mainMenuTop = $('.site-header .navigation');

        if ($(window).scrollTop() > 1000) {
            if (st > lastScrollTop) {
                // hide sticky menu on scroll down
                $targetMenu.removeClass($toggleClass);

            } else {
                // active sticky menu on scroll up
                $targetMenu.addClass($toggleClass);
            }

        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;
    }



    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/
    if ($("#contact-form-main").length) {
        $("#contact-form-main").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

                subject: {
                    required: true
                }

            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email address",
                phone: "Please enter your phone number",
                subject: "Please select your contact subject"
            },

            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "mail-contact.php",
                    data: $(form).serialize(),
                    success: function() {
                        $("#loader").hide();
                        $("#success").slideDown("slow");
                        setTimeout(function() {
                            $("#success").slideUp("slow");
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $("#loader").hide();
                        $("#error").slideDown("slow");
                        setTimeout(function() {
                            $("#error").slideUp("slow");
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }



    /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    $(".site-footer .lower-footer").append("<a href='#' class='back-to-top'><i class='ti-arrow-up'></i></a>");

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })



    /*==========================================================================
        WHEN DOCUMENT LOADING
    ==========================================================================*/
    $(window).on('load', function() {

        preloader();

        toggleMobileNavigation();

        smallNavFunctionality();

    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

        if ($(".site-header").length) {
            stickyMenu($('.site-header .navigation'), "sticky-on");
        }
    });


    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {

        toggleClassForSmallNav();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            smallNavFunctionality();
        }, 200));

    });



})(window.jQuery);