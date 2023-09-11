export const generateProductErrorInfo = product => {
  return `
  Oner or more parameters are incomplete or invalid.
  List of required properties:
    - title: Must be a String. (${product.title})
    - category: Must be a String. (${product.category})
    - price: Must be a Number. (${product.price})
    - code: Must be a String. (${product.code})
    - stock: Must be a Number. (${product.stock})
  `
}