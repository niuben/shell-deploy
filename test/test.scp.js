import {scp} from "./lib/shell.js";

scp({
    host: "127.0.0.1",
    path: "/user",
    username: "user",
    password: "12345"
})
