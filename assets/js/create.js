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
        let allContents = editor.serialize()['element-0'].value;
        allContents = allContents.replace("<div><br></div>", "");
        let title = $('#article_title')[0].innerText;
        let readTime = $('#article_time')[0].innerText;
        let error = view.validateFields(allContents, title, readTime);
        if(error) {
            return;
        }
        let figures = $('.medium-insert-images figure');
        let images = $('.medium-insert-images img');
        let caption = $('.medium-insert-images figcaption');
        for (let i = 0; i < figures.length; i++) {
            figures[i].setAttribute("class", "article-img-div");
            images[i].setAttribute("class", "article-img lazy");
            images[i].setAttribute("data-src", images[i].getAttribute("src"))
            let comPath = view.compressImgPath(images[i]);
            images[i].setAttribute("src", comPath)
            if(caption[i]) {
                caption[i].setAttribute("class", "img-desc");
            }
        }
        allContents = editor.serialize()['element-0'].value;
        allContents = allContents.replace("<div><br></div>", "");
        let viewContent = allContents.match(/(?<=(<p>))(.*?)(?=(<\/p>))/g)[0];
        let artImg = $('.medium-insert-images img')[0];
        let status = $('.status').is(':checked');
        if(artImg && artImg.src) {
            var articleImage = view.compressImgPath(artImg);
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
                "articleImage": articleImage,
                "status": status
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
    },
    compressImgPath(artImg) {
        var img = artImg.getAttribute('data-src');
        img = img.replace(/^.*[\\\/]/, '');
        img = img.substr(0, img.indexOf('.')) + "_small." + img.substr(img.indexOf('.') + 1)
        return '/test/' + img.replace(location.origin, '');
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