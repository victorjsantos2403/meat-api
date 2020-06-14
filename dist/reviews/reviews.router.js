"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
const reviews_model_1 = require("./reviews.model");
const model_router_1 = require("../common/model-router");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    prepareOneQuery(query) {
        return query.populate('user', 'name')
            .populate('restaurant', 'name');
    }
    applyRoutes(application) {
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findById]);
        application.post('/reviews', this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();
