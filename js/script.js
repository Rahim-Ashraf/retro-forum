const postConteiner = document.getElementById("post-conteiner");
const markAsReadConteiner = document.getElementById("mark-as-read-conteiner")

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

const posts = async () => {
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
        console.log(post);
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
}
posts()