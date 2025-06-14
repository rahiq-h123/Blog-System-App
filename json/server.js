import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const app = jsonServer.create();
const router = jsonServer.router("db.json");

app.db = router.db;

app.use(cors()); 
app.use(jsonServer.defaults());
app.use(auth); 
app.use(router);

app.listen(5000, () => {
  console.log("JSON Server is running on http://localhost:5000");
});
