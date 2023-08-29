"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./common/router"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const error_middleware_1 = require("./common/middlewares/error.middleware");
const app = (0, express_1.default)();
// Initializing aws credentials 
const ACCESSKEYID = process.env.ACCESSKEYID || "";
const SECRETACCESSKEY = process.env.SECRETACCESSKEY || "";
const AWSREGION = process.env.AWS_SES_EMAIL || "";
aws_sdk_1.default.config.credentials = new aws_sdk_1.default.Credentials({ accessKeyId: ACCESSKEYID, secretAccessKey: SECRETACCESSKEY });
// Middlewares
app.use(express_1.default.json());
app.use(error_middleware_1.errorMiddleware);
app.use(express_fileupload_1.default);
// app.use(fileupload());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
// Routes
(0, router_1.default)(app);
exports.default = app;
//# sourceMappingURL=app.js.map