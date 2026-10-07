import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const askVenuRateLimit = new Ratelimit({
  redis,

  limiter: Ratelimit.slidingWindow(10, "60 s"),

  analytics: true,

  prefix: "venu-os:ask",
});
