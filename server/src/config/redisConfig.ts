import serverConfig from "./serverConfig";

const redisConnection = {
  port: serverConfig.REDIS_PORT,
  host: serverConfig.REDIS_HOST,
  maxRetriesPerRequest: null,
};

export default redisConnection;
