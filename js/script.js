const postConteiner = document.getElementById("post-conteiner");
const markAsReadConteiner = document.getElementById("mark-as-read-conteiner");
const latastPostConteiner = document.getElementById("latest-post-conteiner");
const loader = document.getElementById("loader");

// mark as read section
const markAsRead = (postTittle, postViews) => {
    markAsReadConteiner.classList.remove("hidden")
    const markDiv = document.createElement("div");
    markDiv.innerHTML = `
        <div class="flex justify-between bg-white rounded-lg p-4 my-4">
            <div class="w-3/4 ">
                <h2 class="font-semibold">${postTittle}</h2>
            </div>
            <div class="flex gap-2 w-1/4">
                <img src="icons/eye.svg" alt="">
                <p>${postViews}</p>
            </div>
        </div>
    `
    markAsReadConteiner.appendChild(markDiv);
}


// posts by search
const searchPosts = async () => {
    loader.classList.remove("hidden");
    postConteiner.innerHTML = "";
    const searchPostsInput = document.getElementById("search-posts-input");
    searchPostsInputValue = searchPostsInput.value;
    const loadSearchedData = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchPostsInputValue}`);
    const loadedData = await loadSearchedData.json()
    const data = loadedData.posts
    data.forEach(post => {
        console.log(post)
        let isActiveUrl = "icons/greenicon.svg";
        if (post.isActive) {
            isActiveUrl = "icons/greenicon.svg";
        } else {
            isActiveUrl = "icons/redicon.svg";
        }
        const postItem = document.createElement("div");
        postItem.innerHTML = `
            <div class="lg:flex gap-8 bg-gray-200 p-8 rounded-xl">
            <div class="relative w-1/2 lg:w-1/6">
                <img class="absolute -top-2 -right-2" src="${isActiveUrl}" alt="">
                <img class="w-full rounded-lg" src=${post.image} alt="">
            </div>
            <div class="lg:w-5/6 space-y-4">
                <div class="flex gap-8 font-semibold">
                    <p># ${post.category}</p>
                    <p>Author : ${post.author?.name}</p>
                </div>
                <h2 class="font-bold text-2xl">${post.title}</h2>
                <p>
                    ${post.description}
                </p>
                <hr>
                <div class="flex justify-between">
                    <div class="lg:flex gap-4">
                        <div class="flex gap-2">
                            <img src="icons/comment.svg" alt="">
                            <p>${post.comment_count}</p>
                        </div>
                        <div class="flex gap-2">
                            <img src="icons/eye.svg" alt="">
                            <p>${post.view_count}</p>
                        </div>
                        <div class="flex gap-2">
                            <img src="icons/watch.svg" alt="">
                            <p>${post.posted_time} min</p>
                        </div>
                    </div>
                    <div onclick="markAsRead('${post.title.replace("'", " ")}',${post.view_count})">
                        <img src="icons/markAsRead.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
        `
        postConteiner.appendChild(postItem);
    });
    searchPostsInput.value = "";
    setTimeout(()=>{
        loader.classList.add("hidden");
    },1000)

}

// posts by default
const posts = async () => {
    loader.classList.remove("hidden");
    const dataLoad = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await dataLoad.json();
    const postsData = data.posts;

    postsData.forEach(post => {
        let isActiveUrl = "icons/greenicon.svg";
        if (post.isActive) {
            isActiveUrl = "icons/greenicon.svg";
        } else {
            isActiveUrl = "icons/redicon.svg";
        }
        const postItem = document.createElement("div");
        postItem.innerHTML = `
            <div class="lg:flex gap-8 bg-gray-200 p-8 rounded-xl">
            <div class="relative w-1/2 lg:w-1/6">
                <img class="absolute -top-2 -right-2" src="${isActiveUrl}" alt="">
                <img class="w-full rounded-lg" src=${post.image} alt="">
            </div>
            <div class="lg:w-5/6 space-y-4">
                <div class="flex gap-8 font-semibold">
                    <p># ${post.category}</p>
                    <p>Author : ${post.author?.name}</p>
                </div>
                <h2 class="font-bold text-2xl">${post.title}</h2>
                <p>
                    ${post.description}
                </p>
                <hr>
                <div class="flex justify-between">
                    <div class="lg:flex gap-4">
                        <div class="flex gap-2">
                            <img src="icons/comment.svg" alt="">
                            <p>${post.comment_count}</p>
                        </div>
                        <div class="flex gap-2">
                            <img src="icons/eye.svg" alt="">
                            <p>${post.view_count}</p>
                        </div>
                        <div class="flex gap-2">
                            <img src="icons/watch.svg" alt="">
                            <p>${post.posted_time} min</p>
                        </div>
                    </div>
                    <div onclick="markAsRead('${post.title.replace("'", " ")}',${post.view_count})">
                        <img src="icons/markAsRead.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
        `
        postConteiner.appendChild(postItem);
    });
    loader.classList.add("hidden");
}
posts()

const latastPosts = async () => {
    const loadedData = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const latastPostsData = await loadedData.json();
    latastPostsData.forEach(latastPost => {
        const postItem = document.createElement("div");
        postItem.innerHTML = `
            <div class="border border-gray-300 p-4 rounded-lg space-y-4">
            <div>
                <img class="rounded-lg" src=${latastPost.cover_image} alt="">
            </div>
            <div class="flex gap-2 mt-4">
                <div>
                    <img src="icons/dateicon.svg" alt="">
                </div>
                <p>${latastPost.author?.posted_date || "No post date"}</p>
            </div>
            <h3 class="font-semibold text-xl">${latastPost.title}</h3>
            <p>${latastPost.description}</p>
            <div class="flex gap-2 items-center">
                <div class="max-w-[50px]">
                    <img class="w-full rounded-full" src="${latastPost.profile_image}" alt="">
                </div>
                <div>
                <p class="font-bold">${latastPost.author?.name}</p>
                <p>${latastPost.author?.designation || "Unknown"}</p>
                </div>
            </div>
            </div>
        `
        latastPostConteiner.appendChild(postItem);
    })
}
latastPosts()