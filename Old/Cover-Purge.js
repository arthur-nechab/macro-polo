// Removes the "Cover" condition from selected tokens

function cover() {
  if (token === undefined) {
      ui.notifications.warn("Pas de token sélectionné");
  } else {
      for (let token of canvas.tokens.controlled) {
          game.cub.removeCondition("Abri partiel", token, { warn: false });
          game.cub.removeCondition("Abri important", token, { warn: false });
      }
  }
}
cover();
