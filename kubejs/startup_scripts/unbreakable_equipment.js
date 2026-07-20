/*
    Ideally this would be controlled via a `frontierprotocol:uses_durability` tag, but tags
    aren't loaded yet during item modification events
*/
const durabilityExceptions = new Set(['frontierprotocol:flint_axe']);

// Prevent durability loss unless an item explicitly opts into normal durability behavior.
ItemEvents.modification((event) => {
  event.modify(
    (stack) => stack.isDamageableItem() && !durabilityExceptions.has(String(stack.id)),
    (item) => item.setUnbreakable(),
  );
});
