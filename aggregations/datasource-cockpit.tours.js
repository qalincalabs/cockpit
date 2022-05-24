[{$lookup: {
  from: 'vehicles',
  localField: 'vehicle',
  foreignField: '_id',
  as: 'vehicle'
}}, {$unwind: {
  path: '$vehicle'
}}, {$unwind: {
  path: '$legs'
}}, {$lookup: {
  from: 'places',
  localField: 'legs.origin.place',
  foreignField: '_id',
  as: 'legs.origin.place'
}}, {$unwind: {
  path: '$legs.origin.place'
}}, {$lookup: {
  from: 'places',
  localField: 'legs.destination.place',
  foreignField: '_id',
  as: 'legs.destination.place'
}
}, {$unwind: {
  path: '$legs.destination.place'
}}, {$group: {
  _id: '$_id',
  root: {
    $mergeObjects: '$$ROOT'
  },
  legs: {
    $push: '$legs'
  }
}}, {$replaceRoot: {
  newRoot: {
    $mergeObjects: [
      '$root',
      '$$ROOT'
    ]
  }
}}, {$project: {
  root: 0
}}, {$unwind: {
  path: '$stops'
}}, {$lookup: {
  from: 'places',
  localField: 'stops.place',
  foreignField: '_id',
  as: 'stops.place'
}}, {$unwind: {
  path: '$stops.place'
}}, {$group: {
  _id: '$_id',
  root: {
    $mergeObjects: '$$ROOT'
  },
  stops: {
    $push: '$stops'
  }
}}, {$replaceRoot: {
  newRoot: {
    $mergeObjects: [
      '$root',
      '$$ROOT'
    ]
  }
}}, {$project: {
  root: 0
}}]
