import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";
import Exercise from "../models/excercise";

export const exercisesRouter = express.Router();

exercisesRouter.use(express.json());
exercisesRouter.use(express.urlencoded({ extended: false }));

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
});
 */
exercisesRouter.post("/api/users/:id/exercises", async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id;
        let date = new Date(req.body.date).getTime()
        console.log({date: req.body.date, date2: date})
        if (isNaN(date) ) {
            date = new Date().getTime()
        }
        let newExercise = {userId: id as string, description: req.body.description, duration: Number(req.body.duration), date: date} as Exercise;
        console.log({newExercise});
        const query = { _id: new ObjectId(id) };
        const user = (await collections.users!.findOne<User>(query)) as User;
        // Object.defineProperty(newLog,"userId" as PropertyKey,Object.getOwnPropertyDescriptor(newLog,"_id")!)
        const result = await collections.exercises!.insertOne(newExercise);
        console.log({user})
        result
            ? res.status(201).json({"_id": user["_id"], "username":user.username, "date":new Date(newExercise.date).toDateString(),"duration":newExercise.duration,"description":newExercise.description})
            : res.status(500).send("Failed to create a new user.");
    } catch (error:any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});


