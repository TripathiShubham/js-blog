let editor;
let placeholderText = "Type your text";
let buttonsList = ['bold', 'italic', 'underline', 'anchor', 'h1', 'h2', 'h3', 'quote'];
let uploadURL = '/upload';
let uploadParamName = 'image';

let view = {
    init: function () {
        editor = new MediumEditor('.editable');
        $('.editable').mediumInsert({
            editor: editor,
            enabled: true,
            placeholder: {
                text: placeholderText
            },
            toolbar: {
                buttons: buttonsList
            },
            addons: {
                images: {
                    preview: true, captions: true,
                    fileUploadOptions: {
                        url: uploadURL,
                        paramName: uploadParamName
                    }
                }
            }
        });
        $('#saveButton').on('click', view.save);
        $('body').on('dragstart dragover dragenter dragleave drop', function (event) {
            event.preventDefault();
            return false;
        });
    },
    save: function () {
        let figures = $('.medium-insert-images figure');
        let images = $('.medium-insert-images img');
        let caption = $('.medium-insert-images figcaption');
        for(let i=0; i<figures.length; i++) {
            figures[i].setAttribute("class", "article-img-div");
            images[i].setAttribute("class", "article-img");
            caption[i].setAttribute("class", "img-desc");
        }
        let allContents = editor.serialize()['element-0'].value;
        allContents = allContents.replace("<div><br></div>", "");
        var title = $('#article_title')[0].innerText;
        var readTime = $('#article_time')[0].innerText;
        var viewContent = allContents.match(/(?<=(<p>))(.*?)(?=(<\/p>))/g);
        var articleImage = $('.medium-insert-images img')[0].src.replace(location.origin, '');
        fetch('/api/save/article', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": title,
                "authorId": "1",
                "authorName": "Shubham Tripathi",
                "content": allContents,
                "viewContent": viewContent,
                "readTime": readTime,
                "articleImage": articleImage
            }),
        }).then( () => {
                alert("article saved successfully");
                document.getElementsByClassName('blog-content')[0].innerHTML = allContents;
            });
    }
}

let controller = {
    init: function () {
        view.init();
    }
}

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        controller.init();
    }
}