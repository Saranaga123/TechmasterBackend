import { connect, ConnectOptions, set } from "mongoose";

export const dbConnect = () => {
  // Set strictQuery option to false to prepare for Mongoose 7
  set('strictQuery', false);

  connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions).then(
    () => console.log("Connected"),
    (error) => console.log("DB Connection Error")
  );
};