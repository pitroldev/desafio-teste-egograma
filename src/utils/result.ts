function xorEncrypt(text: string, key: string): string {
  const textChars = text.split("").map((char) => char.charCodeAt(0));
  const keyChars = key.split("").map((char) => char.charCodeAt(0));
  const encryptedChars = textChars.map(
    (char, i) => char ^ keyChars[i % keyChars.length]
  );
  return encryptedChars.map((char) => String.fromCharCode(char)).join("");
}

function xorDecrypt(text: string, key: string): string {
  const textChars = text.split("").map((char) => char.charCodeAt(0));
  const keyChars = key.split("").map((char) => char.charCodeAt(0));
  const decryptedChars = textChars.map(
    (char, i) => char ^ keyChars[i % keyChars.length]
  );
  return decryptedChars.map((char) => String.fromCharCode(char)).join("");
}

const secretKey = "532-098poi923itjk";

export function encodeEgogramResult(answers: (number | null)[]): string {
  const jsonString = JSON.stringify(answers);

  const encrypted = xorEncrypt(jsonString, secretKey);

  return Buffer.from(encrypted).toString("base64");
}

export function decodeEgogramResult(encoded: string): (number | null)[] {
  try {
    const encrypted = Buffer.from(
      decodeURIComponent(encoded),
      "base64"
    ).toString("utf-8");
    const decrypted = xorDecrypt(encrypted, secretKey);

    const parsedArray = JSON.parse(decrypted);
    if (!Array.isArray(parsedArray)) throw new Error("Invalid array");

    return parsedArray;
  } catch {
    return [];
  }
}
