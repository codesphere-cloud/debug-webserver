# debug-webserver

Simple nodejs webserver without any dependencies for debugging purposes.

It listens to every route and method and returns the request details as json.

**Example:**

Request:
```bash
$ curl --location 'localhost:3000/some/test?foo=bar' \
--header 'Content-Type: application/json' \
--data '{"foo": "bar"}'
```

Response:
```json
{
    "method": "POST",
    "url": "/some/test?foo=bar",
    "headers": {
        "content-type": "application/json",
        "accept": "*/*",
        "host": "localhost:3000",
        "accept-encoding": "gzip, deflate, br",
        "connection": "keep-alive",
        "content-length": "14"
    },
    "host": "homearch",
    "workspaceId": 123,
    "body": "{\"foo\": \"bar\"}"
}
```
