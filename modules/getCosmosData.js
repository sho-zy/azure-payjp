module.exports.getCosmosData = async (
  COSMOS_EP,
  COSMOS_KEY,
  COSMOS_DB,
  COSMOS_CONTAINER
) => {
  const CosmosClient = require('@azure/cosmos').CosmosClient
  const client = new CosmosClient({
    endpoint: COSMOS_EP,
    key: COSMOS_KEY
  })
  const database = client.database(COSMOS_DB)
  const container = database.container(COSMOS_CONTAINER)
  const productQuerySpec = {
    query:
      'SELECT c.id, c.name, c.description, c.type, c.amount, c.image, c.hit from c where c.category = @category',
    parameters: [{ name: '@category', value: 'products' }]
  }
  const { resources: products } = await container.items
    .query(productQuerySpec)
    .fetchAll()

  const reviewQuerySpec = {
    query: 'SELECT c.name, c.comment from c where c.category = @category',
    parameters: [{ name: '@category', value: 'reviews' }]
  }
  const { resources: reviews } = await container.items
    .query(reviewQuerySpec)
    .fetchAll()
  return { products, reviews }
}
