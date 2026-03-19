import Docker from "dockerode";

async function createContainer(imageName: string, cmdExecutable: string[]) {
  const docker = new Docker();

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutable,
    AttachStdin: true, // enable input streams
    AttachStdout: true, // enable output streams
    AttachStderr: true, // enable error streams
    Tty: false, // do not allocate pseudo-tty
    OpenStdin: true, // keep container open
  });
  return container;
}

export default createContainer;
