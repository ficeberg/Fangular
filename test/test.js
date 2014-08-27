mocha.setup('bdd');
chai.Should();
var expect = chai.expect;

describe('structure',function(){
	before(function(){
		console.log('test started.');
	});
	it('variable type check',function(){
		expect(app).to.be.a('object');
		expect(view).to.be.a('object');
		expect(view.template).to.be.a('object');
		expect(view.req).to.be.a('array');
		expect(view.run).to.be.a('function');
		expect(sidebar).to.be.a('object');
	});
	it('variable length check',function(){
		expect(Object.keys(view).length).to.be.equal(3);
		expect(Object.keys(view.template).length).to.be.equal(2);
		expect(view.req.length).to.be.equal(4);
	});
});

describe('data source',function(){
	describe('#view', function() {
		it("run GET requests for getting data", function () {
			view.run('');
		});
		it("check readme.rd format", function () {
			$.ajax(view.req[1]).done(function(data){
				expect(marked(data).match(".*\\<[^>]+>.*")).to.be.equal(true);
			});
		});
	});
});


