ItemEvents.toolTierRegistry(event => {
    event.addBasedOnExisting('flint', 'wood', tier => {
        tier.uses = 1;
        tier.speed = 2.0;
        tier.attackDamageBonus = 0.0;
        tier.enchantmentValue = 0;
        tier.repairIngredient = 'minecraft:flint';
    });
});

StartupEvents.registry('item', event => {
    event.create('frontierprotocol:flint_axe', 'axe')
        .displayName('Flint Axe')
        .tier('flint')
        .texture('minecraft:item/stone_axe')
        .attackDamageBaseline(5.0)
        .speedBaseline(-3.2)
        .unstackable();
});
