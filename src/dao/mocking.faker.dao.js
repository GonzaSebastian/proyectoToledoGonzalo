import { fakerES as faker } from '@faker-js/faker'

export default class mockingDAO {
  fakeProducts = async() => {
    return {
      _id: faker.database.mongodbObjectId(),
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.productName(),
      price: faker.commerce.price({ min: 100, max: 50000, symbol: "$" }),
      thumbnails: [faker.image.url()],
      code: faker.string.alphanumeric(8),
      stock: faker.number.int(100)
    }
  }
}