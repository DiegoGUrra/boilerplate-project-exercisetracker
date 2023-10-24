import { ObjectId } from "mongodb";

export default interface User {
    username: string;
    id: ObjectId;
};