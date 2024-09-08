#!/bin/bash

# Function to install Docker on Linux
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
    echo "Docker has been installed on Linux."
}

# Function to install Docker on macOS
install_docker_mac() {
    echo "Installing Docker for Mac..."
    brew install --cask docker
    echo "Docker has been installed on macOS."
}

echo "Checking Docker installation..."

# Check if Docker is installed
if command -v docker &> /dev/null; then
    echo "Docker is installed."
else
    echo "Docker is not installed."
    
    # Check the OS type and install Docker accordingly
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        install_docker_Linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        install_docker_mac
    else
        echo "Operating system not supported for Docker installation."
        exit 1
    fi
fi

# Path to config folder (modify this if needed)
CONFIG_PATH="./data/config"

# Check if the config folder exists
if [ -d "$CONFIG_PATH" ]; then
    echo "Config folder found at $CONFIG_PATH."
else
    echo "Config folder not found at $CONFIG_PATH. Please create the folder and add necessary configuration files."
    exit 1
fi

# Run the Docker command with the path to the config files
echo "Running the SSV DKG Docker container..."
docker run --rm --platform linux/amd64 \
-v "$CONFIG_PATH":/data/config  \
"bloxstaking/ssv-dkg:latest" init \
--configPath /data/config/init.yaml

echo "Docker command executed successfully."
