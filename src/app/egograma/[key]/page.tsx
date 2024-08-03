"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LabelList, Pie, PieChart } from "recharts";
import { MdCopyAll, MdShare } from "react-icons/md";

import { decodeEgogramResult } from "@/utils/result";
import { EGOGRAM_COLORS } from "@/constants/chart";
import {
  EGOGRAM_OPTIONS,
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
import { Card, CardContent, CardTitle } from "@/components/ui/card";

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

  const mappedAnswers = decodedAnswers.map((score, idx) => {
    const target = EGOGRAM_QUESTIONS[idx]?.target;

    return {
      score,
      target,
    };
  }) as Array<{ score: number; target: EgogramType }>;

  const statisticAnswers = mappedAnswers.reduce<
    Array<{
      name: string;
      target: EgogramType;
      score: number;
      fill: string;
    }>
  >((acc, { target, score }) => {
    const name = EGOGRAM_TYPES_DICT[target];
    const targetIndex = acc.findIndex((item) => item.target === target);

    if (targetIndex === -1) {
      acc.push({
        name,
        target,
        score,
        fill: EGOGRAM_COLORS[target],
      });
      return acc;
    }

    acc[targetIndex].score += score;

    return acc;
  }, []);

  const sumScores = statisticAnswers.reduce(
    (acc, item) => acc + (item.score || 0),
    0
  );

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

        <section className="w-64 h-64">
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
        </section>

        <section className="flex flex-col gap-4">
          {EGOGRAM_OPTIONS.map((option) => {
            const result = statisticAnswers.find(
              (item) => item.name === option.label
            );

            const score = result?.score || 0;
            const percentage = (score / sumScores) * 100;

            return (
              <Card
                key={option.value}
                className="flex flex-col justify-start text-left p-4"
              >
                <CardTitle
                  className="text-lg font-bold"
                  style={{
                    color: EGOGRAM_COLORS[option.value],
                  }}
                >
                  {option.label} <span>({option.value})</span>
                </CardTitle>
                <h3 className="text-sm font-semibold text-gray-500">
                  Você marcou {score} pontos ({percentage.toFixed(2)}%)
                </h3>
                <CardContent className="p-0 pt-2">
                  {option.description}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <div className="flex items-center gap-4 pt-6">
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
