const mongoose = require("mongoose");
const dotenv = require("dotenv");
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
mongoose.Promise = global.Promise;
const { parsed: envs } = result;

mongoose.connect(envs.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connect = mongoose.connection;
connect.once("open", function () {
  console.log("*** MongoDB got connected ***");
  console.log(`Our Current Database Name : ${connect.db.databaseName}`);

  //Drop DB
  // mongoose.connection.db.dropDatabase(
  //   console.log(`${connect.db.databaseName} database dropped.`)
  // );
});

export default connect;
