"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const restify = require("restify");
const mongoose = require("mongoose");
const environment_1 = require("./../common/environment");
const merge_patch_parser_1 = require("./merge-patch.parser");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environment_1.environment.db.url, {
            useMongoClient: true
        });
    }
    definePlugins() {
        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
        this.application.use(merge_patch_parser_1.mergePatchBodyParser);
    }
    createServer() {
        this.application = restify.createServer({
            name: 'meat-api',
            version: '1.0.0'
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.createServer();
                this.definePlugins();
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environment_1.environment.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
