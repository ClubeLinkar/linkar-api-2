var mongoose = require('mongoose');

module.exports = function(uri) {
	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('[Mongoose] connected: ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('[Mongoose] Disconnected: ' + uri);
	});

	mongoose.connection.on('error', function(erro) {
		console.log('[Mongoose] Connection: error:  ' + erro);
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('[Mongoose] SIGINT: ' + erro);
			process.exit(0);
		});
	});
};
