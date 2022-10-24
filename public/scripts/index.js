/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// Show an object on the screen.
function showObject(obj) {
  const pre = document.getElementById('response');
  const preParent = pre.parentElement;
  pre.innerText = JSON.stringify(obj, null, 4);
  preParent.classList.add('flashing');
  setTimeout(() => {
    preParent.classList.remove('flashing');
  }, 300);
}

function showResponse(response) {
  response.json().then(data => {
    showObject({
      data,
      status: response.status,
      statusText: response.statusText
    });
  });
}

/**
 * IT IS UNLIKELY THAT YOU WILL WANT TO EDIT THE CODE ABOVE.
 * EDIT THE CODE BELOW TO SEND REQUESTS TO YOUR API.
 *
 * Native browser Fetch API documentation to fetch resources: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */

// Map form (by id) to the function that should be called on submit
const formsAndHandlers = {
  'create-user': createUser, // User
  'delete-user': deleteUser,
  'change-username': changeUsername,
  'change-password': changePassword,
  'sign-in': signIn,
  'sign-out': signOut,
  'view-all-freets': viewAllFreets, // Freets
  'view-freets-by-author': viewFreetsByAuthor,
  'create-freet': createFreet,
  'edit-freet': editFreet,
  'delete-freet': deleteFreet,
  'view-freet': viewFreet,
  'create-alias': createAlias, // Alias
  'get-aliases-of-user': getAliases,
  'sign-in-alias': signInAlias,
  'sign-out-alias': signOutAlias,
  'update-aliasname': updateAliasname,
  'delete-alias': deleteAlias,
  'create-proliferate': createProliferate, // Proliferate
  'get-proliferate': getNumProliferates,
  'delete-proliferate': deleteProliferate,
  'create-reaction': createReaction, // Reaction
  'change-reaction': changeReaction,
  'get-reactions': getReactions,
  'delete-reaction': deleteReaction,
  'create-rejection': createRejection,
  'get-your-rejections': getRejections,
  'delete-rejection': deleteRejection,
  'create-follow': createFollow, // Follows
  'delete-follow': deleteFollow,
  'view-followers': viewFollowers,
  'view-followed': viewFollowed,
  'get-sub-box': getSubBox, // Subscription Box
  'get-feed': getFeed // Feed
};

// Attach handlers to forms
function init() {
  Object.entries(formsAndHandlers).forEach(([formID, handler]) => {
    const form = document.getElementById(formID);
    form.onsubmit = e => {
      e.preventDefault();
      const formData = new FormData(form);
      handler(Object.fromEntries(formData.entries()));
      return false; // Don't reload page
    };
  });
}

// Attach handlers once DOM is ready
window.onload = init;
