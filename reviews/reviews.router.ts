import { Review } from './reviews.model';
import { ModelRouter } from '../common/model-router';
import { NotFoundError } from 'restify-errors';
import * as restify from 'restify';
import * as  mongoose from 'mongoose';

class ReviewsRouter extends ModelRouter<Review> {
    constructor() {
        super(Review)
    }

    envelop(document) {
        let resource = super.envelop(document)
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant
        resource._links.restaurants = `/restaurants/${restId}`
        return resource
    }

    protected prepareOneQuery(query: mongoose.DocumentQuery<Review,Review>): mongoose.DocumentQuery<Review,Review> {
        return query.populate('user', 'name')
                    .populate('restaurant', 'name');
    }

    applyRoutes(application: restify.Server) {
        application.get(`${this.basePath}`, this.findAll)
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
        application.post(`${this.basePath}`, this.save)
    }
}

export const reviewsRouter = new ReviewsRouter()