/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

function getSubBox(fields) {
  fetch('/api/sub_box',
    {method: 'GET'
    })
    .then(showResponse)
    .catch(showResponse);
}
