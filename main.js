import { createNote } from "./items/note.js";
import { createView } from "./graphics/createView.js";
import { makeDraggable } from "./physics/drag.js";
import { defaultPlacement } from "./items/placement.js";
import { store, addItem, addPlacement, loadStore, saveStore } from "./store.js";
import { initWebGL, render } from "./graphics/render.js";



const workspace = document.getElementById("workspace-content");


loadStore();
render();
initWebGL();

//

// Adding notes

const addNoteButton = document.getElementById("add-note-button");
addNoteButton.addEventListener("click", () => {
  const noteData = createNote();
  const newItem = addItem(noteData);
  const newPlacement = addPlacement(newItem, defaultPlacement);

  console.log("Item:", newItem, "Placement:", newPlacement);
  console.log(store);

  // const switchgenElement = createView(newItem, newPlacement)
  // workspace.append(switchgenElement);

  // const noteElement = createNoteView(newItem, newPlacement);
  // workspace.append(noteElement);
  saveStore();
  render();
});

const clearAllButton = document.getElementById("clear-all-button");
clearAllButton.addEventListener("click", () => {
  store.items = {};
  store.placements = {};
  saveStore();
  render();
  return;
});





// Old
// const note = createNote(noteData)

// workspace.append(note.element);

// makeDraggable(
//     note.titleBar,
//     noteData,
//     () => updateNotePosition(note.element, noteData)
// );
