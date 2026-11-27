// Friday Beacon — hand-in program.
//
// Copies the static site (app/) and its screenshots (screenshots/) into
// the output directory and writes dossier.json there, using the kit's
// buildDossier from vendor/makefun-frontend.ts.
//
// Runs with Node 22, standard library only, no network. The output is
// deterministic: the same input files always produce the same bytes —
// nothing here stamps a time, a random value, or a filesystem order
// into the output.

import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(new URL(import.meta.url)));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Start from a clean output directory so a re-run cannot leave stale files.
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

cpSync(join(repoRoot, "app"), join(outDir, "app"), { recursive: true });
cpSync(join(repoRoot, "screenshots"), join(outDir, "screenshots"), { recursive: true });

const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
  app_path_max_bytes: 1000
});

writeFileSync(join(outDir, "dossier.json"), dossier);
console.log(`Friday Beacon: wrote ${join(outDir, "dossier.json")} (${dossier.length} bytes)`);
