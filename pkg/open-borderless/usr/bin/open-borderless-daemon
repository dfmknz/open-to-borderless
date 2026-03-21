#!/usr/bin/env python3
from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import subprocess
import os
import sys

PORT = 8765

def open_borderless_window(url):
    cmd = ['hyprctl', 'dispatch', 'exec', f'chromium --app={url}']
    result = subprocess.run(cmd, capture_output=True, text=True)
    return result.returncode == 0, result.stderr if result.returncode != 0 else None

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/open':
            length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(length)
            try:
                data = json.loads(body)
                url = data.get('url', '')
                if url:
                    success, error = open_borderless_window(url)
                    response = {'success': bool(success)}
                    if error:
                        response['error'] = str(error)
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps(response).encode())
                else:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'no url'}).encode())
            except json.JSONDecodeError:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'invalid json'}).encode())
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'not found'}).encode())

    def log_message(self, format, *args):
        pass

def main():
    server = HTTPServer(('localhost', PORT), Handler)
    print(f'Borderless HTTP server running on localhost:{PORT}', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('Server stopped', flush=True)
        server.shutdown()

if __name__ == '__main__':
    main()
