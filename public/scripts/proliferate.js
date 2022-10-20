/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createProliferate(fields) {
  fetch(`/api/proliferate/${fields.contentId}`,
    {method: 'POST',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}

function deleteProliferate(fields) {
  fetch(`/api/proliferate/${fields.contentId}`,
    {method: 'DELETE',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}
