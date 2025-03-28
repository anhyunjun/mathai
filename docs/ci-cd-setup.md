# CI/CD Pipeline Setup

## GitHub Actions Workflow

To set up a CI/CD pipeline using GitHub Actions, you'll need to create a workflow configuration file in your repository. This file will define the automated processes that run when code is pushed to your repository.

### Basic Workflow Setup

1. Create a `.github/workflows` directory in your repository
2. Create a YAML file (e.g., `ci-cd.yml`) in this directory

Here's a sample workflow configuration for a Vite React application:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Run tests
      run: npm test
      
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/
```

### Deployment Configuration

For deployment, you can extend the workflow to deploy to various platforms:

#### Deploying to GitHub Pages

Add this job to your workflow file:

```yaml
  deploy-to-gh-pages:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist
        
    - name: Deploy to GitHub Pages
      uses: JamesIves/github-pages-deploy-action@v4
      with:
        folder: dist
```

#### Deploying to a Custom Server

For deploying to your own server via SSH:

```yaml
  deploy-to-server:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist
        
    - name: Deploy to server
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        source: "dist/"
        target: "/var/www/html/"
```

## Setting Up Environment Variables

For sensitive information like API keys or deployment credentials, use GitHub Secrets:

1. Go to your repository on GitHub
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add your secrets (e.g., `SSH_KEY`, `HOST`, `USERNAME`)

## Continuous Integration Best Practices

1. **Run Tests Automatically**: Ensure all tests pass before deployment
2. **Code Quality Checks**: Add linting and code quality tools
3. **Branch Protection**: Require status checks to pass before merging
4. **Versioning**: Implement semantic versioning for releases

## Monitoring Deployments

1. Go to the "Actions" tab in your GitHub repository
2. You'll see all workflow runs with their status
3. Click on any run to see detailed logs and results

## Troubleshooting

If your workflow fails:

1. Check the workflow logs for error messages
2. Verify that all environment variables and secrets are correctly set
3. Ensure your tests are passing locally before pushing
4. Check that your build script works correctly
