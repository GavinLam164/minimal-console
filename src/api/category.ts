
import { get, post } from './index';

export const categoryBackFindByParentId = (categoryId?: number) => get('/category/back/findByParentId', {
  categoryId,
});

interface Category {
  parentId?: number;
  categoryName: string;
  categoryId?: number;
  state?: number;
}

export const categoryBackAdd = (category: Category) => post('/category/back/add', category);

export const categoryBackUpdateState = (category: Category) => post('/category/back/updateState', category);

export const categoryBackTreeList = () => post('/category/back/treeList');

export default {};
