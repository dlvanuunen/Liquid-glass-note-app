import { createNoteView } from "../views/noteView.js";



export function createView(item, placement){
    
switch(item.type) {
  case "note":

    return createNoteView(item, placement)
    
    break;


    case "calendar-item":

    return
    break

  case "container":
    // code block
    break;
  default:
    console.log("no matching type available for createView()")
    break
} 


}