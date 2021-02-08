import {inspect} from 'util';
import {HelperTux} from './structures/core/tux.js';
import {load} from './utils/TuxProcessHelper.js';
import cluster from 'cluster';
let x = 0;
if (cluster.isMaster) {
  console.log(`Tux Process Manager Online, PID: ${process.pid}`);
  cluster.fork();
  cluster.on('exit', (worker, code, signal) => {
    x++;
    console.log(`Termination count: ${x}`);
    console.log(
      `Tux Node Handler (PID: ${worker.process.pid}) exited with code: ${code} and signal: ${signal} `
    );
    cluster.fork();
  });
} else {
  const tux = new HelperTux();
  load(tux);
  tux
    .login(process.env.TOKEN)
    .then(tux.logger.log(`Login Requested`, 'LOGIN', 'Login Method Called'));
  tux.logger.log(
    `Tux Node Handler Online, PID: ${process.pid}`,
    'INFO',
    'Tux Node Handler Online'
  );
  process
    .on('unhandledRejection', (reason, promise) =>
      tux.logger.log(
        `Unhandled Rejection at: ${inspect(promise)} reason: ${inspect(
          reason
        )}`,
        'unhandledRejection',
        'Error'
      )
    )
    .on('uncaughtException', (err, origin) =>
      tux.logger.log(
        `Error: ${inspect(err)} at ${inspect(origin)}`,
        'uncaughtException',
        'Error'
      )
    )
    .on('SIGINT', () => process.exit(0))
    .on('SIGTERM', () => process.exit(0))
    .on('beforeExit', () => process.exit(0));
}
