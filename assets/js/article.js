const articleTitle = $(".blog-title")[0];
const articleContent = $(".blog-content")[0];

let model = {
    getArticleById: function(id) {
        return fetch('/api/get/article?id='+id)
    }
}

let view = {
    init: function (id) {
        controller.getArticleById(id)
        .then( (response) => {
            return response.json();
        }).then( (response) => {
            articleTitle.innerHTML = response[0].title;
            articleContent.innerHTML = response[0].content
        });
    }
}

let controller = {
    init: function () {
        var id = new URL(window.location.href).searchParams.get("id");
        console.log(id);
        view.init(id);
    },
    getArticleById: function(id) {
        return model.getArticleById(id);
    }
}

controller.init();