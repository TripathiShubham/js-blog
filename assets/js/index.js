var mainImgSrc = $(".article-img-div img")[0];
var mainTitle = $(".main-article .article-title")[0];
var mainContent = $(".main-article .article-content")[0];
var mainAuthor = $(".main-article .article-author")[0];
var mainTime = $(".main-article .article-time")[0];
var latestArticle = $(".latest-article")[0];

let model = {
    articles: null,
    init: function () {
    },
    getArticle: function() {
        return fetch('/api/get/allArticle')
    },
    setArticle: function(articles) {
        this.articles = articles;
    }
}

let view = {
    init: function () {
        controller.getArticle()
        .then( (response) => {
            return response.json();
        }).then( (response) => {
            controller.setArticle(response);
            mainImgSrc.setAttribute("src", response[0].articleImage);
            mainImgSrc.setAttribute("class", "article-img");
            mainTitle.innerHTML = response[0].title;
            mainContent.innerHTML = response[0].viewContent;
            mainAuthor.innerHTML = response[0].authorName;
            mainTime.innerHTML = response[0].readTime + " min read";
            this.createArticles(response);
        });
    },
    createArticles: function(articlesList) {
        var doc = document.createDocumentFragment();
        for(let i=1; i<articlesList.length; i++) {
            let containerDiv = $('<div class="container"></div>')[0];
            let articleDetails = $('<div class="article-details wrap-content"></div')[0];
            let articleTitle = $('<div class="article-title wrap-content"></div>')[0];
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
            let articleImgDiv = $('<div class="article-img-div"></div>')[0];
            let articleImg = $('<img class="article-img">')[0];
            articleImg.setAttribute('src', articlesList[i].articleImage);
            flex1.appendChild(starSpan);
            flex4.appendChild(articleAuthor);
            flex4.appendChild(articleTime);
            flex.appendChild(flex4);
            flex.appendChild(flex1);
            articleDetails.appendChild(articleTitle);
            articleDetails.appendChild(articleContent);
            articleDetails.appendChild(flex);
            articleImgDiv.appendChild(articleImg);
            containerDiv.appendChild(articleDetails);
            containerDiv.appendChild(articleImgDiv);
            doc.appendChild(containerDiv);
        }
        latestArticle.appendChild(doc);
    }
}

let controller = {
    init: function () {
        view.init();
    },
    getArticle: function() {
        return model.getArticle();
    },
    setArticle: function(articles) {
        model.setArticle(articles);
    }
}

controller.init();