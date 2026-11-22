export function makeDraggable(element, placement, onMove) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    function onPointerDown(event) {
        dragging = true;

        offsetX = event.clientX - placement.x;
        offsetY = event.clientY - placement.y;

        element.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event) {
        if (!dragging) return;

        placement.x = event.clientX - offsetX;
        placement.y = event.clientY - offsetY;

        onMove();
    }

    function onPointerUp() {
        dragging = false;
    }

    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointercancel", onPointerUp);
}