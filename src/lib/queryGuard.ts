export type QueryGuardResult = {
  allowed: boolean;
  reason?: string;
};

const MAX_QUERY_LENGTH = 500;

const injectionPatterns: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?)/i,
  /disregard\s+(all\s+)?(previous|prior|above)\s+(instructions?|prompts?)/i,
  /forget\s+(all\s+)?(previous|prior)\s+(instructions?|prompts?)/i,

  /reveal\s+(your\s+)?(system\s+prompt|instructions?|hidden\s+prompt)/i,
  /show\s+(me\s+)?(your\s+)?(system\s+prompt|hidden\s+instructions?)/i,
  /print\s+(your\s+)?(system\s+prompt|instructions?)/i,

  /developer\s+(message|instructions?)/i,
  /system\s+(message|instructions?)/i,

  /act\s+as\s+(if\s+)?you\s+(have\s+)?no\s+(rules|restrictions|instructions)/i,
  /override\s+(your\s+)?(rules|instructions|prompt)/i,

  /jailbreak/i,
  /prompt\s+injection/i,

  /reveal\s+(environment|env)\s+variables?/i,
  /show\s+(environment|env)\s+variables?/i,

  /HF_TOKEN/i,
  /process\.env/i,
];

export function guardQuery(rawQuery: string): QueryGuardResult {
  const query = rawQuery.trim();

  if (!query) {
    return {
      allowed: false,
      reason: "empty-query",
    };
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return {
      allowed: false,
      reason: "query-too-long",
    };
  }

  const containsInjectionPattern = injectionPatterns.some((pattern) =>
    pattern.test(query)
  );

  if (containsInjectionPattern) {
    return {
      allowed: false,
      reason: "prompt-injection",
    };
  }

  return {
    allowed: true,
  };
}
