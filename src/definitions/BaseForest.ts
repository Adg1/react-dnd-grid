import { BaseTree } from "./BaseTree";
import * as TreeUtils from "./BaseTree";

export const findNode = <T extends BaseTree<T>>(
  forest: T[],
  id: string
): T | undefined => {
  const tree = TreeUtils.createRoot(forest);
  return TreeUtils.findNode(tree, id);
};

export const findParent = <T extends BaseTree<T>>(
  forest: T[],
  id: string
): T | undefined => {
  const tree = TreeUtils.createRoot(forest);
  return TreeUtils.findParent(tree, id);
};

/**
 * @param forest
 * @param id
 * @param parentId
 * @returns true if parentId is an ancestor of id
 */
export const isAncenstor = <T extends BaseTree<T>>(
  forest: T[],
  id: string,
  parentId: string
): boolean => {
  const tree = TreeUtils.createRoot(forest);
  return TreeUtils.isAncenstor(tree, id, parentId);
};

export const removeNode = <T extends BaseTree<T>>(
  forest: T[],
  id: string
): { forest?: T[]; removed?: T } => {
  const tree = TreeUtils.createRoot(forest);
  const result = TreeUtils.removeNode(tree, id);

  return {
    forest: result.tree ? result.tree.items : undefined,
    removed: result.removed,
  };
};

export const insertNodeBefore = <T extends BaseTree<T>>(
  forest: T[],
  id: string,
  node: T
): T[] => {
  const tree = TreeUtils.createRoot(forest);
  const result = TreeUtils.insertNodeBefore(tree, id, node);

  return result.items ? result.items : [];
};

export const insertNodeAfter = <T extends BaseTree<T>>(
  forest: T[],
  id: string,
  node: T
): T[] => {
  const tree = TreeUtils.createRoot(forest);
  const result = TreeUtils.insertNodeAfter(tree, id, node);

  return result.items ? result.items : [];
};

export const moveAndInsertNodeBefore = <T extends BaseTree<T>>(
  forest: T[],
  id: string,
  node: T
): T[] => {
  const tree = TreeUtils.createRoot(forest);
  const result = TreeUtils.moveAndInsertNodeBefore(tree, id, node);

  return result.items ? result.items : [];
};
