"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const restify_errors_1 = require("restify-errors");
const events_1 = require("events");
class Router extends events_1.EventEmitter {
    envelop(document) {
        return document;
    }
    evenlopAll(documents, options = {}) {
        return documents;
    }
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(this.envelop(document));
            }
            else {
                throw new restify_errors_1.NotFoundError('Documento não encontrado');
            }
            return next();
        };
    }
    renderAll(response, next, options = {}) {
        return (documents) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', document);
                    array[index] = this.envelop(document);
                });
                response.json(this.evenlopAll(documents, options));
            }
            else {
                response.json(this.evenlopAll([], options));
            }
            return next();
        };
    }
}
exports.Router = Router;
