import { sessionCollection, usersCollection } from "../db/db.js";
import { ObjectId } from "mongodb"; 

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const session = await sessionCollection.findOne({ token });

  if (!session) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  const user = await usersCollection.findOne({
    _id: new ObjectId(session.userId), // অথবা _id: session.userId
  });

  if (!user) {
    return res.status(401).send({ message: "Unauthorized access" });
  }
  req.user = user;
  next();
};

export default verifyToken;