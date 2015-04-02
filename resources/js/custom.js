$(document).ready(function() {

  // WOW.JS ANIMATION AND TRIGGER
  // -----------------------------------------
  var wow = new WOW(
    {
      boxClass:     'wow',
      animateClass: 'animated',
      offset:       0,
      mobile:       false
    }
  );
  new WOW().init();


  // VIDEO POPUP
  // -----------------------------------------
  $('.popup-video').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false,

    iframe: {
      markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
              '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

      patterns: {
        youtube: {
          index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

          id: 'v=', // String that splits URL in a two parts, second part should be %id%
          // Or null - full URL will be returned
          // Or a function that should return %id%, for example:
          // id: function(url) { return 'parsed id'; } 

          src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
        },
        vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1'
        },
        gmaps: {
          index: '//maps.google.',
          src: '%id%&output=embed'
        }
      },

      srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
    }
  });


  // GOOGLE MAPS
  // -----------------------------------------
  // Enable the viual refresh
  google.maps.visualRefresh = true;
  var myLatlng = new google.maps.LatLng(37.788149,-122.4071);
  var map;
  var grayStyles = [
      {
      featureType: "all",
      stylers: [
        // Change map sytles here
        { saturation: -30 },
        { lightness: 30 }
      ]
      },
   ];
  function initialize() {
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(37.788149,-122.4071),
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
    },
    zoomControl: true,
    scrollwheel: false,
    panControl: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      styles: grayStyles,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Name of Location"
    });
  }

  google.maps.event.addDomListener(window, 'load', initialize);


  // Misc
  // ----------------------------------------- 
  // Responsive Navigation collapse auto hide once list item is selected
  if ($(window).width()<=767) {

    $("body").on("click", ".navbar-collapse a", function() {
      var $this = $(this);

      setTimeout(function() {
        $this.closest(".navbar-collapse").collapse('hide');
      }, 250);
    });
  }

  // Tooltip
  $('.info-tooltip').tooltip();

  
  // Contact Form Validations
  // ----------------------------------------- 
  // Validation Form with AJAX while typing for inputs
  $('input').bind('input propertychange', function() {
    $(this).parent().find('.error').remove();
    $(this).parent().find('.valid').remove();
      if( $(this).attr('id') === 'email' ){
        var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if ($(this).val() === "" || $(this).val() === " ") {
          $(this).after("<span class='error'></span>");
          $(this).parent().find('.error').fadeIn('slow');
        } else if (!checkEmail.test($(this).val())) {
          $(this).after("<span class='error'></span>");
          $(this).parent().find('.error').fadeIn('slow');
        } else {
          $(this).after("<span class='valid'></span>");
          $(this).parent().find('.valid').fadeIn('slow');
        }
        } else {
        if($(this).val() === "" || $(this).val() === " "){
          $(this).after("<span class='error'></span>");
          $(this).parent().find('.error').fadeIn('slow');
        } else {
          $(this).after("<span class='valid'></span>");
          $(this).parent().find('.valid').fadeIn('slow');
        }
      }
  });


  // Validation Form with AJAX on Submit 
  $('#submit').click(function(){
    $('span.error').fadeOut('slow');
    $('span.valid').fadeOut('slow');
    $('#thanks').hide();
    $('#error').hide();
    $('#timedout').hide();
    $('#state').hide();
    
    var error = false;
    
    var name = $('#name').val();
    if(name === "" || name === " ") {
      $('#name').after("<span class='error'></span>");
      $('#name').parent().find('.error').fadeIn('slow');
      error = true;
    } else {
      $('#name').after("<span class='valid'></span>");
      $('#name').parent().find('.valid').fadeIn('slow');
    }
    
    var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $('#email').val();
    if (email === "" || email === " ") {
      $('#email').after("<span class='error'></span>");
      $('#email').parent().find('.error').fadeIn('slow');
      error = true;
    } else if (!checkEmail.test(email)) {
      $('#email').after("<span class='error'></span>");
      $('#email').parent().find('.error').fadeIn('slow');
      error = true;
    } else {
      $('#email').after("<span class='valid'></span>");
      $('#email').parent().find('.valid').fadeIn('slow');
    }
    
    var message = $('#message').val();
    if(message === "" || message === " ") {
      $('#message').after("<span class='error'></span>");
      $('#message').parent().find('.error').fadeIn('slow');
      error = true;
    } else {
      $('#message').after("<span class='valid'></span>");
      $('#message').parent().find('.valid').fadeIn('slow');
    }
    
    if(error === true) {
      $('#error').fadeIn('slow');
      setTimeout(function() {
          $('#error').fadeOut('slow');
      }, 3000);
      return false;
    }
    
    var data_string = $('#contact-form').serialize();
    
    $.ajax({
      type: "POST",
      url: "sendMail.php",
      data: {name:name,email:email,message:message},
      timeout: 6000,
      error: function(request,error) {
        if (error === "timeout") {
          $('#timedout').fadeIn('slow');
          setTimeout(function() {
              $('#timedout').fadeOut('slow');
          }, 3000);
        }
        else {
          $('#state').fadeIn('slow');
          $("#state").html('The following error occured: ' + error + '');
          setTimeout(function() {
              $('#state').fadeOut('slow');
          }, 3000);
        }
      },
      success: function() {
        $('span.valid').remove();
        $('#thanks').fadeIn('slow');
        $('input').val('');
        $('textarea').val('');
        setTimeout(function() {
            $('#thanks').fadeOut('slow');
        }, 3000);
      }
    });
    
    return false;
  });
}); // End $(document).ready(function()



$(window).load(function(){

  // Sticky navigation
  $('.my-sticky-element').waypoint('sticky', {
    stuckClass: 'stuck',
    offset: 0,
  });

  $(window).resize(function() {

    // Responsive Navigation collapse auto hide after window has been resized.
    if ($(window).width()<=767) {

      $("body").on("click", ".navbar-collapse a", function() {
        var $this = $(this);

        setTimeout(function() {
          $this.closest(".navbar-collapse").collapse('hide');
        }, 250);
      });
    }

    // Scrollspy
    $('body').scrollspy({ target: '.navbar' });

    $('[data-spy="scroll"]').each(function () {
        var $spy = $(this).scrollspy('refresh');
    });
  });
});