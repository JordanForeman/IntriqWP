var topRange      = 60,  // measure from the top of the viewport to X pixels down
    edgeMargin    = 20,   // margin above the top or margin from the end of the page
    animationTime = 1200, // time in milliseconds
    contentTop    = [];

$(document).ready(function(){ 

  if ($(window).scrollTop > $('header').height())
  {
    $('#sidebar').addClass('fixed');
  }

  $('.flexslider').flexslider({
    controlNav: false
  });

  $('ul.skills li button').click(function(){
    $('ul.skills .skill-desc').html($(this).data('desc')).show();
  });

  // Stop animated scroll if the user does something
  $('html,body').bind('scroll mousedown DOMMouseScroll mousewheel keyup', 
    function(e){
      if ( e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel' ){
      $('html,body').stop();
    }
  });

  // Set up content an array of locations
  $('nav ul.nav').find('li a').each(
    function(){
      contentTop.push( $( $(this).attr('href') ).offset().top );
    }
  );

  // Animate menu scroll to content
  $('#sidebar').find('section').click(
    function(){
      var sel = this,
      newTop = Math.min( contentTop[ $('nav ul.nav li a').index( $(this) ) ], $(document).height() - $(window).height() );
      console.log(newTop);
      
      // get content top or top position if at the document bottom
      $('html,body').stop().animate({ 'scrollTop' : newTop }, animationTime, 
        function(){
          window.location.hash = $(sel).attr('href');
          if (!$('#sidebar').hasClass('fixed'))
            $('#sidebar').addClass('fixed');
        }
      );
      
      return false;
  })

  // adjust side menu
  var lastScrollTop = 0;
  $(window).scroll(
    function()
    {
      var winTop    = $(window).scrollTop(),
          bodyHt    = $(document).height(),
          vpHt      = $(window).height() + edgeMargin;  // viewport height + margin

      // Use a 50px buffer either way to provide accurate scroll attachment
      if (winTop < $('header').height() + 50 && winTop > $('header').height() - 50)
      {
        if (winTop > lastScrollTop)
        {
          $('#sidebar').addClass('fixed');
          $('.scrollTop').addClass('shown');
        }
        else
        { 
          $('#sidebar').removeClass('fixed');
          $('.scrollTop').removeClass('shown');
        }
      }

      lastScrollTop = winTop;

      $.each( contentTop, 
        function(i,loc){
        if ( ( loc > winTop - edgeMargin && ( loc < winTop + topRange || ( winTop + vpHt ) >= bodyHt ) ) )
          $('nav ul.nav li').removeClass('active').eq(i).addClass('active');
        }
      )
    }
  )
})