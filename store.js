// All item storage
export const store = {
  items: {},
  placements: {},
};

function generateId() {
  return crypto.randomUUID();
}

export function addItem(item) {
  const newId = generateId();
  const newItem = { ...item, id: newId };
  // should we change this line below?
  store.items[newId] = newItem;
  return newItem;
}

export function addPlacement(item, placementData) {
  const newId = generateId();
  const newPlacement = { ...placementData, id: newId, itemId: item.id };
  store.placements[newId] = newPlacement;
  return newPlacement;
}

// Persistant storage
export function saveStore() {
  localStorage.setItem("workspace", JSON.stringify(store));
}

export function loadStore() {
  const saved = localStorage.getItem("workspace");

  if (!saved) return;

  const data = JSON.parse(saved);

  store.items = data.items;
  store.placements = data.placements;
}






// UTILS
function getItemByID(id) {
  return store.items[id] ?? null;
}

function getPlacementByID(id) {
  return store.placements[id] ?? null;
}

function getPlacementWithItem(placementId) {
  const placement = getPlacementByID(placementId);

  if (!placement) return null;

  const item = getItemByID(placement.itemId);

  if (!item) return null;

  return {
    placement: placement,
    item: item,
  };
}
function getAllPlacementsWithItems() {
    return Object.keys(store.placements)
        .map(placementId => getPlacementWithItem(placementId))
        .filter(result => result !== null);
}




// "MAIN test"

// const item = addItem(exampleNote);
// const placement = addPlacement(item, examplePlacement);

// console.log(store);

// console.log(placement.id);

// console.log(getPlacementWithItem(placement.id));
