// Deletes all templates on a scene

function deletetemplate() {
    let ids = canvas.templates.placeables.filter((i) => i.owner).map((i) => i.id);
    canvas.scene.deleteEmbeddedDocuments("MeasuredTemplate", ids);
}
deletetemplate();