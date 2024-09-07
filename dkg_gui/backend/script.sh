#!/bin/bash

echo "checking docker installation ..."

if command -v docker &> /dev/null; then
    echo "docker is installed"
    
else
    echo "docker is not installed"
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        install_docker_Linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        install_docker_mac
    else
        echo "OS not supported"
    
fi



install_docker_Linux() {
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce
    sudo usermod -aG docker ${USER}
    sudo systemctl enable docker
    sudo systemctl start docker
}

install_docker_mac() {
    echo "installing docker for mac"
    brew install --cask docker
}

# referances https://stackoverflow.com/questions/394230/how-to-detect-the-os-from-a-bash-script
