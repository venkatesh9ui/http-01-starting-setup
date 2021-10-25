const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');

function sendHttpRequest(method, url, data) {
  // const promise = new Promise((reslove, reject) => {
  // const xhr = new XMLHttpRequest();
  // xhr.setRequestHeader('Content-Type', 'application/json'); // We can how many headers we want we can but we can't delete once the header added

  //   xhr.open(method, url);

  //   xhr.responseType = 'json'; // One way of parsing the JSON data

  //   xhr.onload = function () {
  //     if (xhr.status >= 200 && xhr.status < 300) {
  //       reslove(xhr.response);
  //     } else {
  //       xhr.response;
  //       reject(new Error('Something went wrong!'));
  //     }

  //     //   console.log(xhr.response);
  //   };

  //   xhr.onerror = function () {
  //     reject(new Error('Failed to send request!'));
  //   };

  //   xhr.send(JSON.stringify(data));
  // });
  // return promise;

  // GET is by DEFAULT no need to mention but you can
  return fetch(url, {
    method: method,
    body: JSON.stringify(data),
    // body: data
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error('Something went wrong - server-side');
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error('Something went wrong!');
    });
}

async function fetchPosts() {
  try {
    // const responseData = await sendHttpRequest(
    //   'GET',
    //   'https://jsonplaceholder.typicode.com/posts'
    // );
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    // console.log(response);
    // const listOfPosts = responseData; //xhr.response; // If we're using xhr.responseType we don't need to write manually JSON.parse
    // const listOfPosts = JSON.parse(xhr.response); // One other way of parsing the data (manually)
    // console.log(listOfPosts);
    const listOfPosts = response.data;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector('h2').textContent = post.title.toUpperCase();
      postEl.querySelector('p').textContent = post.body;
      postEl.querySelector('li').id = post.id;
      listElement.append(postEl);
    }
  } catch (error) {
    alert(error.message);
    // console.log(error.response);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId
  };

  // const fd = new FormData(form);
  // fd.append('title', title);
  // fd.append('body', content);
  // fd.append('userId', userId);

  // sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
  // sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', fd);
  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    post
  );
  // console.log(response);
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
    // sendHttpRequest(
    //   'DELETE',
    //   `https://jsonplaceholder.typicode.com/posts/${postId}`
    // );
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
});

// fetchPosts();
// createPost('DUMMY', 'A Dummy post!');
