import { post, get } from './index';

interface SpuListReq {
  spuId?: number;
  skuId?: number;
  spuName?: string;
  skuCode?: string;
  categoryId?: number;
  saleStates?: Array<number>;
}

export const productSpuList = (params: SpuListReq) => post('/product/spu/list', params, {
  headers: {
    'Content-Type': 'application/json',
  },
});

interface SpuListStateReq {
  spuId: Array<number>;
  saleStates: number;
}

export const productSpuUpdateState = (params: SpuListStateReq) => post('/product/spu/updateState', params);

interface ImageObj {
  path: string;
  url: string;
}

interface ProductSpu {
  spuId?: number;
  spuName: string;
  spuDesc?: string;
  spuPrice: number;
  categoryId: number;
  saleState: number;
  bannerImageList: Array<ImageObj>;
  detailImageList: Array<ImageObj>;
}

export const productSpuAdd = (params: ProductSpu) => post('/product/spu/add', params, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productSpuQuery = (spuId: number) => get('/product/spu/query', {
  spuId,
});


export const specGroupList = (spuId: number) => get('/spec/group/list', {
  spuId,
});

interface SpecValue {
  specValueId?: number;
  specGroupId: number;
  specValueName: string;
  specValueIndex: number;
  spuId: number;
}

export const specValueAdd = (params: SpecValue) => post('/spec/value/add', params, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export const specValueList = (spuId: number, specGroupId: number) => get('/spec/value/list', {
  spuId,
  specGroupId,
});

export const specGroupListSelect = (spuId: number) => get('/spec/group/list/select', {
  spuId,
});


export const productSkuList = (spuId: number) => get('/product/sku/list', {
  spuId,
});

export default {};
