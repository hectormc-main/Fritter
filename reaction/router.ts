import type {Request, Response} from 'express';
import express from 'express';
import ReactionCollection from './collection';
// Import * as reactionValidator from './middleware';
import * as aliasValidator from '../alias/middleware';
import ReactionModel from "./model";
// Import * as util from './util';

const router = express.Router();

/**
 * Create a reaction entry in the database
 *
 * @name POST /api/reactions/:contentId
 *
 * @param {string} contendId - contentId of content
 // * @return {ReactionResponse} - The created reaction
 *
 * TODO throws
 *
 */
router.post(
  '/:contentId?',
  [
    aliasValidator.isAliasLoggedIn
    // TODO additional validators
  ],
  async (req: Request, res: Response) => {
    const aliasId = (req.session.aliasId as string) ?? '';
    const reaction = await ReactionCollection.addOne(aliasId, req.params.contentId, req.body.emojiCode);

    res.status(201).json({
      message: 'You have successfully proliferated'
      // Reaction: util.constructProliferateResponse(proliferate)
    });
  }
);

/**
 * Get all reactions on content
 *
 * @name GET /api/reactions/:contentId
 *
 * @param {string} contentId - contentId of content
 */
router.get(
  '/:contentId?',
  [
    // TODO handlers
  ],
  async (req: Request, res: Response) => {
    const reactions = await ReactionCollection.findAllByContentId(req.params.contentId);

    res.status(201).json({
      reactions
    });
  }
);

/**
 * Delete a reaction entry
 *
 * @name DELETE /api/reactions/:contentId
 */
router.delete(
  '/:contentId?',
  [
    aliasValidator.isAliasLoggedIn
    // TODO handlers
  ],
  async (req: Request, res: Response) => {
    const aliasId = (req.session.aliasId as string) ?? '';
    await ReactionCollection.deleteOneByAliasIdAndContentId(aliasId, req.params.contentId);

    res.status(200).json({
      message: 'Content successfully unproliferated'
    });
  }
);

export {router as reactionRouter};
