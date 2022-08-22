'use strict';

module.exports = {
  // environment
  DEV: 'development',
  TEST: 'test',
  STAGING: 'staging',
  PROD: 'production',

  // misc
  REPLY_FROM: '"DROBBOO" no-reply@drobboo.com',

  /*
   * module identifiers, module/plugin name need to list here a new plugin is introduced
   * value: plugin name
   * label: plugin details
   */
  MODULE_IDENTIFIERS: [
    { value: 'admin', label: 'Admin Management' },
    { value: 'address', label: 'Address Management' },
    { value: 'attribute', label: 'Attribute Management' },
    { value: 'attribute-value', label: 'Attribute Value Management' },
    { value: 'badge', label: 'Badge Management' },
    { value: 'brand', label: 'Brand Management' },
    { value: 'catalog', label: 'Catalog Management' },
    { value: 'category', label: 'Category Management' },
    { value: 'coupon', label: 'Coupon Management' },
    { value: 'customer', label: 'Customer Management' },
    { value: 'dashboard', label: 'Dashboard Management' },
    { value: 'order', label: 'Order Management' },
    { value: 'ordered-item', label: 'Ordered Item Management' },
    { value: 'purchase-order', label: 'Purchase Order Management' },
    {
      value: 'product',
      label: 'Product Management',
    },
    {
      value: 'product-image',
      label: 'Product Image Management',
    },
    {
      value: 'product-specification',
      label: 'Product Specification Management',
    },
    { value: 'specification', label: 'Specification Management' },
    { value: 'sub-subcategory', label: 'Sub Subcategory Management' },
    { value: 'subcategory', label: 'Subcategory Management' },
    { value: 'user', label: 'User Management' },
    { value: 'user-permission', label: 'User Permission Management' },
    { value: 'vendor', label: 'Vendor Management' },
    { value: 'banner', label: 'Banner Management' },
    { value: 'campaign', label: 'Campaign Management' },
    { value: 'campaign-product', label: 'Campaign Product Management' },
    { value: 'featured-brand', label: 'Featured Brand Management' },
    { value: 'featured-category', label: 'Featured Category Management' },
    { value: 'featured-product', label: 'Featured Product Management' },
    { value: 'featured-store', label: 'Featured Store Management' },
    { value: 'offer-category', label: 'Offer Category Management' },
    { value: 'popup-banner', label: 'Popup Banner Management' },
    { value: 'promoted-feature', label: 'Promoted Feature Management' },
    { value: 'store-catalog', label: 'Store Catalog Management' },
    { value: 'tagged-banner', label: 'Tagged Banner Management' },
    { value: 'product-update-request', label: 'Product Update Request' },
    { value: 'most-popular-product', label: 'Most Popular Product' },
  ],

  // module permissions
  MODULE_PERMISSIONS: [
    'create',
    'read',
    'update',
    'delete',
    'approve',
    'download',
  ],
};
