import Lintoxic from "../lintoxic";
import Link from "next/link";
export default function Main() {
  return (
    <main className="w-full flex-col items-center font-mono justify-center p-24 text-left">
      <h1 className="text-9xl font-bold">Lintoxic </h1>
      <p className="text-2xl font-bold pl-3"> Linting Toxicity 🧹</p>
      <Link href="/logs" className="text-xl font-bold pl-3 hover:text-blue-400">
        {" "}
        Check Logs{" "}
      </Link>
      <Lintoxic />
    </main>
  );
}
