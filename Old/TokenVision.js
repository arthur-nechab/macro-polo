// Changes the light emitted by a token depending on the light source

function tokenUpdate(data) {
  canvas.tokens.controlled.map(token => token.document.update(data));
}

const torchAnimation = {type: "torch", speed: 2, intensity: 2};
const bladeAnimation = {type: "torch", speed: 3, intensity: 3};

let dialogEditor = new Dialog({
  title: `Token Light Configuration`,
  buttons: {
    candle: {
      label: `Bougie`,
      callback: () => {
        tokenUpdate({
          "light": {
            "dim": 10, 
            "bright": 5, 
            "angle": 360,
            "animation": torchAnimation
          }
        });
        dialogEditor.render(true);
      }
    },
    torch: {
      label: `Torche`,
      callback: () => {
        tokenUpdate({
          "light": {
            "dim": 40, 
            "bright": 20, 
            "angle": 360,
            "animation": torchAnimation
          }
        });
        dialogEditor.render(true);
      }
    },
    hoodedOpen: {
      label: `Lanterne (Ouverte)`,
      callback: () => {
        tokenUpdate({
          "light": {
            "dim": 60, 
            "bright": 30, 
            "angle": 360,
            "animation": torchAnimation
          }
        });
        dialogEditor.render(true);
      }
    },
    hoodedClosed: {
      label: `Lanterne (Fermée)`,
      callback: () => {
        tokenUpdate({
          "light": {
            "dim": 5, 
            "bright": 0, 
            "angle": 360,
            "animation": torchAnimation
          }
        });
        dialogEditor.render(true);
      }
    },
    flameblade: {
      label: `Lame de feu`,
      callback: () => {
        tokenUpdate({
          "light": {
            "dim": 20, 
            "bright": 10, 
            "angle": 360,
            "animation": bladeAnimation
          }
        });
        dialogEditor.render(true);
      }
    },
    none: {
      label: `Aucun`,
      callback: () => {
        tokenUpdate({
          "light": {
            "dim": null, 
            "bright": null, 
            "angle": 360
          }
        });
        dialogEditor.render(true);
      }
    },
    close: {
      icon: "<i class='fas fa-tick'></i>",
      label: `Fermer`
    },
  },
  default: "close",
  close: () => {}
});
dialogEditor.render(true)