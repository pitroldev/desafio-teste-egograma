export function encodeEgogramResult(answers: (number | null)[]): string {
  const jsonString = JSON.stringify(answers);

  return encodeURI(Buffer.from(jsonString).toString("base64"));
}

export function decodeEgogramResult(encoded: string): (number | null)[] {
  try {
    const jsonString = Buffer.from(encoded, "base64").toString("utf-8");

    const parsedArray = JSON.parse(jsonString);
    if (!Array.isArray(parsedArray)) throw new Error("Invalid array");

    return parsedArray;
  } catch {
    return [];
  }
}
