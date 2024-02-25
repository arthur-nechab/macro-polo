// 48h de repos dans un lieu calme, confortable et sans danger (village, ville, forteresse)
// Réinitialisation complète des points de vie, des dés de vies et des emplacements de sorts
// Vous gagnez votre DV en points de vie temporaire :)

let actorD = game.actors.get(args[0].actor._id);
let actorName = actorD.data.name;
let x = false;

if (actorName="Ishara Ambrosio"){
	if (actorD.data.data.attributes.hp.value = actorD.data.data.attributes.hp.max){
		x = true;
	}
	await actorD .longRest({dialog: false, chat: false, newDay: false});
	if(actorD.data.data.attributes.hp.value == actorD.data.data.attributes.hp.max){
		const r6 = await new Roll("1d6").evaluate();
		actorD.update({'data.attributes.hp.temp': r6.total});
		ui.notifications.info(`Vous gagnez votre DV en points de vie temporaire :)`);
	}
	ui.notifications.warn(`Réinitialisation complète des points de vie, des dés de vies et des emplacements de sorts`);
}else{
	if (actorD.data.data.attributes.hp.value = actorD.data.data.attributes.hp.max){
		x = true;
	}
	await actorD .longRest({dialog: false, chat: false, newDay: false});
	if (x){
		const r8 = await new Roll("1d8").evaluate();
		actorD.update({'data.attributes.hp.temp': r8.total});
		ui.notifications.info(`Vous gagnez votre DV en points de vie temporaire :)`);
	}
	ui.notifications.warn(`Réinitialisation complète des points de vie, des dés de vies et des emplacements de sorts`);
}