const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

xhr.responseType = 'json'; // One way of parsing the JSON data

xhr.onload = function () {
  //   console.log(xhr.response);
  const listOfPosts = xhr.response; // If we're using xhr.responseType we don't need to write manually JSON.parse
  // const listOfPosts = JSON.parse(xhr.response); // One other way of parsing the data (manually)
  // console.log(listOfPosts);
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    listElement.append(postEl);
  }
};

xhr.send();
