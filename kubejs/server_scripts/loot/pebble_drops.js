BlockEvents.drops('twigs:pebble', event => {
    if (event.block.down.id == 'minecraft:sand' && Math.random() < 0.2) {
        event.removeItem('twigs:pebble');
        event.addItem('minecraft:flint');
    }
});
