import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path';
import fs from 'node:fs';
import dotenv from 'dotenv';

dotenv.config();

function resolveHttpsOptions() {
  const certDirectory = path.resolve(__dirname, 'certs');
  const keyPath = path.join(certDirectory, process.env.KEY_FILE ?? '');
  const certPath = path.join(certDirectory, process.env.CERT_FILE ?? '');

  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    console.warn('\n⚠️  HTTPS certificate not found. Run 'npm run generate-cert' first.\n');
    return undefined;
  }

  return {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };
}

const baseServerConfig = {
  host: 'localhost',
  port: 5173
};

// https://vite.dev/config/
export default defineConfig(() => {
  const httpsOptions = resolveHttpsOptions();
  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
      }),
      react(),
    ],
    server: {
      ...baseServerConfig,
      https: httpsOptions
    },
    preview: {
      ...baseServerConfig,
      https: httpsOptions
    }
  }
});