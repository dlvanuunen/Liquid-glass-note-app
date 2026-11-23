import { makeDraggable } from "../physics/drag.js";
import { store } from "../store.js";
import { addTestNotes } from "../test.js";
import { createView } from "./createView.js";
import { addNoteMesh } from "./renderThree.js";

const workspaceContent = document.getElementById("workspace-content");


//
// Main render function
//
export function renderHTML(onDrag) {
  console.log("render.js started...");
  console.log("clearing workspace...");
  workspaceContent.replaceChildren();

  console.log("creating new views...");

  for (const placement of Object.values(store.placements)) {
    const storedItem = store.items[placement.itemId];
    if (!storedItem) continue;

    const element = createView(storedItem, placement);
    if (element) {
      workspaceContent.append(element);
    
    

      makeDraggable(element, placement, () => {
        element.style.transform = `translate(${placement.x}px, ${placement.y}px)`;
        onDrag?.(placement);
       }
        );

    }
  }
  return;
}

