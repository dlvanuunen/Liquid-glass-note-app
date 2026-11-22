import { defaultPlacement } from "./items/placement.js";
import { createNote } from "./items/note.js";
import { addItem, addPlacement } from "./store.js";


// Add a bunch of test notes to store.
export function addTestNotes(n){

    for (let i = 0; i < n; i++){
    const noteData = createNote();
    const newItem = addItem(noteData);
    const newPlacement = addPlacement(newItem, defaultPlacement);
    }
}