// To convert dataUrl (which we get from our blob) to a a file object
export const dataURLtoFile = (dataurl: string, filename: string) => {
	const arr = dataurl.split(",");
	const mime = arr[0].match(/:(.*?);/)![1];
	const buf = Buffer.from(arr[1], 'base64');
	const bstr = buf.toString('base64');
	var n = bstr.length;
	const u8arr = new Uint8Array(n);

	while (n--) u8arr[n] = bstr.charCodeAt(n);

	return new File([u8arr], filename, { type: mime });
};