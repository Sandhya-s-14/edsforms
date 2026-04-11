import { exec } from "node:child_process";
import { createSpinner } from "../tools/utils.js";

// Run shell command
const run = (cmd) =>
  new Promise((resolve, reject) =>
    exec(cmd, (error, stdout, stderr) => {
      if (error) reject({ error, stdout, stderr });
      else resolve(stdout);
    })
  );

// Get staged files
const changeset = await run(
  "git diff --cached --name-only --diff-filter=ACMR"
);
const modifiedFiles = changeset.split("\n").filter(Boolean);

// Exit if nothing staged
if (modifiedFiles.length === 0) process.exit(0);

// -------------------
// LINT CHECK
// -------------------
const lintSpinner = createSpinner("Running linting...");
try {
  await run("npm run lint");
  lintSpinner.stop("✅ Linting passed - no issues found");
} catch (err) {
  lintSpinner.stop("❌ Linting failed:");
  console.error(err.stderr || err.stdout || err.error?.message);
  console.error("\n🔧 Please fix the linting errors before committing.");
  process.exit(1);
}

// -------------------
// JSON BUILD CHECK
// -------------------

// Detect partial JSON files (_*.json)
const modifiedPartials = modifiedFiles.filter((file) =>
  file.match(/(^|\/)_.*\.json$/)
);

if (modifiedPartials.length > 0) {
  const buildSpinner = createSpinner("Building JSON files...");

  try {
    const output = await run("npm run build:json --silent");
    buildSpinner.stop("✅ JSON files built successfully");

    if (output) console.log(output);

    // Add generated files back to commit
    await run(
      "git add component-models.json component-definition.json component-filters.json"
    );
  } catch (err) {
    buildSpinner.stop("❌ JSON build failed");

    console.error("\n🚨 Build Error Details:\n");
    console.error(err.stderr || err.stdout || err.error?.message);

    console.error("\n🔧 Fix the JSON issues before committing.");
    process.exit(1);
  }
}

