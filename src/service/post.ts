export function getPostList() {
    return fetch('http://api_server:8080/posts')
        .then(data => data.json())
}