import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import AliasCollection from '../alias/collection';

/**
 * Checks if the current session alias (if any) still exists in the database, for instance,
 * an alias may try to post a freet in some browser while the account has been deleted in another or
 * when a alias tries to modify an account in some browser while it has been deleted in another
 */
const isCurrentSessionAliasExists = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.aliasId) {
    const alias = await AliasCollection.findOneByAliasId(req.session.aliasId);

    if (!alias) {
      req.session.aliasId = undefined;
      res.status(500).json({
        error: {
          aliasNotFound: 'Alias session was not recognized.'
        }
      });
      return;
    }
  }

  next();
};

/**
 * Checks if an aliasname in req.body is valid, that is, it matches the aliasname regex
 */
const isValidAliasname = (req: Request, res: Response, next: NextFunction) => {
  const aliasnameRegex = /^\w+$/i;
  if (!aliasnameRegex.test(req.body.aliasname)) {
    res.status(400).json({
      error: {
        aliasname: 'Aliasname must be a nonempty alphanumeric string.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if an alias with aliasname in req.body exists
 */
const isAccountExists = async (req: Request, res: Response, next: NextFunction) => {
  const {aliasname} = req.body as {aliasname: string};

  if (!aliasname) {
    res.status(400).json({error: 'Missing aliasname credentials for sign in.'});
    return;
  }

  const alias = await AliasCollection.findOneByAliasname(
    aliasname
  );

  if (alias) {
    next();
  } else {
    res.status(401).json({error: 'Invalid alias credentials provided.'});
  }
};

/**
 * Checks if the alias is logged in, that is, whether the aliasId is set in session
 */
const isAliasLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.aliasId) {
    res.status(403).json({
      error: {
        auth: 'You must be logged in to complete this action.'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the alias is signed out, that is, aliasId is undefined in session
 */
const isAliasLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.aliasId) {
    res.status(403).json({
      error: 'You are already signed in.'
    });
    return;
  }

  next();
};

/**
 * Checks if a alias in req.body is already in use
 */
const isAliasnameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const alias = await AliasCollection.findOneByAliasname(req.body.aliasname);

  // If the current session alias wants to change their aliasname to one which matches
  // the current one irrespective of the case, we should allow them to do so
  if (!alias || (alias?._id.toString() === req.session.aliasId)) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      aliasname: 'An account with this aliasname already exists.'
    }
  });
};

/**
 * Checks if an Alias with aliasId as author id in req.query exists
 */
const isAuthorExists = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.author) {
    res.status(400).json({
      error: 'Provided author aliasname must be nonempty.'
    });
    return;
  }

  const alias = await AliasCollection.findOneByAliasname(req.query.author as string);
  if (!alias) {
    res.status(404).json({
      error: `An alias with aliasname ${req.query.author as string} does not exist.`
    });
    return;
  }

  next();
};

export {
  isCurrentSessionAliasExists,
  isAliasnameNotAlreadyInUse,
  isAuthorExists,
  isValidAliasname,
  isAliasLoggedOut,
  isAliasLoggedIn,
  isAccountExists
};
