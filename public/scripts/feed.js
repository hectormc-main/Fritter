/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

function getFeed(fields) {
  fetch('/api/feed',
    {method: 'GET'
    })
    .then(showResponse)
    .catch(showResponse);
}
