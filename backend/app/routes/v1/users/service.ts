import { IQuery, IUserModel } from "../../../types";
import model from "./model";
import { ClientSession } from "mongoose";

async function getMaxCount({ filter }: IQuery) {
  const { __t, ...res } = filter;
  return await model.countDocuments({ deleted: false, ...res });
}

async function getAll({
  page = 1,
  limit = 10,
  filter = {},
  populate = "",
}: IQuery) {
  const { __t, ...res } = filter;
  return await model
    .find({ ...res, deleted: false, __t })
    .populate(populate)
    .limit(limit * 1)
    .skip(limit == 0 ? 0 : (page - 1) * limit);
}

async function getById(_id: string) {
  return await model.findOne({ _id, deleted: false });
}

async function add(_body: Partial<IUserModel>, session: ClientSession) {
  return await model.create([_body], { session });
}

async function update(
  filter: any,
  _body: Partial<IUserModel>,
  session: ClientSession
) {
  return await model.findOneAndUpdate(filter, _body, { new: true, session });
}

async function removeOne(filter: any, session: ClientSession) {
  return await model.findOneAndUpdate(
    filter,
    { deleted: true },
    { new: true, session }
  );
}

export default { getAll, getMaxCount, getById, add, update, removeOne };
