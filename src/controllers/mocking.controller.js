import { MockingService } from "../services/index.js"


export const mockingProducts = async (req, res) => {
  const products = []
  try {
    for (let i = 0; i < 100; i++) {
      products.push(await MockingService.fakeProducts())
    }
    res.status(200).json({status: 'success', payload: products})
  } catch (err) {
    res.status(404).json({ status: 'error', error: err.message })
  }
}