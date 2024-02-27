import bedrock from 'frog-protocol'

class Server {
    host

    port

    motd

    _server

    constructor(
        _host = "127.0.0.1",
        _port = 19132,
        _motd = "A GreenFrog Server"
    ) {
        this.host = _host
        this.port = _port
        this.motd = _motd
    }

    listen() {
        this._server = bedrock.createServer({
            host: this.host,
            port: Number(this.port),
            motd: {
                motd: this.motd,
                levelName: "GreenFrog"
            }
        })
    }

    stop() {
        // TODO
    }

    getAddress() {
        return `${host}:${port}`
    }
}

export { Server }