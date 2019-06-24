const express = require('express');
const path = require('path');
const FormData = require('form-data');
const { EvaluatedPermissions } = require('discord.js');
const fetch = require('node-fetch');
const clientID = '503239059775422491';
const clientSecret = 'Zdolrk7Osl0lZF-tyiaO5vplszvrR3Ej';
const redirect_uri = 'http://127.0.0.1:8080/index?';

const session = require("express-session");
module.exports = class App {
    constructor(client){
        this.client = client;
        this.init();
    }
    init(){
        this.app = express();
        this.app.use(express.static(__dirname + '/src'));
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '/src'));
        this.app.use(session({ secret: 'keyboard cat', cookie: { }, resave: false, saveUninitialized: true,}))
        
        this.app.listen(8080, function () {
            console.log("Conectado na porta 8080");
        });
        this.app.get("/login", (req, res) => {
            res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=503239059775422491&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Findex%3F&response_type=code&scope=identify%20guilds`);
        });
        this.app.get("/index", async (req, res) => {
            if(!req.session.user && !req.query.code) return res.redirect('/login');
            else if(req.query.code){
                if (!req.query.code) return console.error('Código inválido');
                const data = new FormData();
                data.append('client_id', clientID);
                data.append('client_secret', clientSecret);
                data.append('grant_type', 'authorization_code');
                data.append('redirect_uri', redirect_uri);
                data.append('scope', 'identify connections guilds');
                data.append('code', req.query.code);
                let oauth = await fetch('https://discordapp.com/api/oauth2/token', {
                    method: 'POST',
                    body: data
                }).then(toJson => toJson.json());
                let guilds = await fetch('https://discordapp.com/api/users/@me/guilds', {
                        headers: {
                            authorization: `${oauth.token_type} ${oauth.access_token}`,
                        },
                })
                .then(res => res.json());
                await fetch('https://discordapp.com/api/users/@me', {
                        headers: {
                            authorization: `${oauth.token_type} ${oauth.access_token}`,
                        },
                })
                .then(res => res.json())
                .then(async user => {
                    console.log(user)
                    req.session.user = user;
                    req.session.guilds = guilds;
                    return await res.render('guilds', { client: this.client, user: user, guilds: guilds, permissions: EvaluatedPermissions });
                });
            }
            else
                res.render('index', { client: this.client, user: req.session.user, guilds: req.session.guilds });
        });
        
        this.app.get("/guilds", (req, res) => {
            if(!req.session.guilds) return res.redirect('/login');
            res.render('guilds', { client: this.client, user: req.session.user, guilds: req.session.guilds });
        });
        this.app.get("/guilds/:id", (req, res) => {
            res.render('guilds');
        });
    }
}