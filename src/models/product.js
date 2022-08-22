"use strict";

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
      subcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "subcategory",
          key: "id",
        },
      },
      subSubcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "sub_subcategory",
          key: "id",
        },
      },
      brandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "brand",
          key: "id",
        },
      },
      vendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "vendor",
          key: "id",
        },
      },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameBn: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      descriptionBn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      tags: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metaTitle: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metaDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      costPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      retailPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discountPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      currencyIsoCode: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      class: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 999,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cartQuantityLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
      lengthInFeet: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      widthInFeet: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      heightInFeet: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      weightInKilogram: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      deliveryChargeType: {
        type: DataTypes.ENUM("regular", "special"),
        allowNull: true,
      },
      deliveryChargeInside: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      deliveryChargeOutside: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      paymentType: {
        type: DataTypes.ENUM("cod", "dvp"),
        allowNull: false,
      },
      isCouponApplicable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: false,
        defaultValue: "active",
      },
      viewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isEmiApplicable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      emiTenure: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      paranoid: false,
      underscored: true,
      freezeTableName: true,
      tableName: "product",
    }
  );
  return product;
};
