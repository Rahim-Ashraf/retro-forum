const posts = async()=>{
    const dataLoad = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await dataLoad.json();
    const postsData = data.posts;
    console.log(postsData)
    postsData.forEach(post => {
    console.log(post)        
    });
}
posts()