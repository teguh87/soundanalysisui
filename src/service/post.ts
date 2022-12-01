export function getPostList() {
    return fetch('http://10.99.0.221:8080/posts')
        .then(data => data.json())
}