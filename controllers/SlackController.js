const SlackUser = require('../database/models/SlackUser');
const SlackWorkspace = require('../database/models/SlackWorkspace');
const axios = require('axios');

module.exports = {
	message: async (user, text) => {
		try {
			const user_data = await SlackUser.query().where('user_id', user);

			if(user_data){
				const access_token_data = await SlackWorkspace.query().findOne({slack_user_id: user_data[0].slack_user_id});
				const accessToken = (access_token_data.slack_team_name === 'Levvy' && access_token_data.slack_team_id === 'T02GMUL4C30')
                ? process.env.SLACK_BOT_TOKEN
                : access_token_data.access_token;
				
				console.log('access_token_data', accessToken);

				const URL = 'https://slack.com/api/chat.postMessage';
            	const body = {
                	channel: user_data[0].slack_user_id,
                	blocks: text,
            	};	
				const header = {
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json; charset=utf-8',
						Accept: 'application/json',
					},
				};
				const data = await axios.post(URL, JSON.stringify(body), header);

				console.log(data);
			}
		} catch (error) {
			return error;
		}
	}
};