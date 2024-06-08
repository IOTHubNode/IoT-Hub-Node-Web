import request from '@/utils/http';

// 获取系统信息
export const getSysInfo = () => request.get<any, any>('v1/sysview/sysinfo');
