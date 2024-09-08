const express = require('express');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { config } = require('process');

const app = express();
app.use(express.json());

const configDirectory = path.join(__dirname, 'data', 'config');
const yamlFilePath = path.join(__dirname, 'data', 'config', 'init.yaml');

app.get('/', (req, res) => {
    run_script();




})

app.post('/create_config', (req, res) => {
    console.log(req.body.data)
    configyamlfile(req.body.data);
    res.send("config file created")


})

function run_script() {

    exec('./script.sh', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
    console.log("successfully run the script and the container is running")

    const script = spawn('bash', ['./script.sh']);

    script.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

}

function configyamlfile(config) {
    // will write the init.yaml file 
    const { validators, operatorIDs, withdrawAddress, owner, nonce, network, operators } = config
    console.log(operatorIDs)
    const yamlcontent = `
validators: ${validators}
operatorIDs: [${operatorIDs.join(', ')}]
withdrawAddress: "${withdrawAddress}"
owner: "${owner}"
nonce: ${nonce}
network: "${network}"
operatorsInfo: '${JSON.stringify(operators)}'
outputPath: /data/config
logLevel: info
logFormat: json
logLevelFormat: capitalColor
logFilePath: /data/debug.log

`
    console.log(operatorIDs)
    if (!fs.existsSync(configDirectory)) {
        fs.mkdirSync(configDirectory);
    }
    fs.writeFile(yamlFilePath, yamlcontent, (err) => {
        if (err) {
            console.error(err);
        }

    });
    console.log("yaml file creation done")
    console.log("now running the script")


}

app.listen(3000, () => { console.log("backend is on") })
