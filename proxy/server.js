// Minimaler CORS-Forwarding-Proxy für Anthropic
// Nimmt den x-api-key aus dem Request-Header und leitet weiter.
// Speichert KEINEN Key — bleibt im Browser-localStorage des Users.
const http = require('http');
const https = require('https');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, service: 'katzen-proxy', mode: 'forward' }));
    return;
  }

  if (req.method !== 'POST' || req.url !== '/v1/messages') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { message: 'Not Found' } }));
    return;
  }

  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { message: 'x-api-key Header fehlt' } }));
    return;
  }

  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    const upstream = https.request({
      hostname: 'api.anthropic.com',
      port: 443,
      path: '/v1/messages',
      method: 'POST',
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
    upstream.on('error', err => {
      console.error('[ERR]', err.message);
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: { message: 'Upstream-Fehler: ' + err.message } }));
    });
    upstream.write(body);
    upstream.end();
  });
});

server.listen(PORT, '0.0.0.0', () => console.log('[OK] katzen-proxy auf Port', PORT));
