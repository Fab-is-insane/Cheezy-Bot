const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!')
});

client.login("NzcyNzQ2MDkwMjUyMzM3MTgy.X5_J4A.hSnZO-ZFhWXmjxx1xu1APK7MPMo");
{

	}

client.on('message', message => {
	if (message.content === '@ping') {  
	  message.channel.send(`*Here is your Ping!🏓*
	**${Date.now() - message.createdTimestamp}ms.**`);
	}
  });

  client.on('message', message => {
	if (message.content === 'elloo') {  
	  message.channel.send(`Imagine Saying Elloo`);
	}
  });

  client.on('message', message => {
	if (message.content === 'Imagine') {  
	  message.channel.send(`Imagine,Imagine,Imagine,Imagine,Imagine,Imagine,Imagine,Imagine,Imagine,Imagine`);
	}
  });

  client.on('message', message => {
	if (message.content === 'Bruh') {  
	  message.channel.send(`😑`);
	}
  });

  client.on('message', message => {
	if (message.content === 'xD') {  
	  message.channel.send(`😐`);
	}
  });

  client.on('message', message => {
	if (message.content === 'Eat_invite') {  
	  message.channel.send(`Here Is my invite code,we Will have literall Fun there saying "Bruh"................Imagine!https://discord.com/api/oauth2/authorize?client_id=785878440909602876&permissions=0&scope=bot`);
	}
  });

  client.on('message', message => {
	if (message.content === 'WTF') {  
	  message.channel.send(`Imagine!`);
	}
  });

  client.on('message', message => {
	if (message.content === 'Eat_commands') {  
	  message.channel.send(`Want to know the command?
	  take a look
	  **elloo
	  Bruh
	  xD
	  Imagine
	  Eat_invite
	  @ping**`);
	}
  });

  client.on("ready", () => {
	console.log(`Bot: Hosting ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
	client.user.setActivity(`imagine and just imagine`);
  });

  client.on('message', message => {
	if (message.content === 'FUCK') {  
	  message.channel.send(`Want to know the command?
	  take a look
	  **Shut THE ||FUCK||UP**`);
	}
  });

  client.on('message', message => {
	if (message.content === 'WHAT THE FUCK') {  
	  message.channel.send(`xD
	  **Shut THE ||FUCK||UP**`);
	}
});

	  client.on('message', message => {
		if (message.content === 'lol') {  
		  message.channel.send(`xD`);
		}
	});


	const { executionAsyncResource } = require('async_hooks');
	const ytdl = require('ytdl-core');
	 
	const { YTSearcher } = require('ytsearcher');
	 
	const searcher = new YTSearcher({
		key: "AIzaSyB9AjiW8C0kwRdZQkoiiyfv4X-pupGYEm0",
		revealed: true
	});
	 
	const queue = new Map();
	 
	client.on("ready", () => {
		console.log("I am online!")
	})
	 
	client.on("message", async(message) => {
		const prefix = '$';
	 
		const serverQueue = queue.get(message.guild.id);
	 
		const args = message.content.slice(prefix.length).trim().split(/ +/g)
		const command = args.shift().toLowerCase();
	 
		switch(command){
			case 'play':
				execute(message, serverQueue);
				break;
			case 'stop':
				stop(message, serverQueue);
				break;
			case 'skip':
				skip(message, serverQueue);
				break;
		}
	 
		async function execute(message, serverQueue){
			let vc = message.member.voice.channel;
			if(!vc){
				return message.channel.send("Please join a voice chat first");
			}else{
				let result = await searcher.search(args.join(" "), { type: "video" })
				const songInfo = await ytdl.getInfo(result.first.url)
	 
				let song = {
					title: songInfo.videoDetails.title,
					url: songInfo.videoDetails.video_url
				};
	 
				if(!serverQueue){
					const queueConstructor = {
						txtChannel: message.channel,
						vChannel: vc,
						connection: null,
						songs: [],
						volume: 10,
						playing: true
					};
					queue.set(message.guild.id, queueConstructor);
	 
					queueConstructor.songs.push(song);
	 
					try{
						let connection = await vc.join();
						queueConstructor.connection = connection;
						play(message.guild, queueConstructor.songs[0]);
					}catch (err){
						console.error(err);
						queue.delete(message.guild.id);
						return message.channel.send(`Unable to join the voice chat ${err}`)
					}
				}else{
					serverQueue.songs.push(song);
					return message.channel.send(`The song has been added ${song.url}`);
				}
			}
		}
		function play(guild, song){
			const serverQueue = queue.get(guild.id);
			if(!song){
				serverQueue.vChannel.leave();
				queue.delete(guild.id);
				return;
			}
			const dispatcher = serverQueue.connection
				.play(ytdl(song.url))
				.on('finish', () =>{
					serverQueue.songs.shift();
					play(guild, serverQueue.songs[0]);
				})
				serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].url}`)
		}
		function stop (message, serverQueue){
			if(!message.member.voice.channel)
				return message.channel.send("You need to join the voice chat first!")
			serverQueue.songs = [];
			serverQueue.connection.dispatcher.end();
		}
		function skip (message, serverQueue){
			if(!message.member.voice.channel)
				return message.channel.send("You need to join the voice chat first");
			if(!serverQueue)
				return message.channel.send("There is nothing to skip!");
			serverQueue.connection.dispatcher.end();
		}
	})
	
