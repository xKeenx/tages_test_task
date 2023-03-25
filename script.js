
async function getUsers() {
    let responseUsers = await fetch('https://jsonplaceholder.typicode.com/users');
    let users = await responseUsers.json();

    users.map((user=>{
        delete user.username
        delete user.phone
        user.address = `${user.address.city},${user.address.street},${user.address.suite}`
        user.website = `https://${user.website}`
        user.company =`${user.company.name}`
    }))

    let userPosts =  await Promise.all(users.map(async (user) =>{
        let responseUserPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
        user.posts =  await responseUserPosts.json();
        if(user.name == "Ervin Howell"){
            let UserPostsComment = await Promise.all(user.posts.map(async (post) =>{
                let responseUserPostsComment = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
                post.comments = await responseUserPostsComment.json()

            }))
        }
        user.posts.map((post)=>{
            post.title_crop = post.title.substring(0,20)+"..."
            delete post.userId
        })
    }))
console.log(users)
}



getUsers()

