
# MyVoice AAC

An augmentative and alternative communication (AAC) web application that helps users communicate through cards and text-to-speech technology.

## Project Setup

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Project Structure

`src/` - Contains the source code for the application.
`public/` - Contains static assets used by the application, such as images.
`index.html` - The main HTML file, or the entry point for the application.
`tsconfig.*.json` - TypeScript configuration file(s).
`vite.config.ts` - Vite configuration file.
`tailwind.config.ts, postcss.config.js` - Tailwind CSS configuration files.
`package.json, package-lock.json` - Contains project metadata and dependencies.
`eslint.*.js` - ESLint configuration files.

Within the `src/` directory, some key files and directories include:
`components/` - Contains reusable React components.
`data/` - Contains data files used by the application.
`lib/` - Contains utility functions and libraries.
`pages/` - Contains the endpoints of the application.
`services/` - Contains service files that connect the application to HuggingFace API, TensorFlow library, etc.
`App.tsx` - The main React component that the entry point loads first.
``
