exports.seed = async function (knex) {
	try {
		await knex('Template')
			.insert([
				{id:1 ,notification_template: '{{user_name}} has commented on {{task_title}} of {{client_name}}',method_id:5, event_id: 8,},
				{id:2 ,notification_template: '{{user_name}} has mentioned on {{task_title}} of {{client_name}}',method_id:5, event_id: 9,},
				{id:3 ,notification_template: '{{user_name}} has {{task_status}} the task {{task_title}} of client {{client_name}}',method_id:5, event_id: 6,},
				{id:4 ,notification_template: '{{user_name}} invited you the task {{task_title}}',method_id:5, event_id:14,},
				{id:5 ,notification_template:`
				<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset="UTF-8">
					<meta http-equiv="X-UA-Compatible" content="IE=edge">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<style>
						body {
							background-color: #F9FAFF;
							margin: auto;
						}
						.container {
							width: 100%;provider
							max-width: 600px;
							margin: auto;
						}
						.typo1 {
							display: flex;
							justify-content: center;
							color: #696F6C;
							margin-top: 52px;
							margin-bottom: 6px;
							font-size: 14px;
							line-height: 17px
						}
						.levycolor {
							color: #FB7A03;
						}
						a{
							text-decoration: none;
						}
						.containerone {
							border: 1px solid #EAEAEA;
							border-radius: 3px;
							margin-bottom: 6px;
							margin-left: 5px;
							margin-right: 5px;
							margin-top:10px;
							padding: 50px 75px;
							background: #FFFFFF;
							font-size: 18px;
							line-height: 23px;
							color: #000000
						}
						.textcenter {
							text-align: center;
						}
						.textcenter img {
							width: 54.83px;
							margin-bottom: 29px
						}
					</style>
				</head>
				<body>
					<div class="container">
						<div class="containerone">
							<div class="textcenter">
								<img src="https://levvy-data.s3.us-west-1.amazonaws.com/images/levvy_logo.png" />
							</div>
							<div style="max-width:450px">
								<p style="margin-bottom:11px">Hello {{{name}}},</p>
								<p style="margin-bottom:18px">
									Thanks for signing up with Levvy! We’re excited to have you on board and can't wait for you to explore all the possibilities your new workspace has to offer.
								</p>
								<p style="color:#696F6C">
									Get ready to say goodbye to missed deadlines, scattered information, and channel overload. With Levvy, you can eliminate digital friction and streamline workflows. Our platform provides a seamless work experience, enabling you and your team to focus on what really matters—growing your business. Levvy allows you to see the bigger picture and get more work done in less time.
								</p>
								<p style="margin-bottom:11px">
									<b>
										To activate your account, please click the button below and confirm your email address.
									</b>
								</p>
								<a target="_blank" style="width:100%" href="{{activation_link}}">
									<button style="width:100%;height:48px;background:#FB7A03;color:#ffffff;margin-top:15px;border-radius:3px;border:0">
										<b>Confirm your email</b>
									</button>
								</a>
								<p style="margin-top: 11px; margin-bottom: 11px; color:#696F6C">
									If you have any questions or need assistance, don't hesitate to contact our support team at <a style="color:#FB7A03" target="_blank" href="MAILTO:hello@levvy.com">hello@levvy.com</a>
								</p>
							</div>
						</div>
						<div style="font-weight:500;font-size:10px;line-height:16px;text-align:center;color:#696F6C">
							<h1>
								<a style="color:#FB7A03" target="_blank" href="https://levvy.com">
									<img style="width:73px;height:25px"	src="https://levvy-data.s3.us-west-1.amazonaws.com/images/Levvy.png" />
								</a>
							</h1>
			
							<p style="margin-top:2px;margin-bottom:15px">
								<a target="_blank" style="color:#FB7A03" href="MAILTO:hello@levvy.com">Contact Us</a> |
								<a target="_blank" style="color:#FB7A03">Policies</a>
							</p>
							<p>© 2023</p>
							<p style="margin-top:18px;margin-bottom:6px;color:#000000">Levvy. 388 Bridge Street 49B, Brooklyn, NY 11201 USA</p>
							<p> All rights reserved</p>
						</div>
					</div>
				</body>
				</html>
					`
					,method_id:2
					,event_id:15
				},
				{id:6 ,notification_template: `
					[
						{
							type: 'section',
							text: {
								type: 'mrkdwn',
								text: '{{user_name}} left a comment on {{task_name}}',
							},
						},
						{
							type: 'divider',
						},
						{
							type: 'section',
							text: {
								type: 'plain_text',
								text: '{{message}}',
								emoji: true,
							},
						},
					]
			`,method_id:6, event_id:8,},
			])
			.onConflict(['method_id', 'event_id'])
            .merge();
	} catch (err) {
		console.log(err);
	}
};