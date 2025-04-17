import winston from "winston";

export const authLogger = winston.createLogger({
    level:"info",
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp()
    ),
    transports:[
        new winston.transports.Console,
        new winston.transports.File({ filename:"./logs/auth.log" })
    ]
})