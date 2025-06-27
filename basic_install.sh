#!/bin/bash

set -e  # Exit on any error

echo "Installing Docker from official repository..."

# Update package index
sudo apt get update

# Install prerequisites
sudo apt get install -y ca-certificates curl

# Create keyrings directory
sudo install -m 0755 -d /etc/apt/keyrings

# Add Docker's GPG key
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index
sudo apt get update

# Install Docker packages
sudo apt get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "Docker installation completed successfully!"
echo "Docker version: $(docker --version)"