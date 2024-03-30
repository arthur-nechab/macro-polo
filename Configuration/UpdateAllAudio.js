// Sets the volume of all sounds in all playlists at 0.2

for(let playlist of game.playlists) {
    const updates = playlist.sounds.map(s => ({_id: s.id, volume: 0.2}));
    await playlist.updateEmbeddedDocuments("PlaylistSound", updates);
}