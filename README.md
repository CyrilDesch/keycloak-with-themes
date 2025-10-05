# Keycloak Custom Themes

A professional Keycloak customization project using [Keycloakify](https://keycloakify.dev) to create custom authentication themes. This project supports multiple independent themes, each with their own React/TypeScript implementation.

## 🏗️ Project Structure

```
keycloak/
├── Dockerfile                           # Multi-stage Docker build for Keycloak with custom themes
├── keycloakify-theme-napnotes/         # Example theme (React/TypeScript)
│   ├── src/
│   │   ├── login/                      # Login theme pages and components
│   │   ├── kc.gen.tsx                  # Generated Keycloakify types
│   │   └── main.tsx                    # Entry point
│   ├── package.json                    # Theme dependencies and scripts
│   ├── tsconfig.json                   # TypeScript configuration
│   └── eslint.config.js                # ESLint configuration
└── README.md                           # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Docker** (for containerized deployment)
- **Maven** >= 3.1.1 (for theme building)

### Development Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd keycloak
   ```

2. **Set up a theme**

   ```bash
   cd keycloakify-theme-napnotes
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Test with Storybook**
   ```bash
   npm run storybook
   ```

## 🎨 Theme Development

### Available Scripts

Each theme includes these npm scripts:

- `npm run dev` - Start development server with hot reload
- `npm run build` - TypeScript compilation + Vite build
- `npm run build-keycloak-theme` - Full Keycloak theme build
- `npm run storybook` - Launch Storybook for component testing
- `npm run format` - Format code with Prettier

### Code Quality

This project enforces strict code quality standards:

- **TypeScript** strict mode enabled
- **ESLint** with React, TypeScript, and React Hooks rules
- **Prettier** for consistent formatting
- **Zero warnings/errors** policy

Before committing changes, ensure:

```bash
cd keycloakify-theme-*/
npx tsc --noEmit
npx eslint . --max-warnings 0
```

### Theme Structure

Each theme follows this structure:

```
keycloakify-theme-*/
├── src/
│   ├── login/              # Login theme implementation
│   │   ├── pages/          # Individual page components
│   │   ├── KcContext.ts    # Keycloak context types
│   │   ├── KcPage.tsx      # Main page router
│   │   ├── KcPageStory.tsx # Storybook stories
│   │   ├── i18n.ts         # Internationalization
│   │   └── main.css        # Theme styles
│   ├── kc.gen.tsx          # Generated Keycloakify code
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript config
├── eslint.config.js        # ESLint config
└── vite.config.ts          # Vite config
```

## 🐳 Docker Deployment

### Building the Docker Image

The project includes a multi-stage Dockerfile that:

1. **Builds the theme** using Node.js
2. **Integrates with Keycloak** using Maven
3. **Creates a production image** with custom theme

### Running with Docker

```bash
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  keycloak-custom \
  start-dev
```

Access Keycloak at: http://localhost:8080

## 🎯 Adding New Themes

To add a new theme:

1. **Create theme directory**

   ```bash
   mkdir keycloakify-theme-<name>
   cd keycloakify-theme-<name>
   ```

2. **Initialize with Keycloakify**

   ```bash
   npx create-keycloakify@latest .
   ```

3. **Follow the same structure** as existing themes
4. **Update Dockerfile** to include the new theme in the build process

## 📚 Keycloakify Documentation

- [Official Documentation](https://docs.keycloakify.dev)
- [Testing Your Theme](https://docs.keycloakify.dev/testing-your-theme)
- [Customization Strategies](https://docs.keycloakify.dev/customization-strategies)
- [GitHub Repository](https://github.com/keycloakify/keycloakify)

## 🛠️ Development Tools

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Storybook** for component development
- **ESLint** + **Prettier** for code quality
- **Keycloakify v11** for theme generation
