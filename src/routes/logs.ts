import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";
import Exercise from "../models/excercise";

export const logsRouter = express.Router();

logsRouter.use(express.json());
logsRouter.use(express.urlencoded({ extended: false }));

/* logsRouter.post("api/users/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users!.findOne<User>(query)) as User;

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}); */

logsRouter.get("/api/users/:id/logs", async (req: Request, res: Response) => {
    try {
        console.log("GET LOGS")
        const id = req?.params?.id;
        const from = req.query.from as string;
        const to = req.query.to;
        let limit = parseInt(req.query.limit as string);
        const queryOptions = {} as {date?: {"$lt"?: number, "$gt"?: number}};
        console.log({id,from,to,limit,params : req.params,query: req.query})
        // console.log(req.body)
        // let newExercise = {userId: req.body[':_id'], description: req.body.description, duration: Number(req.body.duration), date: new Date(req.body.date).toDateString()} as Exercise;
        // console.log({newExercise});
        const queryUser = { _id: new ObjectId(id) };
        const user = (await collections.users!.findOne<User>(queryUser)) as User;
        if (from !== undefined) {
            const dateNumber = new Date(from).getTime()
            if (!isNaN(dateNumber)) {
                queryOptions.date = {};
                queryOptions.date["$gt"] = dateNumber;
            }
        }
        if (to !== undefined) {
            const dateNumber = new Date(from).getTime()
            if (!isNaN(dateNumber)) {
                if (!queryOptions.date) {
                    queryOptions.date = {};
                }
                queryOptions.date!["$lt"] = dateNumber;
            }
        }
        if (isNaN(limit)) {
            limit = 0;
        }
        const queryExercises = {userId: id, ...queryOptions};
        const exercises = (await collections.exercises!.find<Exercise>(queryExercises).limit(limit).toArray()) as Exercise[];
        console.log({user,exercises});
        res.status(201).json({username:user.username,count:exercises.length, "_id":user["_id"],log: exercises.map((e) =>  ({
            description: e.description,
            duration: Number(e.duration),
            date: new Date(e.date).toDateString()
        }))})
        // Object.defineProperty(newLog,"userId" as PropertyKey,Object.getOwnPropertyDescriptor(newLog,"_id")!)
        /* const result = await collections.logs!.insertOne(newExercise);
        console.log({user})
        result
            ? res.status(201).json({"_id": user["_id"], "username":user.username, "date":newExercise.date,"duration":newExercise.duration,"description":newExercise.description})
            : res.status(500).send("Failed to create a new user."); */
    } catch (error:any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});


