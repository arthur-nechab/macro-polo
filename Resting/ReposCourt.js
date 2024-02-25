// 1h d’activité sans effort (sieste, repas)
// Vous regagnez vos compétences de repos court
// Tous les dés de vie peuvent être dépensés

let actorD = game.actors.get(args[0].actor._id);
let actorName = actorD.data.name;

switch(actorName) {
	case 'Heskan Myastan':
		ui.notifications.warn(`Vous pouvez dépenser vos dés de vie`);
		break;
	case "Ishara Ambrosio":
		if(actorD.data.data.spells.pact.value != 2) {
    		actorD.update({ [`data.spells.pact.value`]: actor.data.data.spells.pact.value + 1 });
		}
		ui.notifications.info(`Vous regagnez vos emplacements de sorts d'occultiste`);
		ui.notifications.warn(`Vous pouvez dépenser vos dés de vie`);
		break;
	case "Marius Ignatiusanima":
		const item1 = actorD.items.getName("Conduit divin");
		await item1.update({"data.uses.value": item1.data.data.uses.max});
		ui.notifications.info(`Vous regagnez vos compétences de repos court (Conduit divin)`);
		ui.notifications.warn(`Vous pouvez dépenser vos dés de vie`);
		break;
	case "Valya":
		ui.notifications.warn(`Vous pouvez dépenser vos dés de vie`);
		break;
	case "Yléore Brindesaule":
		const item2 = actorD.items.getName("Forme sauvage");
		await item2.update({"data.uses.value": item1.data.data.uses.max});
		ui.notifications.info(`Vous regagnez vos compétences de repos court (Forme sauvage)`);
		ui.notifications.warn(`Vous pouvez dépenser vos dés de vie`);
		break;
}