'use strict';
const svgCaptcha = require('svg-captcha')
const Controller = require('egg').Controller;

class UtilsController extends Controller {
    async captcha() {
        const captcha = svgCaptcha.create({
            size: 4,
            fontSize: 60,
            width: 150,
            height: 80,
            noise: 3
        })
        this.ctx.session.captcha = captcha.text
        this.ctx.response.type = "image/svg+xml"
        this.ctx.body = captcha.data
    }
}

module.exports = UtilsController;
