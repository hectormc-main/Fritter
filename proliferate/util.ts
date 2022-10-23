import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Proliferate} from './model';

type ProliferateResponse = {
  _id: string;
  aliasId: string;
  contentId: string;
};

const constructProliferateResponse = (proliferate: HydratedDocument<Proliferate>): ProliferateResponse => {
  const proliferateCopy: Proliferate = {
    ...proliferate.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  return {
    ...proliferateCopy,
    _id: proliferateCopy._id.toString(),
    followerId: proliferateCopy.followerId.toString(),
    contentId: proliferateCopy.contentId.toString()
  };
};

export {
  constructProliferateResponse
};
