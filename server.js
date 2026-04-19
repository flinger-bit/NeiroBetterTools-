const http = require('http');
const { existsSync, readFileSync, statSync } = require('fs');
const { join } = require('path');
const { execFileSync } = require('child_process');

const host = '0.0.0.0';
const port = Number(process.env.PORT || 5000);
const addonPath = join(__dirname, 'dist', 'NeiroBetterTools.mcaddon');

function ensurePackage() {
  execFileSync(process.execPath, [join(__dirname, 'scripts', 'package-addon.js')], { stdio: 'inherit' });
}

function readManifest(path) {
  return JSON.parse(readFileSync(join(__dirname, path, 'manifest.json'), 'utf8'));
}

function html() {
  const behavior = readManifest('behavior_packs/NeiroBetterTools_BP');
  const resources = readManifest('resource_packs/NeiroBetterTools_RP');
  const size = existsSync(addonPath) ? Math.round(statSync(addonPath).size / 1024) : 0;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NeiroBetterTools</title>
<style>
body{font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:0;background:#101820;color:#f7fafc;min-height:100vh;display:grid;place-items:center;padding:32px}main{max-width:760px;background:#172434;border:1px solid #2c4058;border-radius:24px;padding:32px;box-shadow:0 24px 70px #0008}h1{margin:0 0 8px;font-size:42px}p{line-height:1.6;color:#cbd5e1}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:24px 0}.card{background:#0f172a;border:1px solid #334155;border-radius:16px;padding:18px}.label{font-size:12px;text-transform:uppercase;letter-spacing:.12em;color:#93c5fd}.value{font-size:20px;margin-top:8px}.button{display:inline-block;background:#4ade80;color:#052e16;text-decoration:none;font-weight:800;padding:14px 20px;border-radius:999px}.muted{font-size:14px;color:#94a3b8}</style>
</head>
<body>
<main>
<h1>NeiroBetterTools</h1>
<p>This Replit project packages the imported Minecraft Bedrock behavior and resource packs into a downloadable .mcaddon file.</p>
<div class="cards">
<div class="card"><div class="label">Behavior Pack</div><div class="value">${behavior.header.name}</div></div>
<div class="card"><div class="label">Resource Pack</div><div class="value">${resources.header.name}</div></div>
<div class="card"><div class="label">Engine</div><div class="value">${behavior.header.min_engine_version.join('.')}+</div></div>
<div class="card"><div class="label">Package Size</div><div class="value">${size} KB</div></div>
</div>
<a class="button" href="/download">Download .mcaddon</a>
<p class="muted">The package is rebuilt when the server starts. Run npm run build to rebuild it manually.</p>
</main>
</body>
</html>`;
}

ensurePackage();

const server = http.createServer((request, response) => {
  if (request.url === '/download') {
    if (!existsSync(addonPath)) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Package has not been built.');
      return;
    }
    response.writeHead(200, {
      'content-type': 'application/octet-stream',
      'content-disposition': 'attachment; filename="NeiroBetterTools.mcaddon"'
    });
    response.end(readFileSync(addonPath));
    return;
  }

  response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  response.end(html());
});

server.listen(port, host, () => {
  console.log(`NeiroBetterTools preview running at http://${host}:${port}`);
});
