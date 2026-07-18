# Repository Guidelines

## Project Structure & Module Organization

This is a Minecraft 1.21.1 NeoForge instance. Main maintained areas are:

- `kubejs/startup_scripts/` registers content that loads at game startup.
- `kubejs/server_scripts/` contains recipes, tags, loot, and server event logic.
- `kubejs/client_scripts/` contains tooltips, JEI integration, and client events.
- `kubejs/assets/` and `kubejs/data/`: resource-pack and data-pack roots.
- `config/` and `defaultconfigs/`: mod configuration; `mods/`: pinned JARs.
- `resourcepacks/`, `shaderpacks/`, and `schematics/`: distributable assets.

Do not hand-edit generated or player-specific content under `logs/`, `crash-reports/`, `dynamic-*-cache/`, `downloads/`, `local/`, or `saves/` unless the change explicitly targets test-world data.

## Design & Dependency Principles

Keep the pack clean, efficient, and easy to maintain. Prefer functionality in this order: existing capabilities of installed mods, small focused KubeJS customizations, then an additional mod. Do not recreate a stable built-in feature with scripts.

Avoid unofficial addons and third-party compatibility mods by default. Compare maintenance, version support, dependencies, performance, and configuration against scripting. If integration needs large, fragile, or event-heavy KubeJS code, prefer a reputable maintained addon and explain the tradeoff first. Remove superseded mods, scripts, configs, and examples.

Recommend additions, removals, or replacements when useful, but **never change the mod list without explicit user confirmation**. Save compatibility is not required before the first release. Use sensible implementations that avoid needless ticking work, script duplication, or high hardware demands; extreme optimization is not a goal.

Before implementation, surface relevant modpack practices, such as using `defaultconfigs/` for new-world defaults, separating client changes, pinning compatible versions, and avoiding generated files. Ask for direction when a practice materially affects the design; otherwise state the recommendation and proceed.

## Gameplay & Progression Vision

Design an expert-mode pack balanced first for a single player, while avoiding needless incompatibility with LAN, private servers, or eventual public distribution. Do not require resource quantities suited only to large servers. Treat alternative scaling profiles as a post-development enhancement.

Progression uses increasingly difficult tiers unlocked through travel to dimensions with unique resources. Recipes should connect ingredients and systems across the mod list. Begin with approachable but highly manual gameplay; each tier should reward greater complexity with stronger tools and progressively deeper automation.

The Overworld is the player's primary storage and automation base. Each new dimension should encourage a forward outpost used to overcome that dimension's challenges. Returning home remains possible, but seamless logistics between the main base and outposts must be a very late-game unlock. Preserve meaningful travel and local infrastructure until then.

## Development & Validation Commands

There is no standalone build or test task. Launch **Frontier Protocol** through MultiMC for full validation:

- `/reload` reloads server scripts and data-pack content.
- `F3+T` reloads client scripts and resource-pack assets.
- `/kubejs reload_startup_scripts` attempts a startup reload; restart when registrations do not refresh safely.
- `rg "ERROR|WARN" logs/kubejs` scans KubeJS logs after testing.

## Coding Style & Naming Conventions

Use modern JavaScript with four-space indentation, single quotes, and semicolons. Organize small scripts by feature instead of growing `main.js`; for example, `server_scripts/recipes/create.js`. Keep startup, server, and client logic in matching directories. Use lowercase `snake_case` filenames and namespaced IDs such as `kubejs:steel_plate`. Match adjacent JSON/TOML formatting and avoid unrelated reformatting.

## Testing Guidelines

Test in a disposable world. Confirm reloads complete, content appears, and `logs/kubejs/` has no new errors. Mod JAR, startup registration, and core configuration changes require a clean restart. Document reproduction and verification steps.

## Commit & Pull Request Guidelines

No Git history is available here, so use imperative subjects, for example `Add steel plate Create recipe`. Exclude caches, logs, and personal saves. PRs should summarize player effects, list changed mods/configs, include validation, link issues, and show screenshots for visual changes.
