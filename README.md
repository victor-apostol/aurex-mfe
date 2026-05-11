# Aurex MFE

Aurex MFE is a React + Rspack + Module Federation demo with a host application and a products microfrontend.

The host owns authentication, top-level routing, layout, and runtime remote loading.  
The products MFE owns its internal `/products/*` routes and product UI.

## Tech Stack

- React 18 + TypeScript strict mode
- Rspack + `@module-federation/enhanced`
- React Router v6
- TanStack Query
- Tailwind CSS
- ESLint + Prettier
- pnpm workspace
<!-- - Playwright for E2E tests -->

## Project Structure

```txt
.
├── apps
│   ├── host
│   └── products
├── packages
│   └── auth
├── e2e
├── .github
│   └── workflows
└── package.json
```

### `apps/host`

The host application is responsible for:

- top-level routing;
- login/logout flow;
- authenticated layout;
- runtime registration/loading of remotes;
- global and remote-level error boundaries;
- deciding when the products MFE is allowed to load.

### `apps/products`

The products MFE is responsible for:

- product routes under `/products/*`;
- product pages;
- product data fetching/mocking;
- its own TanStack Query provider;
- its own styles.

### `packages/auth`

Shared auth package used by host and remotes.

It exposes:

- `AuthProvider`;
- `useAuth`;
- shared auth types.

The actual auth state and login/logout implementation live in the host.

## Local Development

## Environment Variables

The host app uses environment variables for runtime remote configuration.

Create a local development env file from the example:

```bash
cp apps/host/.env.example apps/host/.env.development
```

## Running Locally

Install dependencies:

```bash
pnpm install
```

Run both host and products MFE:

```bash
pnpm dev
```

Or run them separately:

```bash
pnpm dev:products
pnpm dev:host
```

Local URLs:

```txt
Host:     http://localhost:3000
Products: http://localhost:3001
```

Open the host:

```txt
http://localhost:3000
```

## Available Scripts

```bash
pnpm dev
```

Runs host and products in development mode.

```bash
pnpm build
```

Builds products first, then host.

```bash
pnpm lint
```

Runs ESLint for apps.

```bash
pnpm typecheck
```

Runs TypeScript checks.

```bash
pnpm format:check
```

Checks formatting with Prettier.

```bash
pnpm test:e2e
```

Runs Playwright E2E tests.

```bash
pnpm run ci
```

Runs the local CI validation command.

## Architecture

### Module Federation

The products MFE exposes its app through Module Federation:

```ts
exposes: {
  './App': './src/App',
}
```

The host loads the products MFE at runtime using `@module-federation/enhanced/runtime`.

The host does not statically import the products remote. Instead, it registers and loads the remote only when the user is authenticated.

This avoids fetching the products remote before authentication.

### Runtime Remote Loading

Remote configuration is centralized in the host federation layer.

The host uses:

- `registerRemotes()` to register runtime remotes;
- `loadRemote()` to load exposed modules;
- a remote registry to avoid registering the same remote multiple times.

The products remote is loaded from:

```txt
Development: http://localhost:3001/mf-manifest.json
Production:  configured through deployment environment variables
```

### Shared Dependencies

The following packages are shared as singletons:

- `react`;
- `react-dom`;
- `react-router-dom`;
- `@aurex/auth`.

React, ReactDOM, and React Router use versions from `package.json`.

The internal workspace package `@aurex/auth` is shared as a singleton to make sure the host and remotes use the same auth context instance.

### Routing

The host owns top-level routes:

```txt
/
 /login
 /products/*
```

The products MFE owns nested product routes under `/products/*`.

Example:

```txt
/products        -> products list
/products/:id    -> product details page
```

The host provides `BrowserRouter`.  
The products MFE does not create another router when consumed by the host.

For standalone development, the products bootstrap file wraps the products app with `BrowserRouter`.

### Authentication

Authentication is implemented at the host level.

The authenticated layout protects private routes and redirects unauthenticated users to `/login`.

The host also controls when protected remotes are allowed to load.

Flow:

```txt
Unauthenticated user opens /products
→ host redirects to /login
→ products remote is not loaded

User logs in
→ host navigates to /products
→ given the user is authed, it passes the auth guard check at layout level and renders products remote triggering it's register and loading
→ host registers products remote
→ host loads products MFE
```

## CI/CD

CI is configured with GitHub Actions.

The CI pipeline runs on pull requests in main branch and performs:

- dependency installation;
- ESLint;
- TypeScript checks;
- build of both applications.
<!-- - Playwright E2E tests; -->

Deployment is intended to be separated per deployable app:

```txt
apps/host      -> host deployment
apps/products  -> products MFE deployment
packages/auth  -> not deployed directly
```

`packages/auth` is bundled into the apps that use it.

For S3/CloudFront deployment, host and products can be deployed as separate static builds.

The host should receive the products remote manifest URL during build/deployment:

```txt
PRODUCTS_REMOTE_ENTRY=https://<products-cloudfront-domain>/mf-manifest.json
```

## Decisions and Trade-offs

### Runtime remote loading instead of static remotes

The products MFE is loaded at runtime because protected remotes should not be fetched before authentication.

Static remote configuration is simpler, but it can cause the remote manifest or `remoteEntry.js` to be loaded earlier than desired.

### Host owns authentication

The host owns auth state and route protection because it controls top-level navigation and decides which remotes can load.

The shared `@aurex/auth` package only provides the context contract and hook.

### Separate app builds

Host and products are built separately because they are separate deployable artifacts.

Products must be built before host in local build scripts because the host expects the products remote to be available when testing the integrated setup.

### S3/CloudFront deployment

For production-like deployment, each built app can be uploaded to S3 and served through CloudFront.

The host SPA has fallback routing to `index.html`.

Remote assets are served from a stable URL such as:

```txt
/${remote_domain}/products/mf-manifest.json
```

To bypass the /host/index.html redirect when client tries to access mf-manifest.json i implemented second cloudfront distribution for /products
