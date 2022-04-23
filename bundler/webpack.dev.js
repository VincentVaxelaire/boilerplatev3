import path from 'path';
import { merge } from 'webpack-merge';
import commonConfiguration from './webpack.common.js';
import ip from 'ip';
const __dirname = process.cwd();
const infoColor = (_message) => {
  return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

export default merge(commonConfiguration, {
  stats: 'errors-warnings',
  mode: 'development',
  infrastructureLogging: {
    level: 'warn',
  },
  devServer: {
    host: 'local-ip',
    open: true,
    https: false,
    allowedHosts: 'all',
    hot: false,
    watchFiles: ['src/**', 'static/**'],
    static: {
      watch: true,
      directory: path.resolve(__dirname, 'static'),
    },
    client: {
      logging: 'none',
      overlay: true,
      progress: false,
    },
    onAfterSetupMiddleware: function (devServer) {
      const https = devServer.https ? 's' : '';
      const localIp = ip.address();
      const domain1 = `http${https}://${localIp}:8080`;
      const domain2 = `http${https}://localhost:8080`;

      console.log(`Local server is running at:\n - ${infoColor(domain1)}\n - ${infoColor(domain2)}`);
    }
  },
});