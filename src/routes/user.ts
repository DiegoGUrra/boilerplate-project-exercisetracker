import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";

export const usersRouter = express.Router();

usersRouter.use(express.json());
usersRouter.use(express.urlencoded({ extended: false }));
usersRouter.get("/api/users", async (_req: Request, res: Response) => {
    try {
       const users = (await collections.users!.find<User>({}).toArray()) as User[];
        res.status(200).send(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});
usersRouter.get("api/users/:id", async (req: Request, res: Response) => {
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

usersRouter.post("/api/users", async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
        const newUser = req.body as User;
        console.log(newUser)
        const result = await collections.users!.insertOne(newUser);
        result
            ? res.status(201).send(`{"username":"${newUser.username}","_id":"${result.insertedId}"}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error:any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
