const latestArticle = $(".latest-article")[0];
const authorImg = $(".user-img");
const articleUrl = location.origin + "/article";

let model = {
  articles: null,
  init: function () {
  },
  getArticle: function () {
    return fetch('/api/get/articleById')
  },
  setArticle: function (articles) {
    this.articles = articles;
  },
  getArticleByIndex: function (index) {
    return this.articles[index];
  },
  deleteArticle: function(id) {
    return fetch('/api/delete/articleById', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "id": id
      })
    })
  }
}

let view = {
  init: function () {
    controller.getArticle()
      .then((response) => {
        return response.json();
      }).then((response) => {
        this.createArticles(response);
        hideSpinner();
        view.setIntersectionObserver();
        controller.setArticle(response);
      });
  },
  createArticles: function (articlesList) {
    var doc = document.createDocumentFragment();
    for (let i = 0; i < articlesList.length; i++) {
      let containerDiv = $(`<div class="container border-bottom article-${i}"></div>`)[0];
      let articleDetails = $('<div class="article-details wrap-content flex-4"></div')[0];
      let articleTitleHTML = `<div class="article-title wrap-content article" 
                                    onclick="view.viewArticle(${i})"></div>`
      let articleTitle = $(articleTitleHTML)[0];
      articleTitle.innerHTML = articlesList[i].title;
      let articleContent = $('<div class="article-content wrap-content"></div>')[0];
      articleContent.innerHTML = articlesList[i].viewContent;
      let actionDiv = $('<div class="flex flex-1 flex-center"></div')[0];
      let deleteSpan = $(`<span class="pointer" onclick="view.deleteArticle(` + i + `)"><i class="material-icons">delete</i></span>`)[0];
      actionDiv.appendChild(deleteSpan);
      articleDetails.appendChild(articleTitle);
      articleDetails.appendChild(articleContent);
      containerDiv.appendChild(articleDetails);
      containerDiv.appendChild(actionDiv);
      doc.appendChild(containerDiv);
    }
    latestArticle.appendChild(doc);
  },
  viewArticle: function (articleId) {
    let article = controller.getArticleByIndex(articleId);
    window.location.href = articleUrl + '?id=' + article._id;
  },
  deleteArticle: function (articleId) {
    let article = controller.getArticleByIndex(articleId);
    controller.deleteArticle(article._id)
      .then((response) => {
        return response.json();
      }).then(() => {
        model.articles.splice(articleId, 1);
        $(".article-" + articleId).slideUp("slow", "swing", function() { $(this).remove();});
      });
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
    view.init();
  },
  getArticle: function () {
    return model.getArticle();
  },
  setArticle: function (articles) {
    model.setArticle(articles);
  },
  getArticleByIndex: function (index) {
    return model.getArticleByIndex(index);
  },
  deleteArticle: function (id) {
    return model.deleteArticle(id);
  }
}

controller.init();