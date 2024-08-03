export function encodeEgogramResult(answers: (number | null)[]): string {
  const strigifiedAnswers = answers.map((a) => a?.toString()) as string[];
  const joinedAnswers = strigifiedAnswers.join("");

  return Buffer.from(joinedAnswers).toString("base64");
}

export function decodeEgogramResult(encoded: string): (number | null)[] {
  const decoded = Buffer.from(encoded, "base64").toString("utf-8");
  return decoded.split("").map((a) => (a === "" ? null : parseInt(a)));
}
