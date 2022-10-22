import type {Request, Response} from 'express';
import express from 'express';
import ProliferateCollection from './collection';
import * as proliferateValidator from './middleware';
import * as aliasValidator from '../alias/middleware';
import AliasCollection from '../alias/collection';
import * as util from './util';

const router = express.Router();

/**
 * Create a proliferate object in the database
 *
 * @name POST /api/proliferate/:id
 *
 * @param {string} contendId - contentId of content
 * @return {ProliferateResponse} - The created proliferate
 *
 * TODO throws
 *
 */
router.post(
  '/:contentId?',
  [
    aliasValidator.isAliasLoggedIn,
    proliferateValidator.hasAliasNotProliferatedContent
  ],
  async (req: Request, res: Response) => {
    const aliasId = (req.session.aliasId as string) ?? '';
    const proliferate = await ProliferateCollection.addOne(aliasId, req.params.contentId);

    res.status(201).json({
      message: 'You have successfully proliferated',
      alias: util.constructProliferateResponse(proliferate)
    });
  }
);

/**
 * Get the amount of proliferates on content
 *
 * @name GET /api/proliferate/:id
 *
 * @param {string} contendId - contentId of content
 *
 * TODO throws
 *
 */
router.get(
  '/:contentId?',
  [
    // TODO create does content exist validator. Should be generic and not just find freets
  ],
  async (req: Request, res: Response) => {
    const proliferates = await ProliferateCollection.findAllByContentId(req.params.contentId);

    res.status(201).json({
      message: `This content has ${proliferates.length} proliferates`,
      amount: proliferates.length
    });
  }
);

/**
 * Delete a proliferate object
 *
 * @name DELETE /api/proliferate/:id
 *
 */
router.delete(
  '/:contentId?',
  [
    aliasValidator.isAliasLoggedIn,
    proliferateValidator.hasAliasProliferatedContent
  ],
  async (req: Request, res: Response) => {
    const aliasId = (req.session.aliasId as string) ?? '';
    await ProliferateCollection.deleteOneByAliasIdAndContentId(aliasId, req.params.contentId);

    res.status(200).json({
      message: 'Content successfully unproliferated'
    });
  }
);

export {router as proliferateRouter};
