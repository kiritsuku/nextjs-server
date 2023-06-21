from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs
import json

hostName = "localhost"
serverPort = 3020

class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        query = urlparse(self.path).query
        query_strings = parse_qs(query)
        term = query_strings["term"][0]
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        completions = ["Berlin", "Berlin Mitte", "Hamburg"]
        js = json.dumps({"completions": [w for w in completions if w.lower().startswith(term.lower())]})
        self.wfile.write(bytes(js, "utf-8"))

if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")