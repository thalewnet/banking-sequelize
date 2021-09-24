const {
  Transfer,
  Account,
  Branch,
  Customer,
  sequelize,
} = require('./db/index');
const { Op, Sequelize, QueryTypes } = require('sequelize');
const run = async () => {
  //   const result = await Customer.findAll();

  // Order customer by firstname ASC

  //   const result = await Customer.findAll({
  //     order: ['firstName', 'lastName'],
  //   });

  // Order customer by firstName DESC

  //   const result = await Customer.findAll({
  //     order: [
  //       ['firstName', 'DESC'],
  //       ['lastName', 'DESC'],
  //     ],
  //   });

  // Order brnach name by DESc

  //   const result = await Branch.findAll({
  //     order: [['name', 'DESC']],
  //   });

  // Order Account balance by DESC balance > 5000
  //   const result = await Account.findAll({
  //     where: {
  //       balance: {
  //         [Op.gt]: 5000,
  //       },
  //     },
  //     order: [['balance', 'DESC']],
  //   });

  // **** ฺGroup by *****//

  //   const result = await Customer.findAll({
  //     attributes: [
  //       'gender',
  //       [Sequelize.fn('COUNT', Sequelize.col('gender')), 'count'],
  //     ],
  //     group: 'gender',
  //     // order: [Sequelize.fn('COUNT', Sequelize.col('gender'))],
  //     order: [Sequelize.literal('count')],
  //   });

  // หา total balance แต่ละ customer id

  //   const result = await Account.findAll({
  //     attributes: [
  //       'customer_id',
  //       [Sequelize.fn('SUM', Sequelize.col('balance')), 'Total'],
  //     ],
  //     group: ['customer_id'],
  //     order: [Sequelize.literal('Total')],
  //   });
  // หา toal balance แต่ละ  branch id
  const result = await Account.findAll({
    attributes: [
      'branch_id',
      [Sequelize.fn('SUM', Sequelize.col('balance')), 'Total'],
    ],
    group: 'branch_id',
    order: ['branch_id'],
  });

  // หา total balance แต่ละ cusstomer id branch id

  // const result = await Account.findAll({
  //   attributes: [
  //     'branch_id',
  //     'customer_id',
  //     [Sequelize.fn('SUM', Sequelize.col('balance')), 'Total'],
  //     [Sequelize.fn('COUNT', Sequelize.col('balance')), 'count'],
  //   ],
  //   group: ['branch_id', 'customer_id'],
  //   order: ['branch_id'],
  // });

  //** Limit Offset and Pagination */
  //   const result = await Account.findAll({
  //     limit: 5,
  //     offset: 10,
  //   });
  //   const result = await Customer.findOne({
  //     where: {
  //       id: 1,
  //     },
  //     include: Account,
  //   });

  //   const result = await Account.findAll({
  //     where: {
  //       id: 1,
  //     },
  //     attributes: ['id', 'openDate', 'closeDate', 'balance'],
  //     // include: Customer, // Shorthand ของ บรรทัดล่างที่มีแต่ model อย่างเดียว
  //     include: {
  //       model: Customer,
  //       attributes: {
  //         exclude: ['createdAt', 'updatedAt'],
  //       },
  //     },
  //   });

  // Include multiple model

  //   const result = await Customer.findAll({
  //     where: {
  //       id: 1,
  //     },
  //     include: [Account, Branch],
  //   });

  // Filter nested model
  //   const result = await Customer.findAll({
  //     where: {
  //       id: 1,
  //     },
  //     include: [
  //       {
  //         model: Account,
  //         where: {
  //           balance: {
  //             [Op.lt]: 10000,
  //           },
  //         },
  //       },
  //       Branch,
  //     ],
  //   });

  // filter nested model

  //   const result = await Customer.findAll({
  //     where: {
  //       id: 1,
  //       '$Accounts.balance$': {
  //         [Op.lt]: 10000,
  //       },
  //     },
  //     include: [Account, Branch],
  //   });

  // ต้องการ order ให้ทำให้ top level เสมอ ใน nested model
  //   const result = await Customer.findAll({
  //     include: [Account, Branch],
  //     order: [[Account, 'balance', 'DESC']],

  //   });

  // เลือก id, fname, last ของ customer และ เลือกเฉพาะ balance id account,ชื่อสาขา
  //   const result = await Customer.findAll({
  //     attributes: ['id', 'firstName', 'lastName'],
  //     include: [
  //       {
  //         model: Account,
  //         attributes: ['id', 'balance'],
  //         include: [
  //           {
  //             model: Branch,
  //             attributes: ['name'],
  //           },
  //         ],
  //       },
  //     ],
  //   });

  // ให้เขียน ดึงข้อมูลบัญชี balance > 10000 โดยให้ดึงชื่อสาขา ชื่อลูกค้า และเงื่อนไขว่าชื่อลูกค้า ต้องมีตัว t อยู่ในชื่อ และให้เรียง balaance จากมากไปน้อย
  //   const result = await Customer.findAll({
  //     attributes: ['id', 'firstName'],
  //     include: [
  //       {
  //         model: Account,
  //         attributes: ['balance'],
  //         include: [
  //           {
  //             model: Branch,
  //             attributes: ['name'],
  //           },
  //         ],
  //       },
  //     ],
  //     where: {
  //       '$Accounts.balance$': {
  //         [Op.gt]: 10000,
  //       },
  //       firstName: {
  //         [Op.substring]: 't',
  //       },
  //     },
  //     order: [[Account, 'balance', 'DESC']],
  //   });

  //   const result = await Account.findAll({
  //     where: {
  //       balance: {
  //         [Op.gt]: 10000,
  //       },
  //       '$Customer.first_name$': {
  //         [Op.substring]: 't',
  //       },
  //     },
  //     include: [
  //       {
  //         model: Customer,
  //         attributes: ['firstName'],
  //       },
  //       {
  //         model: Branch,
  //         attributes: ['name'],
  //       },
  //     ],
  //     order: [['balance', 'DESC']],
  //   });

  //   const result = await Transfer.findAll({
  //     // include: ['ToAccount', 'FromAccount'],
  //     include: [
  //       {
  //         model: Account,
  //         as: 'ToAccount',
  //         attributes: ['balance'],
  //       },
  //       'FromAccount',
  //     ],
  //   });
  //   console.log(JSON.stringify(result, null, 2));
  const sql =
    'SELECT c.first_name as firstName , SUM(a.balance) AS total FROM accounts a LEFT JOIN customers c ON a.customer_id = c.id group by c.id';
  const arrResult = await sequelize.query(sql, { type: QueryTypes.SELECT });
  console.log(JSON.stringify(arrResult, null, 2));
};
run();
