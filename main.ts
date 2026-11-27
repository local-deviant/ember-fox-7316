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

import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = dirname(fileURLToPath(new URL(import.meta.url)));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Make sure the output directory exists, then clear only its contents:
// the directory itself must stay, because the grader mounts /output on a
// read-only parent, so removing it fails with EACCES. Clearing the
// contents (never the directory) keeps a re-run from leaving stale files.
mkdirSync(outDir, { recursive: true });
for (const entry of readdirSync(outDir)) {
  // A stale entry the run cannot remove (another owner's file) must not
  // kill the run: the grader hands in an empty /output, and anything left
  // over is ignored by the dossier, which only reads app/ + screenshots/.
  try {
    rmSync(join(outDir, entry), { recursive: true, force: true });
  } catch {
    // Leave it; the copies and dossier.json below still land.
  }
}

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
