const faker = require('faker');

faker.locale = 'pt_BR';

const products = [...Array(200)].map((user) => (
  {
    productName: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    value: faker.finance.amount(),
    discount: faker.finance.amount(),
    images: [
      'https://storage.googleapis.com/e-varejo-bucket/13435081_colcha-camesa-evolution-patchwork-tonya-casal-220x-233609_m1_637170300206412952.jpg',
      'https://storage.googleapis.com/e-varejo-bucket/26595420_1GG.webp',
      'https://storage.googleapis.com/e-varejo-bucket/colcha-casal-queen-doce-lar-05-pecas-100-algodao-com-02-almofadas-azul-claro-5e4d184abe815-medium.webp',
      'https://storage.googleapis.com/e-varejo-bucket/kit-colcha-casal-lisa-3-pecas-loft-camesa_280392.jpg'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
))


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', products, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};