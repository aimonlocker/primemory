$(document).ready(function() {
    // Manage AOS
    function manageAOS() {
        if ($(window).width() >= 1024) {
            AOS.init({ duration: 800 });
        } else {
            AOS.refresh();
            $('[data-aos]').removeAttr('data-aos');
        }
    }

    // Manage Tab Content
    function manageTabContent() {
        if ($(window).width() >= 1024) {
            $('.tab-content').hide();
        } else {
            $('.tab-content').show();
        }
    }

    // Update Active Link
    function updateActiveLink() {
        $('.btn-fade').removeClass('link-active');
        $('.tab-content.active').each(function() {
            const activeId = $(this).attr('id');
            $('.btn-fade[href="#' + activeId + '"]').addClass('link-active');
        });
    }

    // Handle Button Clicks
    function handleButtonClick() {
        $('.btn-left').off('click').click(function(e) {
            e.preventDefault();
            const target = $(this).attr('href');
            $('.tab-content').removeClass('active').hide();
            $(target).addClass('active').show();
            updateActiveLink();
            $('#slide-container').css('left', '-100%'); // Slide to the left
        });
    }

    // Manage Slick Slider
    var slickInitialized1 = false; // Flag for first structure
    var originalHTML1 = $('.sslider').html(); // Save original HTML for first structure
    var slickInitialized2 = false; // Flag for second structure
    var originalHTML2 = $('.sslider2').html(); // Save original HTML for second structure

    function manageSlick() {
        if ($(window).width() <= 1023) {
            if (!slickInitialized1) {
                $('.sslider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    dots: true,
                });
                slickInitialized1 = true; // Set flag to true
            }
            if (!slickInitialized2) {
                $('.sslider2').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    dots: true,
                });
                slickInitialized2 = true; // Set flag to true
            }
        } else {
            if (slickInitialized1) {
                $('.sslider').slick('unslick'); // Destroy Slick
                $('.sslider').html(originalHTML1); // Restore original HTML
                slickInitialized1 = false; // Reset flag
            }
            if (slickInitialized2) {
                $('.sslider2').slick('unslick'); // Destroy Slick
                $('.sslider2').html(originalHTML2); // Restore original HTML
                slickInitialized2 = false; // Reset flag
            }
        }
    }

    // Initial Function Calls
    manageAOS();
    manageTabContent();
    handleButtonClick();
    manageSlick();
    updateActiveLink();

    // Single Resize Handler
    $(window).resize(function() {
        manageAOS();
        manageTabContent();
        manageSlick();
        if ($(window).width() <= 1023) {
            $('#slide-container').css('left', '0'); // Reset left position
        }
    });

    // Handle Slide Back Button
    $('.btn-right').click(function() {
        $('#slide-container').css('left', '0'); // Slide back to the right
    });

    // Handle .btn-fade Clicks
    $('.btn-fade').click(function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('.tab-content').removeClass('active').hide();
        $(target).addClass('active').show();
        updateActiveLink();
    });

    // Initial call to set the active link based on the initial active tab
    updateActiveLink();

    // Counter Animation
    let hasAnimated = false; // Flag to check if animation has been triggered
    $('#tab-2').click(function() {
        if (!hasAnimated) {
            hasAnimated = true;
            $('.counter').each(function() {
                var $this = $(this);
                var countTo = parseInt($this.attr('data-count'));
                $this.text(0); // Start from 0
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        }
    });

    // Combined Scroll Event for Header Transparency and Active Anchor Highlighting
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop();
        var offset = 10; // Adjust this value as needed for better accuracy
        
        // Header Transparency
        if (scrollPos > 50) {
            $('header').removeClass('transparent').addClass('opaque');
        } else {
            $('header').removeClass('opaque').addClass('transparent');
        }

        // Highlight Active Anchor
        $('header ul a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            
            // Check if the scroll position is within the element's bounds, with an offset
            if (refElement.position().top - offset <= scrollPos && 
                refElement.position().top + refElement.outerHeight() > scrollPos) {
                $('header ul a').removeClass("anchor");
                currLink.addClass("anchor");
            } else {
                currLink.removeClass("anchor");
            }
        });
    });

    // Open the popup when the button is clicked
    $('#openPopup').click(function(e) {
        $('#myPopup').css('display', 'flex').hide().fadeIn();
        e.preventDefault();
    });

    // Close the popup when the close button is clicked
    $('#closePopup').click(function() {
        $('#myPopup').fadeOut();
    });

    // Close the popup when clicking outside of the popup content
    $(window).click(function(event) {
        if ($(event.target).is('#myPopup')) {
            $('#myPopup').fadeOut();
        }
    });
});
