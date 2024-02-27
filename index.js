import { ServerConfig } from "./src/config/Config.mjs"
import { Server } from "./src/Server.mjs"

ServerConfig.create()
ServerConfig.init()

const server = new Server(
    ServerConfig.get("host"),
    ServerConfig.get("port")
)

server.listen()