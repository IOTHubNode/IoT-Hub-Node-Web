import request from '@/utils/http';

// 添加物模型
export const addDeviceModel = (data: any) => request.post<any, any>('v1/d_model/devicemodel', data);

// 获取物模型列表
export const getDeviceModelList = () => request.get<any, any>('v1/d_model/devicemodels');
