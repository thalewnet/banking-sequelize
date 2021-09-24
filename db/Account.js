module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
      openDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      closeDate: DataTypes.DATEONLY,

      balance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      underscored: true,
    }
  );

  Account.associate = (models) => {
    Account.belongsTo(models.Customer, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESRICT',
    });

    Account.belongsTo(models.Branch, {
      foreignKey: {
        name: 'branchId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Account.hasMany(models.Transfer, {
      as: 'TransferTos',
      foreignKey: {
        name: 'toAccountId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    Account.hasMany(models.Transfer, {
      as: 'TransferFroms',
      foreignKey: {
        name: 'fromAccountId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Account;
};
