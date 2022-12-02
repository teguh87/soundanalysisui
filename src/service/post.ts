export function getPostList() {
    return fetch('http://18.140.49.119:8080/posts')
        .then(data => data.json())
}