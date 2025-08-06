import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv"

dotenv.config();
//ratelimiter for 10requets per 20 seconds
const ratelimit=new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"30 s")
})

export default ratelimit; 

