module.exports = async function(context, req) {
  try {
    const payjp = require('payjp')(process.env.PAYJP_SK)
    const result = await payjp.charges.create({
      amount: req.body.amount,
      currency: 'jpy',
      card: req.body.token
    })
    if (result && result.paid) {
      context.res = {
        body: 'NORMAL'
      }
    } else {
      throw new Error(result.error.message)
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message
    }
  }

  context.done()
}
