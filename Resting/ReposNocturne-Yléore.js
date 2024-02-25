// 8h de dodo la nuit
// Vous gagnez les mêmes effets qu’un repos court
// Vous gagnez une fraction de vos dés de vie et de vos points de sorcellerie (inférieur)
// Vous gagnez une fraction de vos emplacements de sorts (inférieur, niveau 5 max)

(async()=>{
  let actorD = game.actors.get(args[0].actor._id);
  let actorN = actorD.data.name;
  let actorI = actorD.classes["rogue"];
  let level = actorI.data.data.levels;
  let hitDiceUsed = actorI.data.data.hitDiceUsed;

  let chat_output = "";
  if(hitDiceUsed != 0) {
    actorD.updateEmbeddedDocuments("Item", [{_id: actorI.id, "data.hitDiceUsed": hitDiceUsed - 1}]);
    chat_output += `• ${actorN} a récupéré 1 dé de vie<br>`;
  }
  ChatMessage.create({ speaker: ChatMessage.getSpeaker({alias: "Résumé :" }), content: chat_output});
  ui.notifications.warn(`Vous regagnez vos compétences de repos court et long`);
  ui.notifications.info(`Vous gagnez une fraction de vos dés de vie`);
  ui.notifications.warn(`Vous pouvez dépenser vos dés de vie`);
})();