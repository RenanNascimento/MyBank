const passport    = require('passport');
const passportJWT = require("passport-jwt");
let model = require('./models/index');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'nome',
        passwordField: 'senha'
    },

    function (nome, senha, cb) {
        return model.Client.findOne({where: { nome: nome, senha: senha }})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect name or password.'});
                }
                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return model.Client.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));