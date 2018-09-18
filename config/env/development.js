'use strict';

module.exports = {
	//db: 'mongodb://localhost/leilao-dev',
	//db: process.env.MONGOLAB_URI_DEV || 'mongodb://' + (process.env.MONGOLAB_USERNAME_DEV) + ':lava123jato@ds149742.mlab.com:49742/lavajato_dev',
	//db: process.env.MONGOLAB_URI_DEV || 'mongodb://lavajato:lava123jato@ds149742.mlab.com:49742/lavajato_dev',
	db: process.env.MONGOLAB_URI_DEV || 'mongodb://lavajatoadmin:nt2vut97o4b1cbe74knu0ln1iv@ds155862.mlab.com:55862/lavajato_prod',
	//db: process.env.MONGOLAB_URI_DEV || 'mongodb://teste:teste123@ds051913.mlab.com:51913/heroku_3m3qfd4s',
	app: {
		title: 'Lava Jato - Development Environment'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '64358772177-lqtq513bcp3kuve4rqn91gvqdrrbefel.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'LWyL8-_RDOsyfm9BeMOI3BDj',
		callbackURL: '/auth/google/callback'
	}	
};
