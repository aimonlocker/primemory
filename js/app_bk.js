// Scroll animation
function manageAOS() {
    if ($(window).width() >= 1024) { // Only initialize AOS if width is 1024px or more
        AOS.init({
            duration: 800,
        });
    } else {
        AOS.refresh(); // Refresh AOS if it was previously initialized
        // Optionally, you can disable AOS attributes
        $('[data-aos]').removeAttr('data-aos'); // Remove AOS attributes
    }
}

manageAOS(); // Initial check on page load

$(window).resize(function() {
    manageAOS(); // Check on window resize
});

$(document).ready(function() {
    // Show the first tab content initially
    //$('.tab-content').hide(); // Hide all tab contents
    function manageTabContent() {
        if ($(window).width() >= 1024) { // Check if width is 1024px or above
            $('.tab-content').hide(); // Hide tab content only if the condition is met
        } else {
            $('.tab-content').show(); // Optionally show tab content if below 1024px
        }
    }

    manageTabContent(); // Initial check on page load

    $(window).resize(function() {
        manageTabContent(); // Check on window resize
    });
    $('#tab1').show(); // Show only the first tab content
    $('.btn-fade[href="#tab1"]').addClass('link-active'); // Add .link-active class to the first tab

    // Function to update active link based on active tab
    function updateActiveLink() {
        $('.btn-fade').removeClass('link-active'); // Remove .link-active class from all .btn-fade
        $('.tab-content.active').each(function() {
            const activeId = $(this).attr('id');
            $('.btn-fade[href="#' + activeId + '"]').addClass('link-active'); // Add .link-active class to the corresponding .btn-fade
        });
    }

    // Handle .btn-left clicks
    // $('.btn-left').click(function(e) {
    //     e.preventDefault(); // Prevent default anchor click behavior
    //     const target = $(this).attr('href'); // Get the target tab ID
    //     $('.tab-content').removeClass('active').hide(); // Hide all tab contents
    //     $(target).addClass('active').show(); // Show the target tab content
        
    //     updateActiveLink(); // Update the active link after showing the target tab
    //     $('#slide-container').css('left', '-100%'); // Slide to the left
    // });
    function handleButtonClick() {
        $('.btn-left').click(function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            const target = $(this).attr('href'); // Get the target tab ID
            $('.tab-content').removeClass('active').hide(); // Hide all tab contents
            $(target).addClass('active').show(); // Show the target tab content
            
            updateActiveLink(); // Update the active link after showing the target tab
            $('#slide-container').css('left', '-100%'); // Slide to the left
        });
    }

    $(window).resize(function() {
        if ($(window).width() <= 1023) {
            $('#slide-container').css('left', '0'); // Reset left position
        }
    });

    function manageButtonClick() {
        if ($(window).width() >= 1024) { // Check if width is 1024px or above
            handleButtonClick(); // Attach click handler
        } else {
            $('.btn-left').off('click'); // Remove click handler if below 1024px
        }
    }

    manageButtonClick(); // Initial check on page load

    $(window).resize(function() {
        manageButtonClick(); // Check on window resize
    });

    // Handle slide back button
    $('.btn-right').click(function() {
        $('#slide-container').css('left', '0'); // Slide back to the right
    });

    // Handle .btn-fade clicks
    $('.btn-fade').click(function(e) {
        e.preventDefault(); // Prevent default anchor click behavior
        const target = $(this).attr('href'); // Get the target tab ID
        $('.tab-content').removeClass('active').hide(); // Hide all tab contents
        $(target).addClass('active').show(); // Show the target tab content
        
        updateActiveLink(); // Update the active link after showing the target tab
    });

    // Initial call to set the active link based on the initial active tab
    updateActiveLink();


    let hasAnimated = false; // Flag to check if animation has been triggered

    $('#tab-2').click(function() {
        if (!hasAnimated) { // Check if the animation has not been triggered
            hasAnimated = true; // Set the flag to true
            $('.counter').each(function() {
                var $this = $(this);
                var countTo = parseInt($this.attr('data-count')); // Get the target count from a data attribute
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

    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) { // Change 50 to your desired scroll position
            $('header').removeClass('transparent').addClass('opaque');
        } else {
            $('header').removeClass('opaque').addClass('transparent');
        }
    });

    // Scroll event to highlight the active anchor
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();
        $('header ul a').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            
            // Check if the section is in view
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.outerHeight() > scrollPos) {
                $('header ul a').removeClass("anchor"); // Remove anchor class from all links
                currLink.addClass("anchor"); // Add anchor class to the current link
            } else {
                currLink.removeClass("anchor"); // Remove anchor class if not in view
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

    //Slider
    // Structure 1
    var slickInitialized1 = false; // Flag for first structure
    var originalHTML1 = $('.sslider').html(); // Save original HTML for first structure

    // Structure 2
    var slickInitialized2 = false; // Flag for second structure
    var originalHTML2 = $('.sslider2').html(); // Save original HTML for second structure

    function manageSlick() {
        // Manage first structure
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
        } else {
            if (slickInitialized1) {
                $('.sslider').slick('unslick'); // Destroy Slick
                $('.sslider').html(originalHTML1); // Restore original HTML
                slickInitialized1 = false; // Reset flag
            }
        }

        // Manage second structure
        if ($(window).width() <= 1023) {
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
            if (slickInitialized2) {
                $('.sslider2').slick('unslick'); // Destroy Slick
                $('.sslider2').html(originalHTML2); // Restore original HTML
                slickInitialized2 = false; // Reset flag
            }
        }
    }

    manageSlick(); // Initial check on page load

    $(window).resize(function() {
        manageSlick(); // Check on window resize
    });
});