[{$lookup: {
  from: 'workspaces',
  localField: 'seller.workspace',
  foreignField: '_id',
  as: 'seller.workspace'
}}, {$unwind: {
  path: '$seller.workspace',
  preserveNullAndEmptyArrays: true
}}, {$lookup: {
  from: 'workspaces',
  localField: 'broker.workspace',
  foreignField: '_id',
  as: 'broker.workspace'
}}, {$unwind: {
  path: '$broker.workspace',
  preserveNullAndEmptyArrays: true
}}, {$lookup: {
  from: 'places',
  localField: 'shippingAddress.place',
  foreignField: '_id',
  as: 'shippingAddress.place'
}}, {$unwind: {
  path: '$shippingAddress.place',
  preserveNullAndEmptyArrays: true
}}, {$lookup: {
  from: 'shippingMethods',
  localField: 'shippingMethod',
  foreignField: '_id',
  as: 'shippingMethod'
}}, {$unwind: {
  path: '$shippingMethod'
}}, {$unwind: {
  path: '$lines'
}}, {$lookup: {
  from: 'products',
  localField: 'lines.product._id',
  foreignField: '_id',
  as: 'lines.product'
}}, {$lookup: {
  from: 'catalogItems',
  localField: 'lines.item._id',
  foreignField: '_id',
  as: 'lines.item'
}}, {$unwind: {
  path: '$lines.product'
}}, {$unwind: {
  path: '$lines.item'
}}, {$unwind: {
  path: '$lines.product.categories',
  preserveNullAndEmptyArrays: true
}}, {$lookup: {
  from: 'productCategories',
  localField: 'lines.product.categories',
  foreignField: '_id',
  as: 'lines.product.categories'
}}, {$unwind: {
  path: '$lines.product.categories'
}}, {$lookup: {
  from: 'productClassifications',
  localField: 'lines.product.categories.classification',
  foreignField: '_id',
  as: 'lines.product.categories.classification'
}}, {$unwind: {
  path: '$lines.product.categories.classification'
}}, {$group: {
    _id:{
      _id: '$_id',
      _category: '$lines.product._id'
    },
    root: { $mergeObjects: '$$ROOT' },
    categories: { 
       $push: '$lines.product.categories'
    }
}}, {$set: {
  'root.lines.product.categories': '$categories' 
}}, {$replaceRoot: {
    newRoot: {
        $mergeObjects: ['$root', '$$ROOT']
    }
}}, {$project: {
  root: 0,
  categories: 0
}}, {$group: {
    _id: '$_id',
    root: { $mergeObjects: '$$ROOT' },
    lines: { 
       $push: '$lines'
    }
}}, {$replaceRoot: {
    newRoot: {
        $mergeObjects: ['$root', '$$ROOT']
    }
}}, {$project: {
  root: 0
}}]
