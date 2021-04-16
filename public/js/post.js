// delete post
const delButtonHandler = async (event) => {
  console.log('delete');
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');

      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete post');
      }
    } else {
      console.log('error, no data id found');
    }
  };

document.querySelector('.delete').addEventListener('click', delButtonHandler);

