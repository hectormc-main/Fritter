import type {Types} from 'mongoose';
import FreetCollection from '../freet/collection';
import * as freetUtil from '../freet/util';

/**
 * We might not always have freets so this is generic content
 * We don't have a data type as it only pulls data from other, more specific content
 *
 * Returns it ready for front-end use
 *
 * For now, assumes you get a Freet as I need to learn TS more
 */
class ContentCollection {
  static async findAllContentByAuthor(authorId: Types.ObjectId | string) {
    const freets = await FreetCollection.findAllByAuthorId(authorId);
    return freets.map(freet => freetUtil.constructFreetResponse(freet));
  }
}

export default ContentCollection;
