import { createNote } from "./items/note.js";
import { defaultPlacement } from "./items/placement.js";
import { store, addItem, addPlacement, loadStore, saveStore } from "./store.js";
import { renderHTML } from "./graphics/renderHTML.js";
import { addNoteMesh, removeNoteMesh, noteMeshes, clearNoteMeshes } from "./graphics/renderThree.js";
import { updateNotePosition } from "./graphics/renderThree.js";
import { resizeRenderer } from "./graphics/renderThree.js";

loadStore();
renderHTML(updateNotePosition);
console.log(noteMeshes)

for (const placement of Object.values(store.placements)) {
    const storedItem = store.items[placement.itemId];
    if (!storedItem) continue;
      addNoteMesh(placement)
  

}
resizeRenderer()


//

// Adding notes

const addNoteButton = document.getElementById("add-note-button");
addNoteButton.addEventListener("click", () => {
  const newItem = addItem(createNote());
  const newPlacement = addPlacement(newItem, defaultPlacement);

  console.log("Item:", newItem, "Placement:", newPlacement);
  console.log(store);


  // const switchgenElement = createView(newItem, newPlacement)
  // workspace.append(switchgenElement);

  // const noteElement = createNoteView(newItem, newPlacement);
  // workspace.append(noteElement);
  saveStore();
  renderHTML(updateNotePosition);
  addNoteMesh(newPlacement)
  


});

const clearAllButton = document.getElementById("clear-all-button");
clearAllButton.addEventListener("click", () => {
  store.items = {};
  store.placements = {};
clearNoteMeshes()
  saveStore();
  renderHTML(updateNotePosition);

  

  return;
});


