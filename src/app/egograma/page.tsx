"use client";
import React, { useState } from "react";
import Link from "next/link";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

import { QUESTION_OPTIONS } from "@/constants/question-options";
import { EGOGRAM_QUESTIONS } from "@/constants/egogram-questions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { encodeEgogramResult } from "@/utils/result";

export default function EgogramTestPage() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    EGOGRAM_QUESTIONS.map(() => null)
  );

  const question = EGOGRAM_QUESTIONS[questionIndex];

  const questionNumber = questionIndex + 1;
  const totalQuestions = EGOGRAM_QUESTIONS.length;

  const handleAnswer = (value: number) => {
    setAnswers((c) => {
      const newAnswers = [...c];
      newAnswers[questionIndex] = value;
      return newAnswers;
    });
  };

  const handleNextQuestion = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((c) => c + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex((c) => c - 1);
    }
  };

  const isAtLastQuestion = questionIndex === totalQuestions - 1;

  const resultsKey = encodeEgogramResult(answers);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="flex flex-col gap-6 w-full items-center">
        <Card className="max-w-xl w-full min-h-72 gap-4 flex flex-col p-8">
          <CardTitle>
            Pergunta {questionNumber} de {totalQuestions}
          </CardTitle>
          <CardContent className="p-0">{question.title}</CardContent>
          {QUESTION_OPTIONS.map((option) => (
            <Button
              key={option.value}
              variant={
                answers[questionIndex] === option.value ? "default" : "outline"
              }
              className="w-full items-center justify-start"
              onClick={() => handleAnswer(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </Card>

        <div className="flex items-center gap-4 justify-between max-w-xl w-full">
          <Button
            className="flex gap-1 items-center"
            variant={"outline"}
            disabled={questionIndex === 0}
            onClick={handlePreviousQuestion}
          >
            <MdArrowBack />
            Voltar à pergunta anterior
          </Button>
          {!isAtLastQuestion && (
            <Button
              className="flex gap-1 items-center"
              disabled={answers[questionIndex] === null}
              onClick={handleNextQuestion}
            >
              <span>Próxima pergunta</span>
              <MdArrowForward />
            </Button>
          )}
          {isAtLastQuestion && (
            <Link href={`/egograma/${resultsKey}`}>
              <Button className="flex gap-1 items-center">
                Finalizar teste <MdArrowForward />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
