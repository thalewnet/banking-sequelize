module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define(
    'Branch',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      underscored: true,
    }
  );

  Branch.associate = (models) => {
    Branch.hasMany(models.Account, {
      foreignKey: {
        name: 'branchId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Branch.belongsToMany(models.Customer, {
      through: 'accounts',
      foreignKey: 'branchId',
      otherKey: 'customerId',
    });
  };

  return Branch;
};
