// Whisper to several players at the same time.

let applyChanges = false;
let users = game.users.filter((user) => user.active);
let checkOptions = "";
let playerTokenIds = users.map((u) => u.character?.id).filter((id) => id !== undefined);

let selectedPlayerIds = canvas.tokens.controlled.map((token) => {
    if (playerTokenIds.includes(token.actor.id)) return token.actor.id;
});

users.forEach((user) => {
    let checked = !!user.character && selectedPlayerIds.includes(user.character.id) && "checked";
    checkOptions += `
    <br>
    <input type="checkbox" name="${user.id}" id="${user.id}" value="${user.name}" ${checked}>\n
    <label for="${user.id}">${user.name}</label>
  `;
});

new Dialog({
    title: "Chuchotement",
    content: `Liste : ${checkOptions} <br>
    <label for="message">Message :</label>
    <textarea id="message" name="message" rows="4" cols="50"></textarea><br>`,
    buttons: {
        whisper: {
            label: "Whisper",
            callback: (html) => createMessage(html),
        },
    },
}).render(true);

function createMessage(html) {
    var targets = [];
    for (let user of users) {
        if (html.find('[name="' + user.id + '"]')[0].checked) {
            applyChanges = true;
            targets.push(user.id);
        }
        var messageText = html.find('[name="message"]')[0].value;
    }
    if (!applyChanges) return;
    ChatMessage.create({
        content: messageText,
        whisper: targets,
    });
}