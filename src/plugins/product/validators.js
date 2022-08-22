const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const Relish = require("relish")({
  messages: { image: "Image is required!" },
});
const { options } = require("../../utils/validation");

const payload = {
  categoryId: Joi.number().positive().required(),
  subcategoryId: Joi.number().positive().required(),
  subSubcategoryId: Joi.number().positive().allow(null).allow(""),
  brandId: Joi.number().positive().required(),
  vendorId: Joi.number().positive().required(),
  sku: Joi.string().max(255).required().trim(),
  name: Joi.string().max(255).required().trim(),
  nameBn: Joi.string().max(255).allow(null).allow("").trim(),
  description: Joi.string().required().trim(),
  descriptionBn: Joi.string().allow(null).allow("").trim(),
  tags: Joi.string().allow(null).allow(""),
  metaTitle: Joi.string().allow(null).allow(""),
  metaDescription: Joi.string().required().trim(),
  type: Joi.string().max(255).required().trim(),
  costPrice: Joi.number().required(),
  retailPrice: Joi.number().required(),
  discountPrice: Joi.number().allow(null).allow(""),
  currencyIsoCode: Joi.string().max(255).required().trim(),
  image: Joi.any().required(),
  quantity: Joi.number().required().allow(0),
  cartQuantityLimit: Joi.number().required().positive(),
  class: Joi.number().required().positive(),
  paymentType: Joi.string().max(255).required().trim(),
  lengthInFeet: Joi.number().allow(0),
  widthInFeet: Joi.number().allow(0),
  heightInFeet: Joi.number().allow(0),
  weightInKilogram: Joi.number().allow(0),
  deliveryChargeType: Joi.string().max(255).required().trim(),
  deliveryChargeInside: Joi.number().required(),
  deliveryChargeOutside: Joi.number().required(),
  status: Joi.string().max(255).required().lowercase().trim(),
  isCouponApplicable: Joi.boolean().required(),
  isEmiApplicable: Joi.boolean().required(),
  emiTenure: Joi.number().allow(0),
};

const failAction = Relish.failAction;

module.exports = {
  add: {
    payload: Joi.object().keys(payload),
    options,
    failAction,
  },

  deliveryCharge: {
    payload: Joi.object().keys({
      city: Joi.string().max(255).required().trim(),
      cart: Joi.array()
        .items({
          productId: Joi.number().positive().required(),
          quantity: Joi.number().positive().required(),
        })
        .min(1),
    }),
    options,
    failAction,
  },

  edit: {
    payload: Joi.object().keys({ ...payload, image: Joi.any().allow(null) }),
    options,
    failAction,
  },

  bulkUpdate: {
    payload: Joi.object().keys({
      csv: Joi.any().required(),
    }),
    options,
    failAction,
  },
};
