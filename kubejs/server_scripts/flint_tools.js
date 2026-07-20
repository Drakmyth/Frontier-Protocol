const $FlintStartChopEvent = Java.loadClass('ht.treechop.api.ChopEvent$StartChopEvent');
const $FlintTreeChop = Java.loadClass('ht.treechop.TreeChop');
const $FlintDataComponents = Java.loadClass('net.minecraft.core.component.DataComponents');

/*
TreeChop calls ItemStack.mineBlock after every intermediate chop. Temporarily suppress that durability hit so
the axe's one durability is spent only by the chop that actually fells the tree. Ordinary block breaking still
uses vanilla durability behavior and therefore consumes the axe immediately.
*/
NativeEvents.onEvent($FlintStartChopEvent, event => {
    const player = event.player;
    const axe = player.mainHandItem;

    if (axe.id !== 'frontierprotocol:flint_axe') {
        return;
    }

    const tree = $FlintTreeChop.api.getTree(event.level, event.choppedBlockPos);
    const totalChops = tree.getChops() + event.getNumChops();

    if (tree.readyToFell(totalChops)) {
        // The flint axe shouldn't have UNBREAKABLE at this point, but we'll remove it anyway just in case
        axe.remove($FlintDataComponents.UNBREAKABLE);
        return;
    }

    axe.set($FlintDataComponents.UNBREAKABLE, {});
    player.server.scheduleInTicks(1, () => axe.remove($FlintDataComponents.UNBREAKABLE));
});
