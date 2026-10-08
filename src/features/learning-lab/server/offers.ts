import "server-only";
import { z } from "zod";

const optionalText = (max: number) => z.string().trim().min(1).max(max).nullable();
export const offerDetailsSchema = z
  .object({
    timetableIst: optionalText(2000),
    taxDisplay: optionalText(300),
    minCohort: z.number().int().min(1).max(500).nullable(),
    instructor: optionalText(160),
    accessTerms: optionalText(2000),
    supportTerms: optionalText(2000),
    cancellationTerms: optionalText(3000),
    format: optionalText(500),
    learningOutput: optionalText(1000),
  })
  .strict();
