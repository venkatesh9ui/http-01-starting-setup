const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
  const promise = new Promise((reslove, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json'; // One way of parsing the JSON data

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        reslove(xhr.response);
      } else {
        reject(new Error('Something went wrong!'));
      }

      //   console.log(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error('Failed to send request!'));
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
}

async function fetchPosts() {
  try {
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
      postEl.querySelector('li').id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
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

// fetchButton.addEventListener('click', () => {
//   fetchPosts();
// });
fetchButton.addEventListener('click', fetchPosts);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const eneteredContent = event.currentTarget.querySelector('#content').value;

  createPost(enteredTitle, eneteredContent);
});

postList.addEventListener('click', (event) => {
  if ((event.target.tagName = 'BUTTON')) {
    const postId = event.target.closest('li').id;
    sendHttpRequest(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});

// fetchPosts();
// createPost('DUMMY', 'A Dummy post!');
