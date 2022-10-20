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

function updateAliasname(fields) {
  fetch('/api/users/alias',
    {method: 'PUT',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}

function signInAlias(fields) {
  fetch('/api/users/alias/session',
    {method: 'POST',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}

function signOutAlias(fields) {
  fetch('/api/users/alias/session',
    {method: 'DELETE'
    })
    .then(showResponse)
    .catch(showResponse);
}

function deleteAlias(fields) {
  fetch('/api/users/alias',
    {method: 'DELETE',
      body: JSON.stringify(fields),
      headers: {'Content-Type': 'application/json'}
    })
    .then(showResponse)
    .catch(showResponse);
}
