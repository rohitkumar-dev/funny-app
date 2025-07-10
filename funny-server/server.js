import app from "./app.js"
import connectToDb from './config/dbConfig.js';

app.listen(3000, async () => {
    await connectToDb();
  console.log('Server running at http://localhost:3000/');
});
