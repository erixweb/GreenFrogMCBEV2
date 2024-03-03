import { ServerConfig } from "./src/config/Config.mjs"
import { Language } from "./src/config/Language.mjs"
import { Address } from "./src/network/Address.mjs"
import { Server } from "./src/Server.mjs"

ServerConfig.create()
ServerConfig.init()

Language.init()

const server = new Server(
    new Address(
        ServerConfig.get("host"),
        ServerConfig.get("port")    
    )
)

server.listen()