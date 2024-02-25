// Light spell for DnD

async function tokenUpdate(data) {
  const updates = canvas.tokens.controlled.map((token) => mergeObject({ _id: token.id }, data));
  await canvas.scene.updateEmbeddedDocuments("Token", updates);
}

const isGM = game.user.isGM;

let color = "#ffffff";
let alpha = 1.0;
let tokens = canvas.tokens.controlled;
if (tokens.length === 1) {
  color = tokens[0].data.lightColor;
  alpha = tokens[0].data.lightAlpha;
}

const lightAnimation = { type: "wave", speed: 1, intensity: 1 };
const energyShield = { type: "energy", speed: 2, intensity: 2 };
const lights = {
  none: {
      label: "Aucun",
      data: { light: { dim: null, bright: null, angle: 360 } },
  },
  light: {
      label: "Lumière",
      data: { light: { dim: 40, bright: 20, angle: 360, animation: lightAnimation } },
  },
};

function getLights() {
  let lightButtons = {};
  Object.entries(lights).forEach(([key, light]) => {
      lightButtons[key] = {
          label: light.label,
          callback: (html) => {
              const newColor = html.find("#color").val();
              const newAlpha = Number(html.find("#alpha").val());
              var data = light.data;
              mergeObject(data.light, { color: newColor, alpha: newAlpha });
              tokenUpdate(data);
          },
      };
  });

  lightButtons = Object.assign(lightButtons, {
      close: {
          icon: "<i class='fas fa-tick'></i>",
          label: `Fermer`,
      },
  });

  return lightButtons;
}

new Dialog({
  title: `Token Light Cantrip Configuration`,
  content: `
      <form>
          <div style="display: flex; align-content: center;">
          <label for="color" style="line-height: 25px;">Color:</label>
          <input type="color" value="${color}" id="color" style="margin-left: 10px;">
          ${isGM ? '<label for="alpha" style="line-height: 25px;">Intensity:</label>' : ""}
          <input type="${isGM ? "range" : "hidden"}" value="${alpha}" id="alpha" style="margin-left: 10px;" min="0.0" max="1.0" step="0.05">
          </div>
      </form>`,
  buttons: getLights(),
  default: "Fermer",
  close: () => {},
}).render(true);
("");
