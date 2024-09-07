const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();
app.use(express.json());


const operatorfilepath = path.join(__dirname, 'config', 'operatorsinfo.json');
const yamlFilePath = path.join(__dirname, 'config', 'init.yaml');

app.get('/', (req, res) => {



})

app.get('/create_config', (req, res) => {


})

function run_script() {
    // for docker installation etc. 
    exec('./testing.sh', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });

}

function config(config) {
    // will write the init.yaml file 
    const { validators, withdrawAddress, owner, nonce } = config

}

app.listen(3000, () => { console.log("working ") })
