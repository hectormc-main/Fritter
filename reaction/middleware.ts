import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ReactionCollection from './collection';
import FreetCollection from '../freet/collection';

/**
 * Checks if the signed in alias has not already reacted the desired content
 */
const hasAliasNotReactedToContent = async (req: Request, res: Response, next: NextFunction) => {
  const aliasId = (req.session.aliasId as string) ?? '';
  const contentId = (req.params.contentId) ?? '';
  const reaction = await ReactionCollection.findOneByAliasIdAndContentId(aliasId, contentId);

  if (reaction) {
    // TODO pick better code number
    res.status(410).json({
      error: {
        aliasAlreadyReacted: 'Alias has already reacted content'
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the signed in alias has already reacted the desired content
 */
const hasAliasReactedToContent = async (req: Request, res: Response, next: NextFunction) => {
  const aliasId = (req.session.aliasId as string) ?? '';
  const contentId = (req.params.contentId) ?? '';
  const reaction = await ReactionCollection.findOneByAliasIdAndContentId(aliasId, contentId);

  if (!reaction) {
    res.status(404).json({
      error: {
        reactionDoesNotExist: 'Alias has not reacted content'
      }
    });
    return;
  }

  next();
};

/**
 * Check if req.body.emojiCode corresponds to valid emoji code
 */
const isValidEmojiCode = async (req: Request, res: Response, next: NextFunction) => {
  const emojiCode = (req.body.emojiCode as string) ?? '';

  // TODO make emojiCode checker
  next();
};

/**
 * Check if req.params.contentId corresponds to valid emoji code
 */
const doesContentExist = async (req: Request, res: Response, next: NextFunction) => {
  const validFormat = Types.ObjectId.isValid(req.params.contentId);
  const freet = validFormat ? await FreetCollection.findOne(req.params.contentId) : '';

  // Add more checks as more types of content added
  if (freet) { // Check if freet exists
    next();
  } else {
    res.status(404).json({
      error: {
        contentDoesNotExist: `Content with contentId ${req.params.contentId} does not exist`
      }
    });
  }
};

export {
  hasAliasReactedToContent,
  hasAliasNotReactedToContent,
  isValidEmojiCode,
  doesContentExist
};
