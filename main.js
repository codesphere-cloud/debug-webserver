const http = require('http');
const os = require('os');


const readBody = async (req) => new Promise((resolve, reject) => {
    const data = [];
    req
        .on('data', (chunk) => data.push(chunk))
        .on('error', (err) => reject(err))
        .on('end', () => resolve(Buffer.concat(data).toString()));
});

const log = (...args) => console.log(new Date().toISOString(), ...args);

const server = http.createServer(async (req, res) => {
    try {
        const info = {
            method: req.method,
            url: req.url,
            headers: req.headers,
            host: os.hostname(),
            workspaceId: parseInt(process.env['WORKSPACE_ID']),
        };

        if (req.method !== 'GET') {
            info.body = await readBody(req);
        }

        log(JSON.stringify(info));

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(info, null, '  '));
    } catch (e) {
        log(e);
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.write(JSON.stringify({error: e.message}));
    } finally {
        res.end();
    }
});

server.listen(process.env['PORT'] ?? 3000);
