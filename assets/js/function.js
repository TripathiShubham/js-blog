let isOpen = false;
let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbarHeight = $('header').outerHeight();
const overlay = $(".overlay");
const loginBtn = $(".loginBtn");
const profileBtn = $(".profileBtn");
const profileImg = $(".profile_img");
const profileImgM = $("side-nav .user-img");
const userDetailsDiv = $(".user-details");
const userName = $(".user-name");
const logoutBtn = $(".logoutBtn");
const sideNavOverlay = $('.side-nav-open');

spinner = true;

function showSideNav() {
  isOpen = true;
  document.getElementById("nav-ul").style.transform = 'translateX(0px)';
  document.getElementsByClassName("overlay")[0].classList.add("opened");
  document.getElementById("body").style.overflowY = 'hidden';
  sideNavOverlay.css("display", "block");
}

function hideSideNav() {
  if (isOpen) {
    document.getElementById("nav-ul").style.transform = 'translateX(-365px)';
    isOpen = false;
    document.getElementsByClassName("overlay")[0].classList.remove("opened");
    document.getElementById("body").style.overflowY = 'unset';
    sideNavOverlay.css("display", "none");
  }
}

function toogleUserMenu() {
  $(".user_menu").toggle()
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

function setEventListners() {
  return {
    setClickEventById: function (id, callback) {
      document.getElementById(id).addEventListener("click", callback);
    }
  }
}

function showSpinner() {
  overlay.removeClass("hide");
  spinner = true;
}

function hideSpinner() {
  overlay.addClass("hide");
  spinner = false;
}

function getUser() {
  fetch('/api/get/user')
    .then(response => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(user => {
          loginBtn.css("display", "none");
          profileBtn.css("display", "block");
          profileImgM.css("display", "block");
          userDetailsDiv.css("margin", "16px");
          profileImg.attr("src", user.profile.profilePic);
          profileImgM.attr("src", user.profile.profilePic);
          userName.text(user.profile.name)
          logoutBtn.css("display", "block");
          localStorage.setItem("user", JSON.stringify(user));
        });
      }
    })
}

function search(e) {
  if(e.which == 13) {
    window.location.href = location.origin + "/search?search=" + e.target.value;
  }
}

function viewSearch() {
  $('.srch_input').css('width', '100px');
}

function initialize() {
  var event = setEventListners();
  event.setClickEventById("menu", showSideNav);
  event.setClickEventById("body", hideSideNav);
  event.setClickEventById("userProfilePic", toogleUserMenu);
  $(window).scroll(function () {
    didScroll = true;
  });
  setInterval(function () { 
    if (didScroll && !spinner) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  getUser();
}

initialize();