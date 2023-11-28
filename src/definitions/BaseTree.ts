export interface BaseTree<T> {
  id: string;
  items?: T[];
}

export const DUMMY_ROOT_ID = "-1";

export const createRoot = <T extends BaseTree<T>>(items: T[]): T => {
  return {
    id: DUMMY_ROOT_ID,
    items,
  } as T;
};

export const findNode = <T extends BaseTree<T>>(
  tree: T,
  id: string
): T | undefined => {
  if (tree.id === id) {
    return tree;
  }
  if (tree.items) {
    for (const item of tree.items) {
      const result = findNode(item, id);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};

export const findParent = <T extends BaseTree<T>>(
  tree: T,
  id: string
): T | undefined => {
  if (tree.items) {
    for (const item of tree.items) {
      if (item.id === id) {
        return tree;
      }
      const result = findParent(item, id);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};

export const isAncenstor = <T extends BaseTree<T>>(
  tree: T,
  id: string,
  parentId: string
): boolean => {
  const parent = findParent(tree, id);
  if (!parent) {
    return false;
  }
  if (parent.id === parentId) {
    return true;
  }
  return isAncenstor(tree, parent.id, parentId);
};

// remove and return the new tree and the removed node
// if the node is not found, return the original tree and undefined
export const removeNode = <T extends BaseTree<T>>(
  tree: T,
  id: string
): { tree?: T; removed?: T } => {
  if (tree.id === id) {
    return { tree: undefined, removed: tree };
  }
  if (tree.items) {
    for (let i = 0; i < tree.items.length; i++) {
      const item = tree.items[i];
      if (item.id === id) {
        const newTree = { ...tree };
        newTree.items = [...tree.items];
        newTree.items.splice(i, 1);
        return { tree: newTree, removed: item };
      }
      const result = removeNode(item, id);
      if (result.removed) {
        const newTree = { ...tree };
        newTree.items = tree.items.filter((_, index) => {
          if (index === i) {
            return !!result.tree;
          }
          return true;
        });
        return { tree: newTree, removed: result.removed };
      }
    }
  }
  return { tree, removed: undefined };
};

// new node is inserted before the target node
export const insertNodeBefore = <T extends BaseTree<T>>(
  tree: T,
  targetId: string,
  newNode: T
): T => {
  if (tree.id === targetId) {
    return newNode;
  }
  if (tree.items) {
    for (let i = 0; i < tree.items.length; i++) {
      const item = tree.items[i];
      if (item.id === targetId) {
        const newTree = { ...tree };
        newTree.items = [...tree.items];
        newTree.items.splice(i, 0, newNode);
        return newTree;
      }
      const result = insertNodeBefore(item, targetId, newNode);
      if (result) {
        const newTree = { ...tree };
        newTree.items = tree.items.map((item, index) => {
          if (index === i) {
            return result;
          }
          return item;
        });
        return newTree;
      }
    }
  }
  return tree;
};

export const insertNodeAfter = <T extends BaseTree<T>>(
  tree: T,
  targetId: string,
  newNode: T
): T => {
  if (tree.id === targetId) {
    return newNode;
  }
  if (tree.items) {
    for (let i = 0; i < tree.items.length; i++) {
      const item = tree.items[i];
      if (item.id === targetId) {
        const newTree = { ...tree };
        newTree.items = [...tree.items];
        newTree.items.splice(i + 1, 0, newNode);
        return newTree;
      }
      const result = insertNodeAfter(item, targetId, newNode);
      if (result) {
        const newTree = { ...tree };
        newTree.items = tree.items.map((item, index) => {
          if (index === i) {
            return result;
          }
          return item;
        });
        return newTree;
      }
    }
  }
  return tree;
};

export const moveAndInsertNodeBefore = <T extends BaseTree<T>>(
  tree: T,
  targetId: string,
  sourceId: T
): T => {
  const { tree: newTree, removed } = removeNode(tree, sourceId.id);
  if (!newTree || !removed) {
    return tree;
  }
  return insertNodeBefore(newTree, targetId, removed);
};
