if (!token) return void ui.notifications.error("Select a Token");

const lights = [
    { label: "None", icon: "fas fa-ban", light: { dim: 0, bright: 0, color: "#000000", alpha: 1, animation: { type: "none" } } },
    { label: "Torch", icon: "fas fa-fire", light: { dim: 40, bright: 20, color: "#ffae3d", alpha: 0.5, angle: 360, animation: { type: "torch", speed: 2, intensity: 1 } } },
    { label: "Lantern", icon: "fas fa-lightbulb", light: { dim: 60, bright: 30, color: "#ffa200", alpha: 0.5, angle: 360, animation: { type: "torch", speed: 3, intensity: 3 } } },
    { label: "Bullseye Lantern", icon: "fas fa-bullseye", light: { dim: 120, bright: 60, color: "#ffa200", alpha: 0.5, angle: 45, animation: { type: "torch", speed: 3, intensity: 3 } } },
    { label: "Hooded Open", icon: "fas fa-lightbulb", light: { dim: 60, bright: 30, color: "#ffa200", alpha: 0.5, angle: 360, animation: { type: "torch", speed: 3, intensity: 3 } } },
    { label: "Hooded Closed", icon: "fas fa-lightbulb-slash", light: { dim: 5, bright: 0, color: "#ffa200", alpha: 0.5, angle: 360, animation: { type: "torch", speed: 3, intensity: 3 } } },
    { label: "Light Cantrip", icon: "fas fa-star", light: { dim: 40, bright: 20, color: "#fffab8", alpha: 0.5, angle: 360, animation: { type: "torch", speed: 2, intensity: 1 } } },
    { label: "Moon Touched", icon: "fas fa-moon", light: { dim: 30, bright: 15, color: "#38c0f3", alpha: 0.5, angle: 360, animation: { type: "torch", speed: 1, intensity: 1 } } },
    { label: "Sun Light", icon: "fas fa-sun", light: { dim: 60, bright: 30, color: "#fff45c", alpha: 0.6, angle: 360, animation: { type: "torch", speed: 1, intensity: 5 } } }
];

let dialogEditor = foundry.applications.api.DialogV2.wait({
    window: { title: `LightPicker (D&D 5e)` },
    buttons: lights.map(l => ({
        label: l.label,
        icon: l.icon,
        action: l.label.toLowerCase().replace(/\s/g, ""),
        callback: () => token.document.update({ light: l.light })
    })).concat({
        default: true,
        action: "exit",
        callback: (_event, _button, app) => app.close(),
        icon: "fas fa-check",
        label: `Exit`
    }),
    form: { closeOnSubmit: false },
    render: (_event, app) => {
        const html = app.element ?? app;
        const footer = html.querySelector("footer.form-footer");
        footer.style.display = "grid";
        footer.style.gridTemplateColumns = "repeat(3, 1fr)";
        footer.style.gridGap = "5px";
        footer.style.justifyItems = "stretch";
        footer.querySelectorAll("button").forEach(btn => {
            btn.style.display = "flex";
            btn.style.flexDirection = "column";
            btn.style.alignItems = "center";
            btn.style.justifyContent = "center";
            btn.style.minHeight = "50px";
        });
    }
});
