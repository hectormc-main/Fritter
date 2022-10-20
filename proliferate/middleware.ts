import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ProliferateCollection from './collection';

/**
 * Checks if the signed in alias has not already proliferated the desired content
 */
const hasAliasNotProliferatedContent = async (req: Request, res: Response, next: NextFunction) => {
  const aliasId = (req.session.aliasId as string) ?? '';
  const contentId = (req.params.contentId) ?? '';
  const proliferate = await ProliferateCollection.findOneByAliasIdAndContentId(aliasId, contentId);

  if (proliferate) {
    // TODO pick better code number
    res.status(410).json({
      error: {
        aliasAlreadyProliferated: `Alias ${aliasId} has already proliferated ${contentId}`
      }
    });
    return;
  }

  next();
};

/**
 * Checks if the signed in alias has already proliferated the desired content
 */
const hasAliasProliferatedContent = async (req: Request, res: Response, next: NextFunction) => {
  const aliasId = (req.session.aliasId as string) ?? '';
  const contentId = (req.params.contentId) ?? '';
  const proliferate = await ProliferateCollection.findOneByAliasIdAndContentId(aliasId, contentId);

  if (!proliferate) {
    res.status(404).json({
      error: {
        proliferateDoesNotExist: `Alias ${aliasId} has not proliferated ${contentId}`
      }
    });
    return;
  }

  next();
};

export {
  hasAliasProliferatedContent,
  hasAliasNotProliferatedContent
};
