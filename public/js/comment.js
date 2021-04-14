// get selected post
const chosenPostHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    await fetch(`/api/posts/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => {
        const title = json.title;
        const content = json.content;
    });
  }
};

// new comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-content').nodeValue.trim();

  if (comment) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('click', newCommentHandler);
