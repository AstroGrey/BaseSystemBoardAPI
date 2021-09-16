"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const users_routes_config_1 = require("./users/users.routes.config");
const problems_routes_1 = require("./problems/problems.routes");
const debug_1 = __importDefault(require("debug"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const problemEntity_1 = require("./database/entities/problemEntity");
const userEntity_1 = require("./database/entities/userEntity");
const holdEntity_1 = require("./database/entities/holdEntity");
const baseHoldEntity_1 = require("./database/entities/baseHoldEntity");
const app = express_1.default();
const server = http.createServer(app);
const routes = [];
const debugLog = debug_1.default('app');
const port = process.env.PORT || 3000;
const databaseHost = process.env.RDS_HOSTNAME || 'localhost';
const databasePort = process.env.RDS_PORT ? Number(process.env.RDS_PORT) : 5432;
const databaseName = process.env.RDS_DB_NAME || 'WoodsTestDB';
const databaseUsername = process.env.RDS_USERNAME || 'postgres';
const databasePassword = process.env.RDS_PASSWORD || 'toolis2cool';
app.use(express_1.default.json()); // adding middleware to parse all incoming requests as JSON 
app.use(cors_1.default()); // adding middleware to allow cross-origin requests
/* preparing the expressWinston logging middleware configuration,
 which will automatically log all HTTP requests handled by Express.js */
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true })),
};
/* here we crash on unhandled errors and spitting out a stack trace,
 but only when in debug mode */
if (process.env.DEBUG) {
    process.on('unhandledRejection', function (reason) {
        debugLog('Unhandled Rejection:', reason);
        process.exit(1);
    });
}
else {
    loggerOptions.meta = false; // when not debugging, make terse
}
app.use(expressWinston.logger(loggerOptions)); // initialize the logger with the above configuration
/* adding the UserRoutes to our array,
after sending the Express.js application object to have the routes added to our app!*/
routes.push(new users_routes_config_1.UsersRoutes(app));
routes.push(new problems_routes_1.ProblemsRoutes(app));
// this is a simple route to make sure everything is working properly
app.get('/', (req, res) => {
    res.status(200).send(`Server running at http://localhost:${port}`);
});
// Start our server at specified port
server.listen(port, () => {
    routes.forEach((route) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
});
// Database Connection
//const connection = await 
typeorm_1.createConnection({
    // use ormconfig.json here 
    type: "postgres",
    host: databaseHost,
    //host: "localhost",
    port: databasePort,
    //port: 5432,
    username: databaseUsername,
    //username: "postgres",
    password: databasePassword,
    //password: "toolis2cool",
    name: databaseName,
    //name: "WoodsTestDB",
    entities: [
        problemEntity_1.ProblemEntity,
        userEntity_1.UserEntity,
        holdEntity_1.HoldEntity,
        baseHoldEntity_1.BaseHoldEntity
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    // here you can start to work with your entities
}).catch(error => console.log(error));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE4QjtBQUM5QiwyQ0FBNkI7QUFDN0IsaURBQW1DO0FBQ25DLGdFQUFrRDtBQUNsRCxnREFBd0I7QUFFeEIscUVBQTBEO0FBQzFELGdFQUE0RDtBQUM1RCxrREFBMEI7QUFDMUIsNEJBQTBCO0FBQzFCLHFDQUF1RDtBQUN2RCxxRUFBa0U7QUFDbEUsK0RBQTREO0FBQzVELCtEQUE0RDtBQUM1RCx1RUFBb0U7QUFFcEUsTUFBTSxHQUFHLEdBQXdCLGlCQUFPLEVBQUUsQ0FBQztBQUMzQyxNQUFNLE1BQU0sR0FBZ0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRCxNQUFNLE1BQU0sR0FBOEIsRUFBRSxDQUFDO0FBQzdDLE1BQU0sUUFBUSxHQUFvQixlQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFL0MsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQ3RDLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLFdBQVcsQ0FBQztBQUM3RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNoRixNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxhQUFhLENBQUM7QUFDOUQsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxVQUFVLENBQUM7QUFDaEUsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxhQUFh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