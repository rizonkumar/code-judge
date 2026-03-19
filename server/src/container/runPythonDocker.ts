// import Docker from "dockerode";

import { PYTHON_IMAGE } from "../utils/constants";
import createContainer from "./containerFactory";

async function runPython(code: string) {
  console.log("Initizate the Python Docker container");
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    "python3",
    "-c",
    code,
    "stty -echo",
  ]);

  // starting the container
  await pythonDockerContainer.start();
  console.log("Started the docke container");
  return pythonDockerContainer;
}

export default runPython;
