module.exports = (squelize, DataTypes) => {
  const Customer = squelize.define(
    'Customer',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: DataTypes.ENUM('MALE', 'FEMALE'),
      birthDate: DataTypes.DATEONLY,
      address: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  Customer.associate = (models) => {
    Customer.hasMany(models.Account, {
      foreignKey: {
        name: 'customerId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Customer;
};
