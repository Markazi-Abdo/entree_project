import winston from "winston";

export const articleLogger = winston.createLogger({
    level:"info",
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp()
    ),
    transports:[
        new winston.transports.Console,
        new winston.transports.File({ filename:"./logs/produits.log" })
    ]
})