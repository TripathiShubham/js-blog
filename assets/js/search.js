const latestArticle = $(".latest-article")[0];
const searchFor = $('.search_for')[0];
const authorImg = $(".user-img");
const articleUrl = location.origin + "/article";

let model = {
  articles: null,
  init: function () {
  },
  getSearchResult: function (search) {
    return fetch('/api/search/article?search=' + search)
  },
  setArticle: function (articles) {
    this.articles = articles;
  },
  getArticleByIndex: function (index) {
    return this.articles[index];
  }
}

let view = {
  init: function (search) {
    controller.getSearchResult(search)
      .then((response) => {
        return response.json();
      }).then((response) => {
        searchFor.innerText = "Result for " + search;
        if(response.length == 0) {
          latestArticle.innerText = "No result found for " + search;
        } else {
          this.createResult(response);
        }
        hideSpinner();
        view.setIntersectionObserver();
        controller.setArticle(response);
      });
  },
  createResult: function (articlesList) {
    var doc = document.createDocumentFragment();
    for (let i = 0; i < articlesList.length; i++) {
      let containerDiv = $('<div class="container"></div>')[0];
      let articleDetails = $('<div class="article-details wrap-content"></div')[0];
      let articleTitleHTML = `<div class="article-title wrap-content" 
                                    onclick="view.viewArticle(` + i + `)"></div>`
      let articleTitle = $(articleTitleHTML)[0];
      articleTitle.innerHTML = articlesList[i].title;
      let articleContent = $('<div class="article-content wrap-content"></div>')[0];
      articleContent.innerHTML = articlesList[i].viewContent;
      let flex = $('<div class="flex"></div>')[0];
      let flex4 = $('<div class="flex-4"></div')[0];
      let articleAuthor = $('<div class="article-author wrap-content"></div>')[0];
      articleAuthor.innerHTML = articlesList[i].authorName;
      let articleTime = $('<div class="article-time wrap-content"></div>')[0];
      articleTime.innerHTML = articlesList[i].readTime + " min read";
      let flex1 = $('<div class="flex-1"></div')[0];
      let starSpan = $('<span><i class="material-icons">star_border</i></span>')[0];
      flex1.appendChild(starSpan);
      flex4.appendChild(articleAuthor);
      flex4.appendChild(articleTime);
      flex.appendChild(flex4);
      flex.appendChild(flex1);
      articleDetails.appendChild(articleTitle);
      articleDetails.appendChild(articleContent);
      articleDetails.appendChild(flex);
      containerDiv.appendChild(articleDetails);
      let articleImgDiv = $('<div class="article-img-div" onclick="view.viewArticle(' + i + ')"></div>')[0];
      if (articlesList[i].articleImage != undefined) {
        let articleImg = $('<img class="article-img lazy">')[0];
        articleImg.setAttribute('data-src', articlesList[i].articleImage.replace('_small', ''));
        articleImg.setAttribute('src', articlesList[i].articleImage);
        articleImgDiv.appendChild(articleImg);
      }
      containerDiv.appendChild(articleImgDiv);
      if (articlesList[i].articleImage != undefined) {
      }

      doc.appendChild(containerDiv);
    }
    latestArticle.appendChild(doc);
  },
  viewArticle: function (articleId) {
    let article = controller.getArticleByIndex(articleId);
    window.location.href = articleUrl + '?id=' + article._id;
  },
  setIntersectionObserver: function () {
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
    var search = new URL(window.location.href).searchParams.get("search");
    view.init(search);
  },
  getSearchResult: function (search) {
    return model.getSearchResult(search);
  },
  setArticle: function (articles) {
    model.setArticle(articles);
  },
  getArticleByIndex: function (index) {
    return model.getArticleByIndex(index);
  }
}

controller.init();