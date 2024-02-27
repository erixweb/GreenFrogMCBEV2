import { ServerConfig } from "./src/config/Config.mjs"
import { Address } from "./src/network/Address.mjs"
import { Server } from "./src/Server.mjs"

ServerConfig.create()
ServerConfig.init()

const server = new Server(
    new Address(
        ServerConfig.get("host"),
        ServerConfig.get("port")    
    )
)

server.listen()