// 8h de dodo la nuit
// Vous gagnez les mêmes effets qu’un repos court
// Vous gagnez une fraction de vos dés de vie et de vos points de sorcellerie (inférieur)
// Vous gagnez une fraction de vos emplacements de sorts (inférieur, niveau 5 max)

(async()=>{
  let actorD = game.actors.get(args[0].actor._id);
  let actorN = actorD.data.name;
  let {spells} = actorD.data.data;
  let actorI = actorD.classes["wizard"];
  let actorI2 = actorD.classes["warlock"];

  let levelWizard = actorI.data.data.levels;
  let levelWarlock = actorI2.data.data.levels;
  let hitDiceUsedWizard = actorI.data.data.hitDiceUsed;
  let hitDiceUsedWarlock = actorI2.data.data.hitDiceUsed;
  
  const cum_slot_rec = 1;

  function hasAvailableSlot(actorD) {
     for (let slot in actorD.data.data.spells) {
         if (actorD.data.data.spells[slot].value < actorD.data.data.spells[slot].max) {
             return true;
         }
     }
     return false;
 }

  let content = `
    <form>
      <p>• Vous avez actuellement dépensé ${hitDiceUsedWizard+hitDiceUsedWarlock}/${levelWizard+levelWarlock} dé(s) de vie.</p>
      <p>• Vous pouvez récupérer ${cum_slot_rec} emplacement(s) de sorts de Magicien.</p>
      ${Object.entries(spells).filter(arr => arr[1].max > 0 && arr[1].value !== arr[1].max && parseInt(arr[0].charAt(5)) < 7).map(([key, value], index) => {
        return `<label for="${key}">Niveau ${key.charAt(5)} [${value.value}/${value.max}]</label><input id="${key}" type="number" value="0" min="0" max="${value.max}"><br>`;
      })}
    </form>
  `;

  new Dialog({content, title : `Repos nocturne`, 
      buttons : {
        Ok : {
          label : `Ok`,
          callback : async (html) => {
            let chat_output = "";

            if (hasAvailableSlot(actorD)) {
              let values = Array.from(html.find(`input`));
              if(values.reduce((acc,cur) => acc += (cur.valueAsNumber * parseInt(cur.id.charAt(5))), 0) > cum_slot_rec ) return ui.notifications.error(`Vous avez sélectionné trop d'emplacements de sorts !`);

              let update_data = duplicate(actorD.data); 

              for(let value of values) {
               update_data.data.spells[value.id].value += value.valueAsNumber;
               chat_output += `• ${actorN} a récupéré ${value.valueAsNumber} emplacement de sort de Magicien de niveau ${value.id.charAt(5)} (Total : ${update_data.data.spells[value.id].value})<br>`;
             }
              await actorD.update(update_data);
            }

            if(hitDiceUsedWarlock != 0) {
                actorD.updateEmbeddedDocuments("Item", [{_id: actorI2.id, "data.hitDiceUsed": hitDiceUsedWarlock - 1}]);
                chat_output += `• ${actorN} a récupéré 1 dé de vie d'Occultiste<br>`;
            } else {
              if(hitDiceUsedWizard != 0) {
                actorD.updateEmbeddedDocuments("Item", [{_id: actorI.id, "data.hitDiceUsed": hitDiceUsedWizard - 1}]);
                chat_output += `• ${actorN} a récupéré 1 dé de vie de Magicien<br>`;
              }
            }

            if(actorD.data.data.spells.pact.value != 1) {
              actorD.update({ [`data.spells.pact.value`]: actor.data.data.spells.pact.value + 1});
              // chat_output += `• ${actorN} a récupéré son emplacement de sort d'Occultiste<br>`;
            }

            // const item1 = actorD.items.getName("Item Name");
            // await item1.update({"data.uses.value": item1.data.data.uses.max});

            ChatMessage.create({ speaker: ChatMessage.getSpeaker({actor: actorD, alias: "Repos nocturne :" }), content: chat_output});
            ui.notifications.warn(`Vous regagnez vos compétences de repos court et long`);
            ui.notifications.info(`Vous gagnez une fraction de vos emplacements de sorts (inférieur)`);
            ui.notifications.info(`Vous gagnez une fraction de vos dés de vie (inférieur)`);
            ui.notifications.warn(`Vous pouvez dépenser vos dés de vie`);
          }
        },
        Cancel : {
          label : `Annuler`
        }
      }
  }).render(true);
})();