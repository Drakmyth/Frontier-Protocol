# Data Compatibility Shims

These files correct outdated Forge resource paths or tag references in installed NeoForge 1.21.1 mods. Recheck each shim whenever its affected mod is updated, and remove the shim once the upstream resource is corrected.

## Twigs

- Installed version: 1.21.1-3.1.2
- Shim: `neoforge/loot_modifiers/global_loot_modifiers.json`
- Upstream issue: Twigs packages its global loot modifier manifest under `data/forge/loot_modifiers/`, but NeoForge only reads the manifest from `data/neoforge/loot_modifiers/`.
- Effect: Registers Twigs' built-in modifier that replaces sticks produced by leaf loot tables with an equal number of `twigs:twig` items.
- Remove when: Twigs supplies `data/neoforge/loot_modifiers/global_loot_modifiers.json` itself.
- Validation: Break or decay standard leaves without Silk Touch and confirm that successful stick rolls produce `twigs:twig` instead of `minecraft:stick`.

## Sophisticated Backpacks

- Installed version: 1.21.1-3.25.71.1997
- Overrides:
  - `sophisticatedbackpacks/registry/compat/farmersdelight/entity_tools.json`
  - `sophisticatedbackpacks/registry/compat/farmersdelight/block_tools.json`
- Upstream issue: Its Farmer's Delight compatibility definitions consume the legacy `forge:tools/knives` and `forge:shears` tags.
- Effect: Retargets the definitions to the modern `c:tools/knife` and `c:tools/shear` tags. This includes present and future tools contributed to those common tags without introducing circular tag references.
- Remove when: Sophisticated Backpacks uses the modern common tags in its bundled Farmer's Delight compatibility definitions.
- Validation: Confirm that Farmer's Delight knives and shears are recognized by the relevant Sophisticated Backpacks tool interactions.

## Amendments

- Installed version: 1.21-2.1.7
- Shim: `forge/tags/item/tools/flint_and_steel.json`
- Upstream issue: Amendments optionally consumes the legacy `forge:tools/flint_and_steel` tag in `amendments:sets_on_fire` without also consuming the modern common tag.
- Effect: Populates the legacy tag from `c:tools/igniter`, allowing Amendments to recognize all current and future common-tagged igniters.
- Remove when: Amendments consumes `c:tools/igniter` directly.
- Validation: Confirm that items in `c:tools/igniter` receive Amendments' expected fire-setting behavior.

## Create: Blazing Hot

- Installed version: 0.7.4+neoforge-mc1.21.1
- Shim: `blazinghot/recipe/compat/rolling/blaze_gold_ingot.json`
- Upstream issue: The bundled compatibility recipe is under the obsolete `recipes/` directory and uses Fabric and Forge load-condition formats instead of NeoForge's current format.
- Effect: Supplies the recipe under the singular `recipe/` directory with a `neoforge:mod_loaded` condition.
- Activation: The recipe remains dormant unless a mod with the ID `createaddition` is installed.
- Remove when: Create: Blazing Hot supplies a correctly located recipe using `neoforge:conditions` for its NeoForge build.
- Validation: With Create Crafts & Additions installed, confirm that rolling one `#blazinghot:blaze_gold_ingots` item produces two `blazinghot:blaze_gold_rod` items.

## General Validation

1. Run `/reload` after changing these data files.
2. Confirm that the reload completes without data-pack or KubeJS errors.
3. Check `logs/latest.log` and `logs/kubejs/` for new errors or warnings involving the affected resource IDs.
4. Perform the player-facing validation listed for each shim in a disposable world.
