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