# GitHub Integration & Local Collaboration Setup

## 1. GitHub Repository Setup

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the '+' icon in the top-right corner and select 'New repository'
3. Enter a repository name (e.g., 'mathkong')
4. Add a description: "An interactive math education platform featuring an AI teacher"
5. Choose visibility (public or private)
6. Do NOT initialize with README, .gitignore, or license (we'll push our existing code)
7. Click 'Create repository'
8. Copy the repository URL for the next steps

## 2. Local Git Configuration

### Install Git (if not already installed)

- **Windows**: Download and install from [git-scm.com](https://git-scm.com/download/win)
- **macOS**: Install via Homebrew: `brew install git` or download from [git-scm.com](https://git-scm.com/download/mac)
- **Linux**: Use your package manager (e.g., `sudo apt install git` for Ubuntu)

### Configure Git

Open a terminal/command prompt and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and the email associated with your GitHub account.

## 3. Repository Cloning

To clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/your-repository.git
cd your-repository
```

Replace the URL with your actual repository URL.

## 4. Working with Tempo Labs AI

### Connecting Tempo to GitHub

1. In Tempo Labs AI, click on the Git tab in the left panel
2. Click "Connect Repository"
3. Enter your GitHub repository URL
4. Authenticate with GitHub when prompted
5. Tempo will now be connected to your GitHub repository

### Pushing Changes from Tempo to GitHub

1. Make your changes in Tempo Labs AI
2. Go to the Git tab in the left panel
3. Review changed files
4. Enter a commit message
5. Click "Commit & Push"

### Pulling Changes from GitHub to Tempo

1. In the Git tab, click "Pull"
2. Tempo will fetch and merge the latest changes from GitHub

## 5. Local Development Workflow

### Initial Setup

After cloning the repository:

```bash
npm install  # Install dependencies
npm run dev  # Start development server
```

### Making Changes Locally

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Stage and commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request on GitHub

### Updating Your Local Repository

To get the latest changes from the main branch:

```bash
git checkout main
git pull origin main
```

Then update your feature branch:

```bash
git checkout feature/your-feature-name
git merge main
```

## 6. Best Practices

- Always pull before starting work to ensure you have the latest code
- Create feature branches instead of working directly on main
- Write clear commit messages describing what changes were made
- Regularly push your changes to GitHub
- Create Pull Requests for code review before merging to main
