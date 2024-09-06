const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    exec('./testing.sh', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });


})

app.get('/create_config', (req, res) => {


})

function run_script() {
    // for docker installation etc. 
}

function config() {
    // will write the init.yaml file    
}

app.listen(3000, () => { console.log("working ")})
