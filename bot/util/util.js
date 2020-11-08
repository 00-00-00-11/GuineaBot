module.exports = {
  canModifyQueue(member, channel) {
    const {
      channelID
    } = member.voice;
    const botChannel = member.guild.voice.channelID;

    if (channelID !== botChannel) {
      channel.send(`You need to join the voice channel first, ${member}!`).catch(console.error);
      return;
    }

    return true;
  }
};