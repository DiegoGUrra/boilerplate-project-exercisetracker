import { ObjectId } from "mongodb";

export default interface Excercise {
    userId: string;
    _id?: ObjectId;
    description: string;
    duration: Number;
    date: number;
};