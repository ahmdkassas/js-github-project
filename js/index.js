document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('github-form');
    const txtSearch = document.getElementById('search');
    const lstUser = document.getElementById('user-list');
    const lstRepo = document.getElementById('repos-list');


    function ClearResults() {
        lstUser.innerHTML = '';
        lstRepo.innerHTML = '';
    }

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (txtSearch.value !== "") {
            SearchUsers(txtSearch.value);
        }
    }) 

    function SearchUsers(userName) {
        const fetchUrl = `https://api.github.com/search/users?q=${userName}`;
        ClearResults();
        fetch(fetchUrl, {headers:{'Accept': 'application/vnd.github.v3+json'}})
            .then(resp => resp.json())
            .then(results => {
                results.items.forEach(user => renderUser(user));
            })
    }
    
    function renderUser(user) {
        const li = document.createElement('li');
        li.innerHTML = `${user.login}: Github: ${user.url} `;
        const userImg = document.createElement('img')
        userImg.src = user.avatar_url
        li.innerHTML = `${user.login}: Github: ${user.url} `;
        li.addEventListener('click', () => SearchRepos(user.login));
        li.appendChild(userImg);
        lstUser.appendChild(li);
    }
    
    function SearchRepos(userLogin) {
        ClearResults();
        const fetchUrl = `https://api.github.com/users/${userLogin}/repos`;
        fetch(fetchUrl, {headers:{'Accept': 'application/vnd.github.v3+json'}})
            .then(resp => resp.json())
            .then(results => {
                results.forEach(repo => renderRepo(repo));
            })
    }
    
    function renderRepo(repo) {
        const li = document.createElement('li');
        const lnkRepo = document.createElement('a')
        lnkRepo.href = repo.html_url
        lnkRepo.innerText = "Repo Link"
        li.innerText = repo.name + ", "
        li.appendChild(lnkRepo)
        lstRepo.appendChild(li)
    }
    
   
});