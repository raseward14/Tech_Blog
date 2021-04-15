// new post
const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

// selected post
const chosenPostHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    fetch(`/api/posts/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => {
        // Create a variable to store HTML
        let li = `
      <form class="form new-post-form" id="post-form"></form>`;

        // print html with new values
        li += `
          <div class form-group>
            <label for="post-title">Title:</label>
            <textarea class="form-input" id="post-title" name="post-title">${json.title}</textarea>
          </div>
          <div class form-group>
            <label for="post-content">Content:</label>
            <textarea class="form-input" id="post-content" name="post-content">${json.content}</textarea>
          </div>
          <div class="form-group"><br></div>
          `;

        // Display result
        document.getElementById('post-form').innerHTML = li;
      })
      .catch((err) => console.log(err));
  }
};

// delete post
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// update post
const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update post');
      }
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list-item')
  .addEventListener('click', chosenPostHandler);

document.querySelector('.delete').addEventListener('click', delButtonHandler);

document
  .querySelector('.update')
  .addEventListener('click', updateButtonHandler);
