const articleTitle = $(".blog-title")[0];
const articleContent = $(".blog-content")[0];

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
                hideSpinner();
            });
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