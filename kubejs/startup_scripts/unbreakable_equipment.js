// Prevent durability loss without affecting energy-backed tools or other item state.
ItemEvents.modification(event => {
    event.modify(
        stack => stack.isDamageableItem(),
        item => item.setUnbreakable()
    );
});
