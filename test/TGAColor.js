var should = require('chai').should();
var TGAColor = require('../lib/TGAColor');
describe('TGAColor', function () {
	it('constructor position args', function () {
		var color = new TGAColor(10, 11, 12, 13)

		Buffer.isBuffer(color.bgra).should.be.true;
		color.bgra.toJSON().should.be.deep.eql([12, 11, 10, 13]);
	});
	it('constructor object', function () {
		var color = new TGAColor({
			r: 100, 
			g: 110, 
			b: 120, 
			a: 130
		})
		Buffer.isBuffer(color.bgra).should.be.true;
		color.bgra.toJSON().should.be.deep.eql([ 120, 110, 100, 130 ]);
	});
});
