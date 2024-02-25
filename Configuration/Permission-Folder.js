// Sets permissions for all items inside a folder (OWNER/OBSERVER/LIMITED/NONE)

const permissionToSet = CONST.DOCUMENT_OWNERSHIP_LEVELS.OBSERVER;
const topLevelFolder = game.folders.get("WAsRuwoKFeUkDUM7");

async function setContents(folder, permission) {
    let updates = [];
    for (const document of folder.contents) {
        updates.push({_id: document._id, 'ownership.default': permission})
    }
    const subFolders = folder.getSubfolders();
    for (const folder of subFolders) {
        updates = updates.concat(await setContents(folder, permission));
    }
    return updates;
}
const updates = await setContents(topLevelFolder, permissionToSet);
topLevelFolder.documentClass.updateDocuments(updates)