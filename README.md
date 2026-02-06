<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1BZ_tD6K1XDpVfWpIul-dLtT61qeX1cHP

## CI/CD

This repository uses GitHub Actions for Continuous Integration. The workflow is defined in [.github/workflows/ci.yml](.github/workflows/ci.yml).

The CI pipeline runs on every push and pull request to the `main` and `playground` branches. It performs the following checks:
1. **Linting**: Checks for code quality issues using ESLint.
2. **Type Checking**: Ensures TypeScript correctness using `tsc`.
3. **Building**: Verifies that the production build succeeds.

### Scripts
- `npm run lint`: Run ESLint.
- `npm run type-check`: Run TypeScript type check.
- `npm run build`: Run the production build.
