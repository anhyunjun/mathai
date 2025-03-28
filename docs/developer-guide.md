# Mathkong Developer Guide

## Project Overview

Mathkong is an interactive math education platform featuring an AI teacher that delivers personalized lessons to K-12 students. The platform includes:

- AI Teacher video calls
- Interactive problem-solving workspaces
- Progress tracking and achievements
- Personalized curriculum

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Git

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mathkong.git
   cd mathkong
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Project Structure

```
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── achievements/  # Achievement-related components
│   │   ├── assessment/    # Assessment-related components
│   │   ├── auth/          # Authentication components
│   │   ├── call/          # AI teacher call components
│   │   ├── curriculum/    # Curriculum components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── lesson/        # Lesson-related components
│   │   ├── practice/      # Practice-related components
│   │   ├── settings/      # Settings components
│   │   ├── student/       # Student-related components
│   │   └── ui/            # Shadcn UI components
│   ├── lib/              # Utility functions
│   ├── pages/            # Page components
│   ├── stories/          # Component stories
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── docs/                 # Documentation
└── scripts/              # Utility scripts
```

## Development Workflow

### Branching Strategy

We follow a feature branch workflow:

1. Create a new branch for each feature or bugfix
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with descriptive messages
   ```bash
   git add .
   git commit -m "Add feature: description of changes"
   ```

3. Push your branch to GitHub
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a Pull Request on GitHub

### Code Style

- We use TypeScript for type safety
- Follow the existing code style and patterns
- Use functional components with hooks for React components
- Use Tailwind CSS for styling

### Testing

Before submitting a PR, ensure:

1. Your code builds without errors
2. All features work as expected
3. The application is responsive on different screen sizes

## Component Guidelines

### Creating New Components

1. Create a new file in the appropriate directory under `src/components/`
2. Use TypeScript interfaces for props
3. Include default prop values
4. Export the component as default if it's the main component in the file

Example:

```tsx
interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ 
  text, 
  onClick = () => {}, 
  variant = 'primary' 
}: ButtonProps) => {
  return (
    <button 
      className={`btn ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
```

### UI Components

We use Shadcn UI components from `src/components/ui/`. Always check if a component already exists before creating a new one.

## Deployment

The application is deployed using GitHub Actions. See `docs/ci-cd-setup.md` for details on the CI/CD pipeline.

## Additional Resources

- [GitHub Integration Guide](./github-integration.md)
- [CI/CD Setup](./ci-cd-setup.md)

## Troubleshooting

### Common Issues

#### Vite Pre-transform Errors

If you encounter errors related to missing chunk files in `node_modules/.vite/deps`, try:

```bash
npm clean-install
npm run dev
```

If the issue persists, check `vite.config.ts` to ensure the problematic chunk files are excluded from optimization.

#### Other Issues

If you encounter any other issues, please create a GitHub issue with detailed information about the problem, including:

- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages
- Screenshots (if applicable)
