import request from '@/utils/http';

// 添加物模型
export const addDevice = (data: any) => request.post<any, any>('v1/device/device', data);

// 获取物模型列表
export const getDeviceList = () => request.get<any, any>('v1/device/device');

// 获取某个物模型
export const getDevice = (id: string) => request.get<any, any>(`v1/device/device/${id}`);

// 获取某个顺便近期属性数据
export const getDeviceAttributeData = (id: string) =>
	request.get<any, any>(`v1/device/device/${id}/attributes`);
