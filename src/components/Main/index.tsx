import Lintoxic from "../lintoxic";
export default function Main() {
  return (
    <main className="w-full flex-col items-center font-mono justify-center p-24 text-left">
      <h1 className="text-9xl font-bold">Lintoxic </h1>
      <p className="text-2xl font-bold pl-3"> Linting Toxicity 🧹</p>
      <Lintoxic />
    </main>
  );
}
