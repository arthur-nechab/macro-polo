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
})();