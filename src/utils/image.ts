// 处理本地图片链接的头部
export const updateImageUrl = (Imageurl: string) => {
	//console.log(Imageurl);

	// 如果是https://开头，则直接返回
	if (Imageurl.startsWith('http://') || Imageurl.startsWith('https://')) {
		return Imageurl;
	}

	// 如果是相对路径，则拼接为完整的URL
	if (Imageurl.startsWith('/')) {
		return `${import.meta.env.VITE_APP_BASE_URL}:${import.meta.env.VITE_APP_PORT}${Imageurl}`;
	}
};
