module.exports = async function(context, req) {
  let isNoramal = false
  try {
    const payjp = require('payjp')(process.env.PAYJP_SK)
    const result = await payjp.charges.create({
      amount: req.body.amount,
      currency: 'jpy',
      card: req.body.token
    })
    isNoramal = result && result.paid
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  context.res = {
    status: isNoramal ? 200 : 500,
    body: isNoramal ? 'NORMAL' : 'ERROR'
  }
  context.done()
}
