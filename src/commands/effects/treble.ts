import { ChatInputCommandInteraction, ColorResolvable, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { useMainPlayer } from "discord-player";
import config from "../../config";

export default {
    data: new SlashCommandBuilder().setName("treble").setDescription("Applies the treble effect to the current music.").setDMPermission(false),
    async execute(interaction: ChatInputCommandInteraction) {
        const player = useMainPlayer();
        const queue = player.nodes.get(interaction.guild.id);

        const embed = new EmbedBuilder();
        embed.setColor(config.embedColour as ColorResolvable);

        if (!queue || !queue.isPlaying()) {
            embed.setDescription("There isn't currently any music playing.");
        } else {
            queue.filters.ffmpeg.toggle(["treble"]);
            embed.setDescription(`The **treble** filter is now ${queue.filters.ffmpeg.filters.includes("treble") ? "enabled." : "disabled."}`);
        }

        return await interaction.reply({ embeds: [embed] });
    },
};
