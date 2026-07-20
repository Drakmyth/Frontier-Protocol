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

### MODLIST maintenance

`MODLIST.csv` documents the distributable JARs in `mods/`; it does not authorize changing the installed mod set. When the user adds, removes, or replaces a mod, update the CSV in the same change:

- Preserve the header and column order: `name,version,filename,curseforge_slug,modrinth_project_id,modrinth_version_id`.
- Keep rows alphabetized by the human-readable `name` column.
- Copy `filename` exactly from `mods/` and record the mod's release version, not the Minecraft version embedded in the filename.
- Verify the display name and platform identifiers against the mod's official CurseForge and Modrinth project/version pages. Use the CurseForge URL slug, the Modrinth project ID, and the exact Modrinth version ID; leave unavailable fields empty.
- For a replacement, remove the superseded row instead of retaining historical entries. Do not rewrite unrelated rows merely because their metadata is incomplete.
- Before finishing, confirm the documented filename exists in `mods/`, check for duplicate names or filenames, and inspect `git diff -- MODLIST.csv` to ensure only intended rows changed.

## Gameplay & Progression Vision

Design an expert-mode pack balanced first for a single player, while avoiding needless incompatibility with LAN, private servers, or eventual public distribution. Do not require resource quantities suited only to large servers. Treat alternative scaling profiles as a post-development enhancement.

Progression uses increasingly difficult tiers unlocked through travel to dimensions with unique resources. Recipes should connect ingredients and systems across the mod list. Begin with approachable but highly manual gameplay; each tier should reward greater complexity with stronger tools and progressively deeper automation.

The Overworld is the player's primary storage and automation base. Each new dimension should encourage a forward outpost used to overcome that dimension's challenges. Returning home remains possible, but seamless logistics between the main base and outposts must be a very late-game unlock. Preserve meaningful travel and local infrastructure until then.

## Validation

Automated in-game testing is not available to agents. Do not launch MultiMC or claim that runtime validation was performed. Validate changes as far as the workspace permits: parse edited JSON, check syntax where suitable tooling exists, verify referenced files and IDs, inspect relevant existing logs when diagnosing a reported problem, and review the final diff for unintended changes.

When runtime validation is material, give the user concise manual steps and identify the required reload scope:

- `/reload` reloads server scripts and data-pack content.
- `F3+T` reloads client scripts and resource-pack assets.
- `/kubejs reload_startup_scripts` may reload some startup scripts, but registrations and core configuration changes require a clean restart.
- After testing, `rg "ERROR|WARN" logs/kubejs` can identify new KubeJS warnings or errors.

Do not present these manual steps as work the agent performed. Avoid generic testing instructions when static validation fully covers the change.

## Coding Style & Naming Conventions

Use modern JavaScript with four-space indentation, single quotes, and semicolons. Organize small scripts by feature instead of growing `main.js`; for example, `server_scripts/recipes/create.js`. Keep startup, server, and client logic in matching directories. Use lowercase `snake_case` filenames. Use the `frontierprotocol` namespace for new pack content and IDs, such as `frontierprotocol:steel_plate`. Match adjacent JSON/TOML formatting and avoid unrelated reformatting.

## Git and GitHub Policy

Treat the local Git repository and all GitHub resources as read-only. Agents may inspect state and history with commands such as `git status`, `git diff`, and `git log`, but must not stage, commit, amend, switch or create branches, merge, rebase, reset, tag, push, or otherwise mutate Git state. Do not create or update pull requests, issues, comments, reviews, releases, remote branches, or repository settings. The global GitHub app policy does not override this project-level prohibition. Only a future explicit change to these repository instructions may authorize Git or GitHub mutations.
