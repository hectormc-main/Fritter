function createAlias(fields) {
  fetch('/api/users/alias',
    {method: 'POST',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}

function getAliases(fields) {
  fetch('/api/users/alias',
    {method: 'GET'
    })
    .then(showResponse)
    .catch(showResponse);
}
