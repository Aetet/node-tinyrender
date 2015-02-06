require('chai').should();
var TgaHeader = require('../lib/TgaHeader');

describe('TgaHeader', function () {
	it('#pack', function () {
		var a = { idLength: 0,
			colorMapType: 0,
			dataTypeCode: 2,
			colorMapOrigin: 0,
			colorMapLength: 0,
			colorMapDepth: 0,
			xOrigin: 0,
			yOrigin: 0,
			width: 1419,
			height: 1001,
			bitsPerPixel: 24,
			imageDescriptor: 0,
			bytesPerPixel: 3 };

			var res = TgaHeader.pack(a).toJSON();
			res.should.be.eql([ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 139, 5, 233, 3, 24, 0 ]);
		});
	it('#unpack', function () {
		var header = new Buffer([ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 139, 5, 233, 3, 24, 0 ])
		var obj = TgaHeader.unpack(header);
		obj.should.be.deep.eql({ idLength: 0,
			colorMapType: 0,
			dataTypeCode: 2,
			colorMapOrigin: 0,
			colorMapLength: 0,
			colorMapDepth: 0,
			xOrigin: 0,
			yOrigin: 0,
			width: 1419,
			height: 1001,
			bitsPerPixel: 24,
			imageDescriptor: 0 });
	});
});
