const form = document.getElementById('myForm');
const listContainer = document.getElementById('listContainer');
const siteName = document.getElementById('siteName');
const siteUrl = document.getElementById('siteUrl');
form.addEventListener('submit', saveBookmark);


function saveBookmark(e) {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * 1000000);

    if(!checkValidation()) {
        return false;
    }

    const bookmark = {
        id: randomNum,
        name: siteName.value,
        url: siteUrl.value
    }

    let bookmarks = [];
  
    if(localStorage.getItem('bookmarks') === null) {

        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    form.reset();

    fetchBookmarks();
}

function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if(localStorage.getItem('bookmarks') === null) {
        listContainer.innerHTML = '<h3>No list</h3>';
    } else {
        let html = ``;
        bookmarks.forEach(bookmark => {
            html += `
                    <div class="row bookmark py-2 my-2">
                        <div class="col-6 col-md-4 d-flex align-items-center"><h6 class="m-0">${bookmark.name}</h6></div>
                        <div class="col-6 col-md-4 d-none d-md-flex align-items-center"><p class="m-0">${bookmark.url}</p> </div>
                        <div class="col-6 col-md-4 d-flex align-items-center justify-content-end">
                            <a href="${bookmark.url}" target='_blank' class="btn-sm visit-btn btn-light mr-2">Visit</a>
                           
                            <i class="material-icons" onClick='deleteBookmark(${bookmark.id})'>&#xe872;</i>
                        </div>
                    </div>
                    `
        });
        listContainer.innerHTML = html;
    } 
}

function deleteBookmark(id) {
    if(!confirm('Are you sure!')) return
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    const newBookmarks = bookmarks.filter(bookmarks => bookmarks.id != id);

    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    fetchBookmarks();
}

function checkValidation() {
    if(!siteName.value || !siteUrl.value) {
        alert('Please insert data!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.value.match(regex)){
        alert('Please use a valid URL');
        return false;
    }

    return true;
}