const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url, data) {
  const promise = new Promise((reslove, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json'; // One way of parsing the JSON data

    xhr.onload = function () {
      reslove(xhr.response);
      //   console.log(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
}

async function fetchPosts() {
  const responseData = await sendHttpRequest(
    'GET',
    'https://jsonplaceholder.typicode.com/posts'
  );
  const listOfPosts = responseData; //xhr.response; // If we're using xhr.responseType we don't need to write manually JSON.parse
  // const listOfPosts = JSON.parse(xhr.response); // One other way of parsing the data (manually)
  // console.log(listOfPosts);
  for (const post of listOfPosts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    listElement.append(postEl);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

fetchPosts();
createPost('DUMMY', 'A Dummy post!');
