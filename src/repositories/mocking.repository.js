export default class MockingRepository {
  constructor(dao) {
    this.dao = dao
  }

  fakeProducts = async() => await this.dao.fakeProducts()
}