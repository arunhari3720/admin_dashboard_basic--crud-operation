const { build } = require("esbuild");

build({
  entryPoints: ["index.js"], // your main file
  bundle: true,
  platform: "node",
  target: "node18",
  outfile: "dist/index.js",
}).catch(() => process.exit(1));