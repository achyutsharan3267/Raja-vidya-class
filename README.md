# Gita Class Records

React + TypeScript dashboard for recording Bhagavad Gita classes. The interface uses local shadcn/ui primitives and persists records in Supabase.

## Supabase setup

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
   For an existing project created with the earlier schema, also run [`20260914_make_student_count_optional.sql`](./supabase/migrations/20260914_make_student_count_optional.sql).
3. Copy `.env.example` to `.env.local`, then set the project's URL and **anon** key from Project Settings → API.
4. Start the app with `npm run dev`.

The current schema enables anonymous CRUD to support this public dashboard. Before a public production launch, add authentication and change the policies to `authenticated` users.

## Scripts

- `npm run dev` — local development server
- `npm run build` — type-check and production build
- `npm run lint` — run linting

## Original Vite notes

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
# Raja-vidya-class
