const BaseController = require("./base")
const md5 = require('md5')
const HashSalt = ":jkalsndjkeiw!@nfdjk"
const createRule = {
    email: { type: 'email' },
    nickName: { type: "string" },
    password: { type: 'string' },
    captcha: { type: "string" }
}
class UserController extends BaseController {
    async login() {

    }

    async register() {
        const { ctx } = this
        try {
            // 校验传递的参数
            ctx.validate(createRule)
        } catch (e) {
            return this.error('参数校验失败', -1, e.errors)
        }
        const { email, password, captcha, nickName } = ctx.request.body
        console.log({ email, password, captcha, nickName })
        if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
            if (await this.checkEmail(email)) {
                this.error('邮箱重复')
            } else {
                const ret = await ctx.model.User.create({
                    email,
                    nickName,
                    password: md5(password + HashSalt)
                })
                if (ret._id) {
                    this.message('注册成功')
                }
            }
        } else {
            this.error('验证码错误')
        }
        // this.success({ name: 'kkb' })
    }
    async checkEmail(email) {
        const user = await this.ctx.model.User.findOne({ email })
        return user
    }
    async verify() {

    }

    async info() {

    }
}

module.exports = UserController