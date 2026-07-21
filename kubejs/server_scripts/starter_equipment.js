const CuriosApi = Java.loadClass('top.theillusivec4.curios.api.CuriosApi');

const craftingSlot = 'crafting_on_a_stick';
const starterEquipmentMarker = 'frontierprotocol_received_starter_equipment';

PlayerEvents.loggedIn((event) => {
    const player = event.player;

    if (player.persistentData.getBoolean(starterEquipmentMarker)) {
        return;
    }

    const curiosInventory = CuriosApi.getCuriosInventory(player).orElse(null);

    if (curiosInventory === null) {
        return;
    }

    const slotHandler = curiosInventory.getStacksHandler(craftingSlot).orElse(null);

    if (slotHandler === null || !slotHandler.getStacks().getStackInSlot(0).isEmpty()) {
        return;
    }

    curiosInventory.setEquippedCurio(
        craftingSlot,
        0,
        Item.of('crafting_on_a_stick:crafting_table'),
    );
    player.persistentData.putBoolean(starterEquipmentMarker, true);
});
