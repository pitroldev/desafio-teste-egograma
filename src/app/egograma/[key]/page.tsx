"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LabelList, Pie, PieChart } from "recharts";
import { MdCopyAll, MdShare } from "react-icons/md";

import { decodeEgogramResult } from "@/utils/result";
import { EGOGRAM_COLORS } from "@/constants/chart";
import {
  EGOGRAM_QUESTIONS,
  EGOGRAM_TYPES_DICT,
} from "@/constants/egogram-questions";

import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EgogramType } from "@/types/egogram";

const chartConfig: ChartConfig = {
  CL: {
    label: EGOGRAM_TYPES_DICT.CL,
    color: EGOGRAM_COLORS.CL,
  },
  CA: {
    label: EGOGRAM_TYPES_DICT.CA,
    color: EGOGRAM_COLORS.CA,
  },
  A: {
    label: EGOGRAM_TYPES_DICT.A,
    color: EGOGRAM_COLORS.A,
  },
  PC: {
    label: EGOGRAM_TYPES_DICT.PC,
    color: EGOGRAM_COLORS.PC,
  },
  PA: {
    label: EGOGRAM_TYPES_DICT.PA,
    color: EGOGRAM_COLORS.PA,
  },
};

export default function EgogramResultsPage() {
  const { key } = useParams<{ key: string }>();

  const decodedAnswers = decodeEgogramResult(key);
  console.log("decodedAnswers", decodedAnswers);

  const mappedAnswers = decodedAnswers.map((score, idx) => {
    const target = EGOGRAM_QUESTIONS[idx]?.target;

    return {
      score,
      target,
    };
  }) as Array<{ score: number; target: EgogramType }>;

  const statisticAnswers = mappedAnswers.reduce<
    Array<{
      score: number;
      target: string;
      fill: string;
    }>
  >((acc, { target, score }) => {
    const targetIndex = acc.findIndex((item) => item.target === target);

    if (targetIndex === -1) {
      const color = EGOGRAM_COLORS[target];
      acc.push({ target, score, fill: color });
      return acc;
    }

    acc[targetIndex].score += score;

    return acc;
  }, []);

  const onShareClick = () => {
    navigator.share({
      title: "Resultados do Teste de Egograma",
      text: "Veja meus resultados do teste de egograma",
      url: window.location.href,
    });
  };

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col gap-6 max-w-2xl text-center items-center">
        <h1 className="text-2xl font-bold">Resultados do Teste de Egograma</h1>

        <div className="w-64 h-64">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="target" hideLabel />}
              />
              <Pie data={statisticAnswers} dataKey="score">
                <LabelList
                  dataKey="target"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>

        <div className="flex items-center gap-4">
          <Button
            className="flex items-center gap-2 w-56"
            onClick={onShareClick}
          >
            <MdShare />
            <span>Compartilhar resultados</span>
          </Button>

          <Button
            className="flex items-center gap-2 w-56"
            onClick={onCopyToClipboard}
          >
            <MdCopyAll />
            <span>Copiar link dos resultados</span>
          </Button>
        </div>

        <Link href="/" className="w-fit">
          <Button className="w-56">Fazer o teste novamente</Button>
        </Link>
      </div>
    </main>
  );
}
