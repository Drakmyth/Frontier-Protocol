ServerEvents.recipes(event => {
    event.remove({ id: 'twigs:stick_from_twig' });

    event.shapeless('minecraft:stick', [
        'twigs:twig'
    ])
        .group('sticks')
        .id('twigs:stick_from_twig');
});
