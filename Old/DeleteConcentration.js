// Removes the "Concentrated" condition on selected tokens

function concentration() {
  if (token === undefined) {
      ui.notifications.warn("Pas de token sélectionné");
  } else {
      for (let token of canvas.tokens.controlled) {
          game.cub.removeCondition("Concentré", token, { warn: false });
      }
  }
}
concentration();