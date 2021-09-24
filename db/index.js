const { Sequelize, DataTypes } = require('sequelize');

const db = {};
const sequelize = new Sequelize({
  host: 'localhost',
  username: 'root001',
  password: '046012574',
  database: 'banking_seq',
  dialect: 'mysql', // ตัวกำหนดว่าใช้ DB อันไหน
});

// sequelize
//   .authenticate()
//   .then(() => console.log('DB connected'))
//   .catch((err) => {
//     console.log('Cannot connect DB', err);
//   });

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const createAccountModel = require('./Account');
// const Account = createAccountModel(sequelize, DataTypes);

// const createBranchModel = require('./Branch');
// const Branch = createBranchModel(sequelize, DataTypes);

// const createCustomerModel = require('./Customer');
// const Customer = createCustomerModel(sequelize, DataTypes);

// const createTransferModel = require('./Transfer')
// const Transfer = createTransferModel(sequelize,DataTypes)

// const Customer = require('./Customer')(sequelize, DataTypes);
// const Branch = require('./Branch')(sequelize, DataTypes);
// const Account = require('./Account')(sequelize, DataTypes);
// const Transfer = require('./Transfer')(sequelize, DataTypes);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

db.Customer = require('./Customer')(sequelize, DataTypes);
db.Branch = require('./Branch')(sequelize, DataTypes);
db.Account = require('./Account')(sequelize, DataTypes);
db.Transfer = require('./Transfer')(sequelize, DataTypes);

////////////////////////////////////////////////////////////////////////////////////////////////////////

// Account.associate(db);
// Branch.associate(db);
// Transfer.associate(db);

for (let model of Object.keys(db)) {
  if (db[model].associate) db[model].associate(db);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

// Assume Customer - Account One to One

// Customer.hasOne (Account)
// Account.belongsTo(Customer) // Fk ต้องอยู่ในตารางของตัวที่เป็น belongto หรือในที่นี้ fk อยู่ที่ Account

// 1: Many

// Customer.hasMany(Account, {
//   foreignKey: {
//     name: 'customerId',
//     allowNull: false,
//   },
//   onDelete: 'RESTRICT',
//   onUpdate: 'RESRICT',
// }); // โดย default จะหา fk โดยเอาชื่อ table แบบ sigular ตามด้วย _id  (customer_id) (underscore is true)
// Account.belongsTo(Customer, {
//   foreignKey: {
//     name: 'customerId',
//     allowNull: false,
//   },
//   onDelete: 'RESTRICT',
//   onUpdate: 'RESRICT',
// });
// Branch.hasMany(Account, {
//   foreignKey: {
//     name: 'branchId',
//     allowNull: false,
//   },
//   onDelete: 'RESTRICT',
//   onUpdate: 'RESTRICT',
// });
// Account.belongsTo(Branch, {
//   foreignKey: {
//     name: 'branchId',
//     allowNull: false,
//   },
//   onDelete: 'RESTRICT',
//   onUpdate: 'RESTRICT',
// });

// as ความสัมพันธ์แบบ มีการใช้ซ้ำของ model (Transfer to-from)
// Account.hasMany(Transfer, {
//   as: 'TransferTos',
//   foreignKey: {
//     name: 'toAccountId',
//     allowNull: false,
//   },
//   onUpdate: 'RESTRICT',
//   onDelete: 'RESTRICT',
// });
// Transfer.belongsTo(Account, {
//   as: 'ToAccount',
//   foreignKey: {
//     name: 'toAccountId',
//     allowNull: false,
//   },
//   onUpdate: 'RESTRICT',
//   onDelete: 'RESTRICT',
// });

// Account.hasMany(Transfer, {
//   as: 'TransferFroms',
//   foreignKey: {
//     name: 'fromAccountId',
//     allowNull: false,
//   },
//   onUpdate: 'RESTRICT',
//   onDelete: 'RESTRICT',
// });
// Transfer.belongsTo(Account, {
//   as: 'FromAccount',
//   foreignKey: {
//     name: 'fromAccountId',
//     allowNull: false,
//   },
//   onUpdate: 'RESTRICT',
//   onDelete: 'RESTRICT',
// });

// Many : Many

//Example

// A.belongsToMany(B, { through: C });
// B.belongsToMany(A, { through: C });

// Customer.belongsToMany(Branch, {
//   through: 'accounts',
//   foreignKey: 'customerId',
//   otherKey: 'branchId',
// });
// Branch.belongsToMany(Customer, {
//   through: 'accounts',
//   foreignKey: 'branchId',
//   otherKey: 'customerId',
// });

// sequelize.sync({ force: false });
db.sequelize = sequelize;
module.exports = db;
// module.exports = { sequelize, Account, Customer, Branch, Transfer };
