import request from '@/utils/http';

// 获取物模型列表
export const getDeviceModelList = () => request.get<any, any>('v1/devicemodels');
