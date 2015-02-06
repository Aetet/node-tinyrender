var binary = require('binary');
var put = require('put');

module.exports = {
	unpack: function (buf) {
		return binary.parse(buf)
			.word8('idLength')
			.word8('colorMapType')
			.word8('dataTypeCode')
			.word16lu('colorMapOrigin')
			.word16lu('colorMapLength')
			.word8('colorMapDepth')
			.word16lu('xOrigin')
			.word16lu('yOrigin')
			.word16lu('width')
			.word16lu('height')
			.word8('bitsPerPixel')
			.word8('imageDescriptor')
			.vars;
	},
	pack: function (obj) {
		return put()
			.word8(obj.idLength)
			.word8(obj.colorMapType)
			.word8(obj.dataTypeCode)
			.word16le(obj.colorMapOrigin)
			.word16le(obj.colorMapLength)
			.word8(obj.colorMapDepth)
			.word16le(obj.xOrigin)
			.word16le(obj.yOrigin)
			.word16le(obj.width)
			.word16le(obj.height)
			.word8(obj.bitsPerPixel)
			.word8(obj.imageDescriptor)
			.buffer();
	}
};
