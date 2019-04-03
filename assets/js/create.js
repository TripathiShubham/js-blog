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
        $('#post').on('click', view.save);
        $('body').on('dragstart dragover dragenter dragleave drop', function (event) {
            event.preventDefault();
            return false;
        });
        hideSpinner();
    },
    save: function () {
        let figures = $('.medium-insert-images figure');
        let images = $('.medium-insert-images img');
        let caption = $('.medium-insert-images figcaption');
        for (let i = 0; i < figures.length; i++) {
            figures[i].setAttribute("class", "article-img-div");
            images[i].setAttribute("class", "article-img");
            if(caption[i]) {
                caption[i].setAttribute("class", "img-desc");
            }
            
        }
        let allContents = editor.serialize()['element-0'].value;
        allContents = allContents.replace("<div><br></div>", "");
        let title = $('#article_title')[0].innerText;
        let readTime = $('#article_time')[0].innerText;
        let error = view.validateFields(allContents, title, readTime);
        if(error) {
            return;
        }
        let viewContent = allContents.match(/(?<=(<p>))(.*?)(?=(<\/p>))/g);
        let artImg = $('.medium-insert-images img')[0];
        if(artImg && artImg.src) {
            var articleImage = $('.medium-insert-images img')[0].src.replace(location.origin, '');
        }
        showSpinner();
        fetch('/api/save/article', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": title,
                "content": allContents,
                "viewContent": viewContent,
                "readTime": readTime,
                "articleImage": articleImage
            }),
        }).then(() => {
            window.location.href = location.origin;
        });
    },
    validateFields: function(allContents, title, readTime) {
        let error = false;
        if(allContents == "") {
            error = true;
            $(".content-error").addClass('show');
        }
        if(title == "") {
            error = true;
            $(".title-error").addClass('show');
        }
        if(readTime == "" || isNaN(readTime)) {
            error = true;
            $(".time-error").addClass('show');
        }
        return error;
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