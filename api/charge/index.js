module.exports = async function(context, req) {
  const payjp = require('payjp')(process.env.PAYJP_SK)
  let isNoramal = false
  try {
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
    body: isNoramal ? 'NORMAL' : 'ERROR'
  }
  context.done()
}
