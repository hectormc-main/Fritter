import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Alias} from './model';

// Update this if you add a property to the User type!
type AliasResponse = {
  _id: string;
  aliasname: string;
};

/**
 * Transform a raw Alias object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<Alias>} alias - A Alias object
 * @returns {AliasResponse} - The alias object
 */
const constructAliasResponse = (alias: HydratedDocument<Alias>): AliasResponse => {
  const aliasCopy: Alias = {
    ...alias.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...aliasCopy,
    _id: aliasCopy._id.toString()
  };
};

export {
  constructAliasResponse
};
