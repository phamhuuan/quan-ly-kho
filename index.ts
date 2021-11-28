import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import route from './src/routes';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || '', {});

mongoose.connection.on('connected', () => {
	console.log('Connected to mongo');
});

mongoose.connection.on('error', error => {
	console.log('Connect to mongo error', error);
});

app.use('/api', route);

// fix cors
app.all('/*', function (req, res, next) {
	// CORS headers
	res.header('Access-Control-Allow-Origin', '*'); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// Set custom headers for CORS
	res.header(
		'Access-Control-Allow-Headers',
		'Content-type,Accept,X-Access-Token,X-Key,Authorization',
	);
	if (req.method === 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

app.listen(process.env.PORT || 5000, () => {
	console.log('app listen on port 5000');
});
