/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createRejection(fields) {
  fetch(`/api/rejections/${fields.contentId}`,
    {method: 'POST',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}

function getRejections(fields) {
  fetch('/api/rejections',
    {method: 'GET'
    })
    .then(showResponse)
    .catch(showResponse);
}

function deleteRejection(fields) {
  fetch(`/api/rejections/${fields.contentId}`,
    {method: 'DELETE',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}
