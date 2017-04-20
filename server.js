import DotEnv from 'dotenv';
import Confidence from 'confidence';
import { createServer } from 'makeen-core';
import manifestConfig from './serverManifest.json';

DotEnv.config();

process.once('uncaughtException', console.log); // eslint-disable-line no-console

const store = new Confidence.Store(manifestConfig);
createServer(store);
