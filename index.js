import express from 'express';
import path from 'node:path';
import * as url from 'url';

import { log } from './utils.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));

app.listen(process.env.PORT, () => log(`Server started on ${process.env.PORT} port`));