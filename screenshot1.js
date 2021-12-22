const TAG_ACTIVE_CLASS = 'tag--active';
const SEARCH_HIDDEN_CLASS = 'search--hidden';
const CLOSE_TAG_CLASS = 'close-tag';
const TAG_CLASS = 'tag';
const jobsListings=[
    {
        "id":1,
        "company":"Photosnap",
        "logo": "images.background.jpg",
        "new": true,
        "featured": true,
        "position":"senior Frontend Developer",
        "role":"Frontened",
        "level":"senior",
        "PostedAt":"1d ago",
        "contract": "Full Time",
        "location":"USA Only",
        "Languages":["HTML , CSS ,JavaScript"]

    },
    {
        "id":2,
        "company":"Manage",
        "logo": "images.background1.jpg",
        "new": true,
        "featured": true,
        "position":"Fullstack Developer",
        "role":"Fullstack",
        "level":"Midweight",
        "PostedAt":"1d ago",
        "contract": "Part Time",
        "location":"Remote",
        "Languages":["python"],
        "tools":["React"]

    },
    {
        "id":3,
        "company":"Account",
        "logo": "images.background2.jpg",
        "new": true,
        "featured": false,
        "position":"Junior Frontend Developer",
        "role":"Frontened",
        "level":"Junior",
        "PostedAt":"2d ago",
        "contract": "Part Time",
        "location":"USA Only",
        "Languages":["JavaScript"],
        "tools":["React","Sass"]

    },
    {
        "id":4,
        "company":"MyHome",
        "logo": "images.background3.jpg",
        "new": false,
        "featured": false,
        "position":"Junior Frontend Developer",
        "role":"Frontened",
        "level":"Junior",
        "PostedAt":"5d ago",
        "contract": "Contract",
        "location":"USA Only",
        "Languages":["CSS,JavaScript"]

    },
    {
        "id":5,
        "company":"Loop Studios",
        "logo": "images.background4.jpg",
        "new": false,
        "featured": false,
        "position":"Software Engineer",
        "role":"Fullstack",
        "level":"Midweight",
        "PostedAt":"1w ago",
        "contract": "Full Time",
        "location":"Worldwide",
        "Languages":["JavaScript"],
        "tools":["Ruby","Sass"]


    },

];
function getTagHTML(tag, tagClasses) {
    return `<span class="${tagClasses}">
                ${tag}
            </span>`;
}

function getJobListingHTML(jobData, filterTags = []) {
    const JOB_TAGS_PLACEHOLDER = '###JOB_TAGS###';
    let jobListingHTML = `
        <div class="jobs__item">
            <div class="jobs__column jobs__column--left">
                <img src="${jobData.logo}" alt="${jobData.company}" class="jobs__img" />
                <div class="jobs__info">
                    <span class="jobs__company">${jobData.company}</span>
                    <span class="jobs__title">${jobData.position}</span>
                    
                    <ul class="jobs__details">
                        <li class="jobs__details-item">${jobData.postedAt}</li>
                        <li class="jobs__details-item">${jobData.contract}</li>
                        <li class="jobs__details-item">${jobData.location}</li>
                    </ul>
                </div>
            </div>
            <div class="jobs__column jobs__column--right">
                ${JOB_TAGS_PLACEHOLDER}
            </div>
        </div>
    `;

    const tagsList = [
        jobData.role,
        jobData.level,
        ...(jobData.languages || []),
        ...(jobData.tools || [])
    ];
    const tagsListLowercase = tagsList.map(t => t && t.toLowerCase());
    const passesFilter = !filterTags.length || filterTags.every(tag => (
        tagsListLowercase.includes(tag && tag.toLowerCase())
    ));
    
    if (!passesFilter) {
        return '';
    }

    const tagsString = tagsList.reduce((acc, currentTag) => {
        const activeClass = (filterTags.includes(currentTag) && TAG_ACTIVE_CLASS) || '';

        return acc + getTagHTML(currentTag, `${TAG_CLASS} ${activeClass}`);
    }, '');

    return jobListingHTML.replace(JOB_TAGS_PLACEHOLDER, tagsString);
};

function toggleClass(el, className) {
    if (el.classList.contains(className)) {
        el.classList.remove(className);

        return;
    }
    
    el.classList.add(className);
}

function getSearchBarTags(tagValue, searchContentEl) {
    let searchBarTags = Array.from(searchContentEl.children)
        .map(node => node.innerHTML && node.innerHTML.trim())
        .filter(tag => !!tag);

    if (searchBarTags.includes(tagValue)) {
        searchBarTags = searchBarTags.filter(tag => tag !== tagValue);
    } else {
        searchBarTags = [...searchBarTags, tagValue];
    }

    return searchBarTags;
}

function setJobsListings(filterTags) {
    const jobsListingsHTML = jobsListings.reduce((acc, currentListing) => {
        return acc + getJobListingHTML(currentListing, filterTags);
    }, '');
    
    document.getElementById('jobs').innerHTML = jobsListingsHTML;
}

function displaySearchWrapper(display = false) {
    const searchWrapper = document.getElementById('search');
    
    if (display) {
        searchWrapper.classList.remove(SEARCH_HIDDEN_CLASS);

        return;
    }

    searchWrapper.classList.add(SEARCH_HIDDEN_CLASS);
}

function setSearchbarContent(searchContentEl, tags) {
    searchContentEl.innerHTML = tags.reduce((acc, currentTag) => {
        return acc + getTagHTML(currentTag, CLOSE_TAG_CLASS);
    }, '');
}

function resetState(searchContentEl) {
    searchContentEl.innerHTML = '';

    setJobsListings();
    displaySearchWrapper(false);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
}

window.addEventListener('click', (event) => {
    const targetEl = event.target;
    const targetText = targetEl.innerHTML.trim();
    const searchContentEl = document.getElementById('search-content');
    const searchBarTags = getSearchBarTags(targetText, searchContentEl);

    if (targetEl.id === 'clear' || !searchBarTags.length) {
        resetState(searchContentEl);

        return;
    }

    if (![TAG_CLASS, CLOSE_TAG_CLASS].some(c => targetEl.classList.contains(c))) {
        return;
    }

    setSearchbarContent(searchContentEl, searchBarTags);
    toggleClass(targetEl, TAG_ACTIVE_CLASS);
    displaySearchWrapper(searchBarTags.length > 0);
    setJobsListings(searchBarTags);
});

setJobsListings();