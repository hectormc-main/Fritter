## API routes

The following api routes have already been implemented for you (**Make sure to document all the routes that you have added.**):


# USERS

#### `POST /api/users/session` - Sign in user

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with user's details (without password)

**Throws**

- `403` if the user is already logged in
- `400` if username or password is not in correct format format or missing in the req
- `401` if the user login credentials are invalid

#### `DELETE /api/users/session` - Sign out user

**Returns**

- A success message

**Throws**

- `403` if user is not logged in

#### `POST /api/users` - Create an new user account

**Body**

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the created user's details (without password)

**Throws**

- `403` if there is a user already logged in
- `400` if username or password is in the wrong format
- `409` if username is already in use

#### `PUT /api/users` - Update a user's profile

**Body** _(no need to add fields that are not being changed)_

- `username` _{string}_ - The user's username
- `password` _{string}_ - The user's password

**Returns**

- A success message
- An object with the update user details (without password)

**Throws**

- `403` if the user is not logged in
- `400` if username or password is in the wrong format
- `409` if the username is already in use

#### `DELETE /api/users` - Delete user

**Returns**

- A success message

**Throws**

- `403` if the user is not logged in








# ALIAS

---

### 'POST /api/users/alias/session' - Sign in to alias

**Returns**

- Success message

**Throws**

- '403' if alias does not belong to session user

### 'GET /api/users/alias'

**Returns**

- A message containing: signed in alias (if it exists) and all aliasnames of the session's user

**Throws**

- '403' if user is not signed in


### 'DELETE /api/users/alias/session' - log alias out

**Returns**

- A success message

**Throws**

- '403' if alias is not logged in


### 'POST /api/users/alias' - create alias account

**Returns**

- The created Alias

**Throws**

- '400' if aliasname or userId not in correct format
- '403' if there is an alias already logged in
- '409' if aliasname already taken


### 'PUT /api/users/alias' - Update alias's aliasname

**Returns**

- Success Message

**Throws**

- '400' if aliasname is not in valid format
- '403' if you are not logged in to an alias
- '409' if aliasname already taken

### 'DELETE /api/users/alias' - Delete alias

**Returns**

- Success message

**Throws**

- '403' if user is not logged in







# FREETS

#### `GET /`

This renders the `index.html` file that will be used to interact with the backend

#### `GET /api/freets` - Get all the freets

**Returns**

- An array of all freets sorted in descending order by date modified

#### `GET /api/freets?author=ALIASNAME` - Get freets by author

**Returns**

- An array of freets created by alias with aliasname `author`

**Throws**

- `400` if `author` is not given
- `404` if `author` is not a recognized aliasname of any alias

#### `POST /api/freets` - Create a new freet

**Body**

- `content` _{string}_ - The content of the freet

**Returns**

- A success message
- A object with the created freet

**Throws**

- `403` if the alias is not logged in
- `400` If the freet content is empty or a stream of empty spaces
- `413` If the freet content is more than 140 characters long

#### `DELETE /api/freets/:freetId?` - Delete an existing freet

**Returns**

- A success message

**Throws**

- `403` if the alias is not logged in
- `403` if the alias is not the author of the freet
- `404` if the freetId is invalid

#### `PUT /api/freets/:freetId?` - Update an existing freet

**Body**

- `content` _{string}_ - The new content of the freet

**Returns**

- A success message
- An object with the updated freet

**Throws**

- `403` if the alias is not logged in
- `404` if the freetId is invalid
- `403` if the alias is not the author of the freet
- `400` if the new freet content is empty or a stream of empty spaces
- `413` if the new freet content is more than 140 characters long





# Proliferate
---

### 'POST /api/proliferate/:freetId' - Proliferate the freet

**Returns**

- A success message

**Throws**

- Alias not signed in
- This alias has already proliferated this freet
- Freet does not exist

### 'DELETE /api/proliferate/:freetId' - Un-proliferate the freet

**Returns**

- A success message

**Throws**

- Alias not signed in
- Alias has not proliferated this freet
- Freet does not exist






# Reactions
---

### 'POST /api/reactions' - React to the freet

**Returns**

- A success message

**Throws**

- Alias not signed in
- Freet does not exist
- EmojiId does not exist


### 'PUT /api/reactions' - Change reaction to freet

**Returns**

- A success message

**Throws**

- Alias is not signed in
- Freet does not exist
- EmojiId does not exist


### 'DELETE /api/reactions' - un-react to the freet

**Returns**

- A success message

**Throws**

- Alias not signed in
- Alias has not reacted this freet
- Freet does not exist






# Rejection
---

### 'POST /api/rejection' - Reject this freet

**Returns**

- A success message

**Throws**

- Alias not signed in
- Freet does not exist
- Alias has already rejected this freet


### 'DELETE /api/rejection' - un-reject this freet

**Returns**

- A success message

**Throws**

- Alias not signed in
- Alias has not rejected this freet
- Freet does not exist







# Follow
---

### 'POST /api/follow' - Follow alias

**Returns**

- A success message

**Throws**

- Alias not signed in
- Alias is trying to follow itself
- You already follow this alias


### 'DELETE /api/follow' - Un-follow alias

**Returns**

- A success message

**Throws**

- Alias not signed in
- Alias does not follow other alias





# Subscription Box
---

### 'GET /api/sub_box' -  get content according to whom you follow

**Returns**

- List of content in chronological order based on who you follow

**Throws**

- Alias not signed in





# Feed
---

### 'GET /api/feed' - get content curated based on how the alias reacts to content

**Returns**

- List of content ordered by what the algorithm thinks the alias would like

**Throws**

- Alias not signed in





# Trending
---

### 'GET /api/trending' - get content based agnostic to your preferences

**Returns**

- List of content based on what's popular right now

**Throws**

- Can't think of anything right now






# Musical Profiles
---

### 'POST /api/music' - add playlist to your profile

**Returns**

- A success message

**Throws**

- Alias is not signed in
- Invalid playlist (URL?)


### 'GET /api/music' - add playlist to active playlist

**Returns**

- A playlist object

**Throws**

- Alias is not signed in
- Invalid playlist object
- Other alias does not exist





# Usage Alerts
---

### 'POST /api/alerts' - create a new alert

**Returns**

- A success message
- An alert object?

**Throws**

- Alias is not signed in
- Invalid alert format
- Identical alert already exists


### 'GET /api/alerts' - get all alerts for your alias

**Returns**

- A success message
- All alert objects?

**Throws**

- Alias is not signed in

