if (!token) return void ui.notifications.error("Select a Token");

let dialogEditor = foundry.applications.api.DialogV2.wait({
    window: { title: `LightPicker` },
    buttons: [
        {
            label: `None`,
            action: "none",
            callback: () => {
                token.document.update({
                    light: { dim: 0, bright: 0, color: "00000", alpha: 1, animation: { type: "none" } }
                });
            }
        },
        {
            label: `Torch`,
            action: "torch",
            callback: () => {
                token.document.update({
                    light: {
                        dim: 40, bright: 20, color: "#ffae3d", alpha: 0.5, angle: 360,
                        animation: { type: "torch", speed: 2, intensity: 1 }
                    }
                });
            }
        },
        {
            label: `Lamp`,
            action: "lamp",
            callback: () => {
                token.document.update({
                    light: {
                        dim: 45, bright: 15, color: "#ffa200", alpha: 0.5, angle: 360,
                        animation: { type: "torch", speed: 3, intensity: 3 }
                    }
                });
            }
        },
        {
            label: `BullseyeLantern`,
            action: "bullseye",
            callback: () => {
                token.document.update({
                    light: {
                        dim: 120, bright: 60, color: "#ffa200", alpha: 0.5, angle: 45,
                        animation: { type: "torch", speed: 3, intensity: 3 }
                    }
                });
            }
        },
        {
            label: `HoodedLantern(O)`,
            action: "hoodedOpen",
            callback: () => {
                token.document.update({
                    light: {
                        dim: 60, bright: 30, color: "#ffa200", alpha: 0.5, angle: 360,
                        animation: { type: "torch", speed: 3, intensity: 3 }
                    }
                });
            }
        },
        {
            label: `HoodedLantern(C)`,
            action: "hoodedClosed",
            callback: () => {
                token.document.update({
                    light: {
                        dim: 5, bright: 0, color: "#ffa200", alpha: 0.5, angle: 360,
                        animation: { type: "torch", speed: 3, intensity: 3 }
                    }
                });
            }
        },
        {
            label: `LightCantrip`,
            action: "lightcantrip",
            callback: () => {
                token.document.update({
                    light: {
                        dim: 40, bright: 20, color: "#fffab8", alpha: 0.5, angle: 360,
                        animation: { type: "torch", speed: 2, intensity: 1 }
                    }
                });
            }
        },
        {
            label: `MoonTouched`,
            action: "moontouched",
            callback: () => {
                token.document.update({
                    light: {
                        dim: 30, bright: 15, color: "#38c0f3", alpha: 0.5, angle: 360,
                        animation: { type: "torch", speed: 1, intensity: 1 }
                    }
                });
            }
        },
        {
            label: `SunLight`,
            action: "sunlight",
            callback: () => {
                token.document.update({
                    light: {
                        dim: 60, bright: 30, color: "#fff45c", alpha: 0.6, angle: 360,
                        animation: { type: "torch", speed: 1, intensity: 5 }
                    }
                });
            }
        },
        {
            default: true,
            action: "exit",
            callback: (_event, _button, app) => app.close(),
            icon: "fas fa-check",
            label: `Exit`
        }
    ],
    form: { closeOnSubmit: false },
    render: (_event, app) => {
        const html = app.element ?? app;
        html.querySelector("footer.form-footer").style.flexDirection = "column";
        html.querySelectorAll("footer > button").forEach(e => e.style.minWidth = "-webkit-fill-available");
    }
});
