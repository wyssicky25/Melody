const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const config = require("../../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("compressor")
        .setDescription("Applies the compressor effect to the current music."),
    async execute(interaction, client) {
        const queue = player.getQueue(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor(config.embedColour);

        if (!queue || !queue.playing) {
            embed.setDescription("There isn't currently any music playing.");
        } else {
            queue.setFilters({
                compressor: !queue.getFiltersEnabled().includes("compressor"),
            });
            embed.setDescription(
                `The **compressor** filter is now ${
                    queue.getFiltersEnabled().includes("compressor")
                        ? "enabled."
                        : "disabled."
                }`
            );
        }

        return await interaction.reply({ embeds: [embed] });
    },
};
