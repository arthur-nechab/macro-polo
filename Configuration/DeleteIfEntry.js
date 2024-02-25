// Here, deletes all items within a folder if they cost $100 or less

let source = game.folders.get('WAsRuwoKFeUkDUM7');
for (let i = 0; i < source.children.length; i++) {
    let child = source.children[i];
    for (let j = 0; j < child.entries.length; j++) {
        let entry = child.entries[j];
        if (entry.system.price.market < 101) {
            console.log(entry.name, entry.system.price.market);
            const toDelete = game.items.filter(i => i.id === entry._id).map(i => i.id);
            await Item.deleteDocuments(toDelete);
        }
    }
}