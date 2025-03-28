#!/bin/bash

# GitHub Integration Setup Script
# This script helps set up the connection between your local environment and GitHub

echo "===== GitHub Integration Setup ====="
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install Git first."
    echo "Visit https://git-scm.com/downloads for installation instructions."
    exit 1
fi

# Get user information
echo "Please enter your information for Git configuration:"
read -p "Your Name: " git_name
read -p "Your Email: " git_email

# Configure Git
git config --global user.name "$git_name"
git config --global user.email "$git_email"
echo "Git configured with name: $git_name and email: $git_email"

# GitHub repository setup
echo ""
echo "Now, let's connect to your GitHub repository."
read -p "GitHub Repository URL (e.g., https://github.com/username/repo.git): " repo_url

# Initialize Git if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "Git repository initialized."
fi

# Add remote origin
git remote -v | grep -q origin
if [ $? -eq 0 ]; then
    git remote set-url origin $repo_url
    echo "Updated remote origin to $repo_url"
else
    git remote add origin $repo_url
    echo "Added remote origin: $repo_url"
fi

# Stage all files except those in .gitignore
echo ""
echo "Staging files for initial commit..."
git add .

# Initial commit
echo ""
read -p "Enter a message for your initial commit: " commit_message
git commit -m "$commit_message"

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git push -u origin main || git push -u origin master

echo ""
echo "===== Setup Complete ====="
echo "Your project is now connected to GitHub!"
echo "Use 'git push' to push future changes to GitHub."
echo "Use 'git pull' to pull changes from GitHub."
