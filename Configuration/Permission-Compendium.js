// Sets permissions for all compendiums (OWNER/OBSERVER/LIMITED/NONE)

for (const pack of game.packs) pack.configure({ownership:{
    PLAYER:"LIMITED",ASSISTANT:"OWNER"
    }})