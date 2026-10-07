# Contributing Guidelines

Thank you for your interest in contributing to **Portfolio Website**! We welcome and appreciate contributions from the community.

Please take a moment to review this document to ensure a smooth collaboration process.

---

## 📜 Code of Conduct

This project is governed by our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold its standards. Please report unacceptable behavior to **[pushpakmjaiswal@gmail.com](mailto:pushpakmjaiswal@gmail.com)**.

---

## 🛠️ How Can I Contribute?

### 1. Reporting Bugs

Before creating a bug report, please check existing [Issues](https://github.com/PUSHPAK-JAISWAL/portfolio-website/issues) to see if the issue has already been reported.

If you find a new bug, please open an issue using the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:
- A clear, descriptive title.
- Steps to reproduce the bug.
- Expected behavior vs. actual behavior.
- Screenshots or console logs if applicable.
- Your environment (browser, OS, screen resolution).

### 2. Suggesting Enhancements

Feature suggestions are welcome! To suggest an enhancement:
- Check existing [Issues](https://github.com/PUSHPAK-JAISWAL/portfolio-website/issues) to avoid duplicates.
- Open an issue using the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md).
- Clearly explain the motivation and proposed implementation.

### 3. Submitting Pull Requests

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/<your-username>/portfolio-website.git
   cd portfolio-website
   ```
3. **Create a new branch** with a descriptive name:
   ```bash
   git checkout -b feature/amazing-feature
   # or
   git checkout -b fix/issue-description
   ```
4. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```
5. **Make your changes** and test thoroughly:
   ```bash
   npm run dev      # Test locally in development mode
   npm run build    # Verify production build succeeds
   ```
6. **Commit your changes** using Conventional Commits:
   ```bash
   git commit -m "feat(hero): add new interactive terminal command"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request** against the `main` branch of the upstream repository using our [Pull Request Template](.github/pull_request_template.md).

---

## 📐 Coding Standards & Guidelines

- **TypeScript**: Strict type safety. Avoid using `any` whenever possible.
- **Styling**: Use Tailwind CSS utility classes and adhere to the project's Gruvbox color scheme.
- **Icons**: General UI icons are imported from `lucide-react`. Brand icons (e.g., GitHub, LinkedIn) are imported from `react-icons/fa6` to ensure compatibility with modern Lucide versions.
- **Accessibility**: Ensure new UI elements have appropriate `aria-*` attributes, semantic tags, and keyboard focus states.

---

## 💬 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation-only changes
- `style:` Changes that do not affect code logic (formatting, spacing)
- `refactor:` Code changes that neither fix a bug nor add a feature
- `perf:` Performance improvements
- `chore:` Build process, tooling, or dependency updates

---

## 📬 Contact & Questions

If you have any questions or need guidance, feel free to reach out:
- **Maintainer**: Pushpak Jaiswal
- **GitHub**: [@PUSHPAK-JAISWAL](https://github.com/PUSHPAK-JAISWAL)
- **Email**: [pushpakmjaiswal@gmail.com](mailto:pushpakmjaiswal@gmail.com)

