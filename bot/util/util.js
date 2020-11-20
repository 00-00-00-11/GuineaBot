//This is used in music commands so members who are not in the same voice channel as GuineaBot cannot modify the music queue

module.exports = {
  canModifyQueue(member, channel) {
    const { channelID } = member.voice;
    const botChannel = member.guild.voice.channelID;

    if (channelID !== botChannel) {
      channel.send(`You need to join the voice channel first, ${member}!`).catch(console.error);
      return;
    }

    return true;
  }
};