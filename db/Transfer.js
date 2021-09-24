module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define(
    'Transfer',
    {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Transfer.associate = (models) => {
    Transfer.belongsTo(models.Account, {
      as: 'ToAccount',
      foreignKey: {
        name: 'toAccountId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    Transfer.belongsTo(models.Account, {
      as: 'FromAccount',
      foreignKey: {
        name: 'fromAccountId',
        allowNull: false,
      },
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });
  };

  return Transfer;
};
