'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const stripe = require('stripe')('sk_test_51LdxG3SF7lj0sVgyRgF0Za9ly2H14AzTAJodc1nWl2AJwOdFlLXKy5Qch9lvXiXEVFcMEuJ804QxV6VCDA1LToFq008lNPl9YO');
module.exports= {
 create:async ctx =>{
    const {name , total ,items, stripeTokenId}= ctx.request.body;
    const {id} = ctx.state.user;

    const charge =  stripe.checkout.sessions.create({
        Last_items:[{

            amount:total*100,
            curruency:'usd',
            source:stripeTokenId,
            description:`order ${new Date()} by ${ctx.state.user.username} } `
        }],
        mode:'payment',
      })
        const order = await  strapi.services.create({
            name, total, items,user:id
    });
    return order
}
}

module.exports = createCoreController('api::order.order');
