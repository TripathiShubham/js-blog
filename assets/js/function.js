(function() {
    var isOpen = false;

    function showSideNav() {
        isOpen = true;
        document.getElementById("nav-ul").style.transform = 'translateX(0px)';
        document.getElementsByClassName("overlay")[0].classList.add("opened");
        document.getElementById("body").style.overflowY = 'hidden';
    }

    function hideSideNav() {
        if(isOpen) {
            document.getElementById("nav-ul").style.transform = 'translateX(-365px)';
            isOpen = false;
            document.getElementsByClassName("overlay")[0].classList.remove("opened");
            document.getElementById("body").style.overflowY = 'auto';
          }
    }

    function initialize() {
        var event = setEventListners();
        event.setClickEventById("menu", showSideNav);
        event.setClickEventById("body", hideSideNav)
        setIntersectionObserver();
    }

    initialize();

    function setIntersectionObserver() {
        document.addEventListener("DOMContentLoaded", function() {
            var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
          
            if ("IntersectionObserver" in window) {
              let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                  if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                    lazyImage.onload = function() {
                        lazyImage.classList.remove("lazy");
                    }
                  }
                });
              });
          
              lazyImages.forEach(function(lazyImage) {
                lazyImageObserver.observe(lazyImage);
              });
            } else {
              // Possibly fall back to a more compatible method here
            }
          });
    }

    function setEventListners() {
        return {
            setClickEventById: function(id, callback) {
                document.getElementById(id).addEventListener("click", callback);
            }
        }
    }
})()