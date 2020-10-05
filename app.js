const venom = require('venom-bot');

venom
    .create('session name', '', '', { browserArgs: ['--no-sandbox'] })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });




function start(client) {
    client.onMessage(async(message) => {
        console.log(message)
        let groupAdmins = [];
        if (message.isGroupMsg && (message.body.toLowerCase().includes('@everyone') || message.body.toLowerCase().includes('@all'))) {
            groupAdmins = await client.getGroupAdmins(message.from).then(x => { return x });
            groupAdmins = groupAdmins.map(x => {
                return x["user"];
            })
        }

        console.log(groupAdmins);
        if ((message.body.toLowerCase().includes('@everyone') || message.body.toLowerCase().includes('@all')) && message.isGroupMsg === true && groupAdmins.includes(message.author.replace('@c.us', ''))) {

            client
                .getGroupMembersIds(message.from.toString())
                .then((result) => {
                    const groupMembers = result.map((x) => {
                        return x["user"]
                    });
                    console.log(groupMembers);
                    let messageToSend = ''
                    groupMembers.forEach(member => {
                        messageToSend += `@${member}`;

                    });

                    client.reply(message.from, messageToSend, message.id, groupMembers).then(result => { console.log(result) }).catch((error) => { console.error(error) });



                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
    });
}