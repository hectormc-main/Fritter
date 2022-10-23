/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createReaction(fields) {
  fetch(`/api/reactions/${fields.contentId}`,
    {method: 'POST',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}

function changeReaction(fields) {
  fetch(`/api/reactions/${fields.contentId}`,
    {method: 'PUT',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}

function getReactions(fields) {
  fetch(`/api/reactions/${fields.contentId}`,
    {method: 'GET'
    })
    .then(showResponse)
    .catch(showResponse);
}

function deleteReaction(fields) {
  fetch(`/api/reactions/${fields.contentId}`,
    {method: 'DELETE',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}
