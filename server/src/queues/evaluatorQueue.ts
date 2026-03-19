import { Queue } from "bullmq";

import redisConnection from "../config/redisConfig";

const evaluatorQueue = new Queue("EvaluatorQueue", {
  connection: redisConnection,
});

export default evaluatorQueue;
