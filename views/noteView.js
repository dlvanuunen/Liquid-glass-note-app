import { saveStore } from "../store.js"

export function makeEditable(element, item){

function updateItemContent(event){
    item.content=element.textContent
    saveStore()
}
  element.addEventListener("input", updateItemContent)

}


export function createNoteView(item, placement){
    
    console.log("building note view...")
    // Note
    const noteView = document.createElement("div")
    noteView.className = "note"
    noteView.style.width = placement.width + "px";
    noteView.style.height = placement.height + "px";
    noteView.style.transform =
        `translate(${placement.x}px, ${placement.y}px)`;


    // Title
    const noteViewTitle = document.createElement("div")
    noteViewTitle.className = "note-title"
    noteViewTitle.textContent = item.title ?? ""

    
    // Content
    const noteViewContent = document.createElement("div")
    noteViewContent.className = "note-content"
    noteViewContent.contentEditable="true"
    noteViewContent.textContent = item.content ?? "Enter your text here..."
    makeEditable(noteViewContent, item)

    // noteViewContent.addEventListener("input", updateItemContent(), textContent)
    
    // Delete button
    // Add
    noteView.append(noteViewTitle, noteViewContent)

    console.log("finished note view.")
    return noteView
}




// export function createNote(data) {
//     const note = document.createElement("div");
//     note.className = "note";

//     note.style.width = data.width + "px";
//     note.style.height = data.height + "px";

//     const titleBar = document.createElement("div");
//     titleBar.className = "title-bar";
//     titleBar.textContent = "Note Title";

//     const content = document.createElement("div");
//     content.className = "content";
//     content.textContent = data.text;

//     note.append(titleBar, content);

//     updateNotePosition(note, data);

//     return {
//         element: note,
//         titleBar,
//         content
//     };
// }

// export function updateNotePosition(el, data) {
//     el.style.transform =
//         `translate(${data.x}px, ${data.y}px)`;
// }