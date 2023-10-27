import { ObjectId } from "mongodb";

export default interface Excercise {
    userId: ObjectId;
    _id?: ObjectId;
    description: string;
    duration: Number;
    date: number;
};