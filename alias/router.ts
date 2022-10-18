import type {Request, Response} from 'express';
import express from 'express';
import AliasCollection from './collection';
import FreetCollection from '../freet/collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as aliasValidator from './middleware';
import * as util from './util';

const router = express.Router();

/**
 * Sign in user.
 *
 * @name POST /api/user/alias/session
 *
 * @param {string} aliasname - The user's aliasname
 * @return {AliasResponse} - An object with alias's details
 * @throws {403} - If alias is already signed in
 * @throws {400} - If aliasname is not in the correct format,
 *                 or missing in the req
 * @throws {401} - If the aliasname login credentials are invalid
 *
 */
router.post(
  '/session',
  [
    aliasValidator.isAliasLoggedIn,
    aliasValidator.isValidAliasname,
    aliasValidator.isAccountExists
  ],
  async (req: Request, res: Response) => {
    const alias = await AliasCollection.findOneByAliasname(
      req.body.aliasname
    );
    req.session.userId = alias._id.toString();
    res.status(201).json({
      message: 'You have logged in successfully',
      alias: util.constructAliasResponse(alias)
    });
  }
);

/**
 * Sign out an alias
 *
 * @name DELETE /api/users/alias/session
 *
 * @return - None
 * @throws {403} - If alias is not logged in
 *
 */
router.delete(
  '/session',
  [
    aliasValidator.isAliasLoggedIn
  ],
  (req: Request, res: Response) => {
    req.session.aliasId = undefined;
    res.status(200).json({
      message: 'You have been logged out successfully.'
    });
  }
);

/**
 * Create an alias account.
 *
 * @name POST /api/alias
 *
 * @param {string} aliasname - aliasname of Alias
 * @return {AliasResponse} - The created alias
 * @throws {403} - If there is an alias already logged in
 * @throws {409} - If aliasname is already taken
 * @throws {400} - If password or username is not in correct format
 *
 */
router.post(
  '/',
  [
    aliasValidator.isAliasLoggedOut,
    aliasValidator.isValidAliasname,
    aliasValidator.isAliasnameNotAlreadyInUse,
    userValidator.isUserLoggedIn,
    userValidator.isValidUsername,
    userValidator.isUsernameNotAlreadyInUse,
    userValidator.isValidPassword
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const aliasId = (req.session.aliasId as string) ?? '';
    const alias = await AliasCollection.addOne(userId, aliasId);
    req.session.aliasId = alias._id.toString();
    res.status(201).json({
      message: `Your account was created successfully. You have been logged in as ${alias.aliasname}`,
      alias: util.constructAliasResponse(alias)
    });
  }
);

/**
 * Update a user's profile.
 *
 * @name PUT /api/users
 *
 * @param {string} username - The user's new username
 * @param {string} password - The user's new password
 * @return {UserResponse} - The updated user
 * @throws {403} - If user is not logged in
 * @throws {409} - If username already taken
 * @throws {400} - If username or password are not of the correct format
 */
router.put(
  '/',
  [
    userValidator.isUserLoggedIn,
    userValidator.isValidUsername,
    userValidator.isUsernameNotAlreadyInUse,
    userValidator.isValidPassword,
    aliasValidator.isAliasLoggedOut,
    aliasValidator.isValidAliasname,
    aliasValidator.isAliasnameNotAlreadyInUse
  ],
  async (req: Request, res: Response) => {
    const aliasId = (req.session.aliasId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const alias = await AliasCollection.updateOne(aliasId, req.body);
    res.status(200).json({
      message: 'Your profile was updated successfully.',
      alias: util.constructAliasResponse(alias)
    });
  }
);

/**
 * Delete an alias.
 *
 * @name DELETE /api/alias
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn,
    aliasValidator.isAliasLoggedOut,
    aliasValidator.isValidAliasname,
    aliasValidator.isAliasnameNotAlreadyInUse
  ],
  async (req: Request, res: Response) => {
    const aliasId = (req.session.aliasId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    await AliasCollection.deleteOne(aliasId);
    await FreetCollection.deleteMany(aliasId);
    req.session.aliasId = undefined;
    res.status(200).json({
      message: 'Your alias has been deleted successfully.'
    });
  }
);

export {router as aliasRouter};
