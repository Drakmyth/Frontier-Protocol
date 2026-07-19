const $StartChopEvent = Java.loadClass('ht.treechop.api.ChopEvent$StartChopEvent');
const $TreeChop = Java.loadClass('ht.treechop.TreeChop');
const $TreeChopBlocks = Java.loadClass('ht.treechop.common.NeoForgeRegistry$Blocks');

/*
Although Panda's Falling Trees has native compatibility with HT's TreeChop, that seems to have broken in the
port to NeoForge. This is a shim that makes the two mods play nice. It restores any chopped logs with their
original state before Panda's turns the tree into an entity. This prevents chopped logs from being left behind.
*/
NativeEvents.onEvent($StartChopEvent, event => {
    const level = event.level;

    if (level.clientSide) {
        return;
    }

    const tree = $TreeChop.api.getTree(level, event.choppedBlockPos);
    const totalChops = tree.getChops() + event.getNumChops();

    if (!tree.readyToFell(totalChops)) {
        return;
    }

    let restored = 0;
    const activeChopPos = event.choppedBlockPos;

    tree.getLogBlocksOrEmpty().forEach(pos => {
        const blockState = level.getBlockState(pos);

        if (!pos.equals(activeChopPos) && blockState.is($TreeChopBlocks.CHOPPED_LOG.get())) {
            const originalState = blockState.getBlock().getImitatedBlockState(level, pos);
            level.setBlock(pos, originalState, 3);
            restored++;
        }
    });

    if (restored > 0) {
        console.debug(`[TreeChop/Panda's Falling Trees] Restored ${restored} chopped log(s) before felling`);
    }
});
