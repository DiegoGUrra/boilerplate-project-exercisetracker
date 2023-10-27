import express, {Response,Request} from 'express';
import cors from 'cors';
// import mongoose, {Schema} from 'mongoose';
// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
import { usersRouter } from './routes/user';
import { connectToDatabase } from './services/database.service';
import { exercisesRouter } from './routes/exercise';
import { logsRouter } from './routes/logs';
const app = express();
const port = 3000
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(usersRouter);
app.use(exercisesRouter);
app.use(logsRouter)
app.use(express.urlencoded({ extended: false }));
app.get('/', (_,res: Response) => {
    res.sendFile(process.cwd()+'/views/index.html')
});

/* app.post('/api/users', (req: Request,res: Response) => {
    res.send('Hello');
}); */
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log('Your app is listening on port ' + port  )
})
});



/* const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://diego:<password>@cluster0.qwgik3f.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir); */