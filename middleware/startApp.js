import { connectDB } from "../db/connect.js";


const startApp = async (app, port) => {
    try {

       // DB connection 
        await  connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  export {startApp};