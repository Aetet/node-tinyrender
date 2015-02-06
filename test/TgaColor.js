var should = require('chai').should();
var TgaColor = require('../lib/TgaColor');
describe('TgaColor', function () {
	it('constructor position args', function () {
		var color = new TgaColor(10, 11, 12, 13)

		Buffer.isBuffer(color.bgra).should.be.true;
		color.bgra.toJSON().should.be.deep.eql([12, 11, 10, 13]);
	});
	it('constructor object', function () {
		var color = new TgaColor({
			r: 100, 
			g: 110, 
			b: 120, 
			a: 130
		})
		Buffer.isBuffer(color.bgra).should.be.true;
		color.bgra.toJSON().should.be.deep.eql([ 120, 110, 100, 130 ]);
	});
});
