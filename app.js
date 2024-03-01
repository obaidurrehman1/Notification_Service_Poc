const express = require("express");
const dotenv = require("dotenv");
const app = express();
const databaseConfig = require('./database/DatabaseConfig');
const {connectMongo, disconnectMongo} = require('./database/mongoConnection');

databaseConfig.initializeDB();
app.use(express.json());
dotenv.config();

app.get("/", (req, res) => {
  res.send("helloooooooo");
});

const port = process.env.PORT || 4500;


const shutDown = async () => {
	logger.info('Server starting cleanup');

	try{
		await new Promise((resolve, reject) => {
			setTimeout(() => {
				logger.info('Server closed!');
				resolve();
			}, 30000);

			server.close((error) => {
				if (error) {
					logger.error(error.message);
					reject(error.message);
					return;
				}
				logger.info('Server closed!');
				resolve();
			});
		});
		// await dbConfig.destroyKnex();
		await disconnectMongo();
		await databaseConfig.destroyKnex();
		logger.info(`Cleanup complete! ${Date.now()}`);
	} catch (error) {
		logger.error(`Shutdown error: ${error.message}`);
	}
};

app.get('/shutdown', async (req, res) => {
	logger.info('Shutting down!.');
	await shutDown();
	res.sendStatus(200);
});

app.listen(port, async () => {
  await connectMongo();
  console.log(`Server is running ${port}`);
});