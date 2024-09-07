const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { config } = require('process');

const app = express();
app.use(express.json());

const configDirectory = path.join(__dirname, 'config');
const yamlFilePath = path.join(__dirname, 'config', 'init.yaml');

app.get('/', (req, res) => {



})

app.get('/create_config', (req, res) => {
    configyamlfile(req.body);


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

function configyamlfile(config) {
    // will write the init.yaml file 
    const { validators, operatorIDs, withdrawAddress, owner, nonce, network, operators } = config
    const yamlcontent = `
validators: ${validators}
operatorIDs: [${operatorIDs.join(', ')}]
withdrawAddress: "${withdrawAddress}"
owner: "${owner}"
nonce: ${nonce}
network: "${network}"
operatorsInfo: '${JSON.stringify(operators)}'
outputPath: /data/output
logLevel: info
logFormat: json
logLevelFormat: capitalColor
logFilePath: /data/debug.log

`
    if (!fs.existsSync(configDirectory)) {
        fs.mkdirSync(configDirectory);
    }
    fs.writeFile(yamlFilePath, yamlcontent, (err) => {
        if (err) {
            console.error(err);
        }

    });


}

app.listen(3000, () => { console.log("backend is on") })
