import { ObjectId } from "mongodb";

export default interface User {
    username: string;
    _id?: ObjectId;
};