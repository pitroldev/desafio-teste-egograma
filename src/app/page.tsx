import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col gap-6 max-w-2xl text-center items-center">
        <h1 className="text-4xl font-bold">Teste de Egograma</h1>
        <p className="text-lg">
          O teste de egograma é uma ferramenta de autoconhecimento que permite
          identificar padrões de comportamento e personalidade.
        </p>
        <Link href="/egograma" className="w-fit">
          <Button className="w-56">Começar o teste</Button>
        </Link>
      </div>
    </main>
  );
}
