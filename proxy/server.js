// KatzenVokal-Analyzer — API-Proxy
// Copyright (c) 2026 Daniel Enki (DanielEnki420). Alle Rechte vorbehalten / All Rights Reserved.
// Proprietär — siehe LICENSE. Keine Nutzung ohne schriftliche Genehmigung.
//
// Minimaler, gehärteter CORS-Forwarding-Proxy für Anthropic.
// Nimmt den x-api-key aus dem Request-Header und leitet an api.anthropic.com weiter.
// Speichert KEINEN Key — bleibt im Browser-localStorage des Users.
const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;
const MAX_BODY = 256 * 1024;      // 256 KB — großzügig für JSON-Prompts, schützt vor OOM-DoS
const UPSTREAM_TIMEOUT = 120000;  // 120s — verhindert hängende Sockets

function sendJson(res, code, obj) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    return sendJson(res, 200, { ok: true, service: 'katzen-proxy', mode: 'forward' });
  }

  if (req.method !== 'POST' || req.url !== '/v1/messages') {
    return sendJson(res, 404, { error: { message: 'Not Found' } });
  }

  const apiKey = req.headers['x-api-key'];
  // x-api-key muss vorhanden und plausibel sein (kein Logging des Werts!)
  if (!apiKey || typeof apiKey !== 'string' || !apiKey.startsWith('sk-ant-')) {
    return sendJson(res, 401, { error: { message: 'Gültiger x-api-key Header fehlt' } });
  }

  // Body mit Größenlimit sammeln (F2: OOM-Schutz)
  let body = '';
  let aborted = false;
  req.on('data', chunk => {
    if (aborted) return;
    body += chunk;
    if (body.length > MAX_BODY) {
      aborted = true;
      sendJson(res, 413, { error: { message: 'Request zu groß' } });
      req.destroy();
    }
  });

  req.on('end', () => {
    if (aborted) return;

    const upstream = https.request({
      hostname: 'api.anthropic.com',
      port: 443,
      path: '/v1/messages',
      method: 'POST',
      timeout: UPSTREAM_TIMEOUT,  // F3: Upstream-Timeout
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': req.headers['anthropic-version'] || '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    }, upRes => {
      res.writeHead(upRes.statusCode, { 'Content-Type': upRes.headers['content-type'] || 'application/json' });
      upRes.pipe(res);
    });

    upstream.on('timeout', () => {
      upstream.destroy();
      if (!res.headersSent) sendJson(res, 504, { error: { message: 'Upstream-Timeout' } });
    });

    upstream.on('error', err => {
      // F4: keine internen Details leaken — generische Meldung, Detail nur ins Log
      console.error('[ERR] upstream:', err.code || err.message);
      if (!res.headersSent) sendJson(res, 502, { error: { message: 'Upstream nicht erreichbar' } });
    });

    upstream.write(body);
    upstream.end();
  });

  req.on('error', () => {
    if (!res.headersSent) sendJson(res, 400, { error: { message: 'Fehlerhafter Request' } });
  });
});

// Server-weite Timeouts gegen Slowloris-artige Angriffe
server.requestTimeout = 130000;
server.headersTimeout = 10000;

server.listen(PORT, '0.0.0.0', () => console.log('[OK] katzen-proxy (hardened) auf Port', PORT));
