const articleTitle = $(".blog-title")[0];
const articleContent = $(".blog-content")[0];
const authorImg = $('.author_img img')[0];
const authorName = $('.author_name')[0];
const articleDate = $('.article_date')[0];
const articleTag = $('.tagsList')[0];
const monthList = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

let model = {
    getArticleById: function (id) {
        return fetch('/api/get/article?id=' + id)
    }
}

let view = {
    init: function (id) {
        controller.getArticleById(id)
            .then((response) => {
                return response.json();
            }).then((response) => {
                articleTitle.innerHTML = document.title = response[0].title;
                articleContent.innerHTML = response[0].content;
                authorImg.setAttribute("src", response[0].authorImgUrl);
                authorName.innerHTML = response[0].authorName;
                let date = new Date(response[0].creation_date);
                articleDate.innerHTML = date.getDate() + "  " + monthList[date.getMonth()] + ", " + date.getFullYear() + " - " + response[0].readTime + " min read"
                let tags = response[0].tags;
                for(let i=0; i<tags.length; i++) {
                  let tagSpan = $(`<span onclick="view.searchByTag('${tags[i]}')" class="tag_span pointer"></span>`)[0];
                  tagSpan.innerText = tags[i];
                  articleTag.appendChild(tagSpan);
                }
                hideSpinner();
                view.setIntersectionObserver();
            });
    },
    searchByTag: function(search) {
      window.location.href = location.origin + "/search?search=" + search;
    },
    setDisqus: function (id) {
        var disqus_config = function () {
            this.page.url = window.location.origin;
            this.page.identifier = id;
        };
        (function () { // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://jsblog-4.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
    },
    setIntersectionObserver: function() {
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
    }
}

let controller = {
    init: function () {
        var id = new URL(window.location.href).searchParams.get("id");
        view.init(id);
        view.setDisqus(id);
    },
    getArticleById: function (id) {
        return model.getArticleById(id);
    }
}

controller.init();