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
        $('#saveButton').on('click', view.save)
    },
    save: function () {
        let allContents = editor.serialize()['element-0'].value;
        var title = $('#article_title').innerText;
        var readTime = $('#article_time').innerText;
        var viewContent = allContents.match(/(?<=(<p class="">))(\w|\d|\n)+?(?=(<\/p>))/g);
        var articleImage = $('.medium-insert-images img')[0].src.replace(location.origin, '');
        fetch('/api/save/article', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "title": title,
                "authorId": "1",
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