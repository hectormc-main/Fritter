import type {Request, Response, NextFunction} from 'express';
// Import {Types} from 'mongoose';
import ReactionCollection from './collection';

/**
 * Checks if the signed in alias has not already reacted the desired content
 */
const hasAliasNotReactedToContent = async (req: Request, res: Response, next: NextFunction) => {
  console.log('HII');
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
 * @param req
 * @param res
 * @param next
 */
const isValidEmojiCode = async (req: Request, res: Response, next: NextFunction) => {
  const emojiCode = (req.body.emojiCode as string) ?? '';

  // TODO make emojiCode checker
  next();
};

export {
  hasAliasReactedToContent,
  hasAliasNotReactedToContent,
  isValidEmojiCode
};
