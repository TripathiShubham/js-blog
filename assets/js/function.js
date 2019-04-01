(function () {
  let isOpen = false;
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $('header').outerHeight();

  function showSideNav() {
    isOpen = true;
    document.getElementById("nav-ul").style.transform = 'translateX(0px)';
    document.getElementsByClassName("overlay")[0].classList.add("opened");
    document.getElementById("body").style.overflowY = 'hidden';
  }

  function hideSideNav() {
    if (isOpen) {
      document.getElementById("nav-ul").style.transform = 'translateX(-365px)';
      isOpen = false;
      document.getElementsByClassName("overlay")[0].classList.remove("opened");
      document.getElementById("body").style.overflowY = 'unset';
    }
  }

  function hasScrolled() {
    var st = $(this).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('header').removeClass('nav-down').addClass('nav-up');
      $('#menu').removeClass('nav-down').addClass('nav-up');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('header').removeClass('nav-up').addClass('nav-down');
        $('#menu').removeClass('nav-up').addClass('nav-down');
      }
    }
    lastScrollTop = st;
  }

  function initialize() {
    var event = setEventListners();
    event.setClickEventById("menu", showSideNav);
    event.setClickEventById("body", hideSideNav)
    //setIntersectionObserver();
    $(window).scroll(function () {
      didScroll = true;
    });
    setInterval(function () {
      if (didScroll && !spinner) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);
  }

  initialize();

  function setIntersectionObserver() {
    document.addEventListener("DOMContentLoaded", function () {
      var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

      if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImageObserver.unobserve(lazyImage);
              lazyImage.onload = function () {
                lazyImage.classList.remove("lazy");
              }
            }
          });
        });

        lazyImages.forEach(function (lazyImage) {
          lazyImageObserver.observe(lazyImage);
        });
      } else {
        // Possibly fall back to a more compatible method here
      }
    });
  }

  function setEventListners() {
    return {
      setClickEventById: function (id, callback) {
        document.getElementById(id).addEventListener("click", callback);
      }
    }
  }
})()

const overlay = $(".overlay");
spinner = true;

function showSpinner() {
  overlay.removeClass("hide");
  spinner = true;
}

function hideSpinner() {
  overlay.addClass("hide");
  spinner = false;
}