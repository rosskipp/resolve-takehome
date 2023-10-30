import http from 'http';
import app from './app';

const server = http.createServer(app).listen(app.get('port'), () => {
  console.log(
    `🚀 Server ready at: http://127.0.0.1:${app['settings']['port']} in ${app['settings']['env']} mode`,
  );
  console.log('  Press CTRL-C to stop\n');
});

export default server;