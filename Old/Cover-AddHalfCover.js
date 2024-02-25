// Adds the "Partial Cover" condition to selected tokens

function cover() {
    if (token === undefined) {
        ui.notifications.warn("Pas de token sélectionné");
    } else {
        for (let token of canvas.tokens.controlled) {
            game.cub.addCondition("Abri partiel", token, { warn: false });
        }
    }
}
cover();