import express, { Express } from "express";

import serverConfig from "./config/serverConfig";
import runPython from "./container/runPythonDocker";
import sampleQueueProducer from "./producers/sampleQueueProducer";
import apiRouter from "./routes";
import SampleWorker from "./workers/sampleWorker";

const app: Express = express();

app.use("/api", apiRouter);

app.listen(serverConfig.PORT, () => {
  console.log(`Server started at *: ${serverConfig.PORT}`);
  SampleWorker("SampleQueue");
  sampleQueueProducer("SampleJob", {
    name: "Rizon Kumar Rahi",
    company: "Merkle Inspire",
    position: "Software Engineer",
    location: "Remote | BLR",
  });

  const code = `print("Hello, World!")`;
  runPython(code);
});
