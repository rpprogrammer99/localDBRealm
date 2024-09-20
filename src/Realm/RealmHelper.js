// realmHelpers.js

export const realmInsertArray = (realm, realmString, array) => {
  realm.write(() => {
    array.forEach(task => {
      realm.create(realmString, task);
    });
  });
};

export const realmCreate = (realm, realmString, obj) => {
  realm.write(() => {
    realm.create(realmString, obj);
  });
};

export const realmUpdate = (realm, updateCallback) => {
  realm.write(() => {
    updateCallback();
  });
};

export const realmDelete = (realm, item) => {
  realm.write(() => {
    realm.delete(item);
  });
};

export const realmClearAll = realm => {
  realm.write(() => {
    realm.deleteAll();
  });
};
