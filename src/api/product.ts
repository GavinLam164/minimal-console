import { post } from './index';

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

export default {};
