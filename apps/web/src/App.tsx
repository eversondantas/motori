import type { Id } from '@motori/shared-types';

export default function App() {
  const exampleId: Id = '1';
  return (
    <main className="app">
      <h1>Motori</h1>
      <p>Web app inicial (Vite + React + TypeScript).</p>
      <p>Shared type example: {exampleId}</p>
    </main>
  );
}
