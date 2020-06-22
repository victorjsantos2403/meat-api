import { NotFoundError } from 'restify-errors';
import * as restify from 'restify'
import {EventEmitter} from 'events'

export abstract class Router extends EventEmitter{
    abstract applyRoutes(application: restify.Server)

    envelop(document: any): any {
        return document
    }
    
    evenlopAll(documents: any[], options: any = {}): any[] {
        return documents
    }


    render(response: restify.Response, next: restify.Next) {
        return (document)=> {
            if (document){ 
                this.emit('beforeRender', document)
                response.json(this.envelop(document))
            }else {
                throw new NotFoundError('Documento não encontrado')
            }
            return next()
        }
    }

    renderAll(response: restify.Response, next: restify.Next, options: any = {}) {
        return (documents: any[]) => {
            if (documents) {
                documents.forEach((document, index, array) => {
                    this.emit('beforeRender', document)
                    array[index] = this.envelop(document)
                })
                response.json(this.evenlopAll(documents, options))
            }else {
                response.json(this.evenlopAll([], options))
            }
            return next()
        } 
    }
}