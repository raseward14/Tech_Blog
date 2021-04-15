// new comment
const newCommentHandler = async (event) => {
  event.preventDefault();

  const commentName = document.querySelector('#comment-name').value.trim();
  const comment = document.querySelector('#comment-text').value.trim();
  const postId = document.querySelector('#post-id').value.trim();

  console.log(postId);

  if (postId && commentName && comment) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ post_id: postId, name: commentName, comment: comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to post comment!')
    }
  }
};

document
  .querySelector('.new-comment')
  .addEventListener('submit', newCommentHandler);
