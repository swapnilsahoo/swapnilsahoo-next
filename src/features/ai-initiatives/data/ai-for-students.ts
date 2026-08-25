export interface StudentAiModule {
  id: string;
  title: string;
  doThis: string;
  notThis: string;
}

/**
 * Practical AI guidance aimed at students, not faculty — how to use
 * AI well across the things a PGDM/MBA student actually does: case
 * prep, placement prep, assignments and research, and building.
 */
export const studentAiModules: readonly StudentAiModule[] = [
  {
    id: "case-prep",
    title: "Case prep and class participation",
    doThis:
      "Use an assistant to get a fast first-pass framework or find a comparable case before class — it compresses the warm-up, not the thinking. Then interrogate what it gave you: what's assumed versus shown, what breaks the framework, what the case's actual numbers say that a generic template wouldn't know.",
    notThis:
      "Walking into class with an AI-generated answer you haven't pressure-tested yourself. In a cold call, you defend your reasoning out loud — an assistant can't do that part for you, and it shows immediately when someone hasn't done the interrogation.",
  },
  {
    id: "placement-prep",
    title: "Placement prep, honestly",
    doThis:
      "Use AI to mock a guesstimate or case interview, draft a first pass at CV bullet points, or rehearse an answer out loud against a simulated interviewer. It's a genuinely good practice partner precisely because it's tireless and available at 2 a.m. before a deadline.",
    notThis:
      "Treating a rehearsed AI answer as the actual interview. A recruiter is testing your live reasoning under pressure, not your ability to recite something an assistant helped you prepare. See the full placement guidance for the rest of the process — this is only the AI-specific piece of it.",
  },
  {
    id: "research-assignments",
    title: "Research and assignments, without losing the point",
    doThis:
      "Use AI to summarise a long reading fast, organise scattered notes, or restructure a messy first draft. That's real time saved on the parts of writing that were never the actual assignment.",
    notThis:
      "Letting AI write the actual argument, or submitting a fact, statistic or citation you haven't personally verified. Know your programme's disclosure policy and follow it — an unverified AI citation in a submitted assignment is a preventable, embarrassing failure mode, not a shortcut.",
  },
  {
    id: "build",
    title: "Build something, don't just consume",
    doThis:
      "The fastest way to actually understand what these tools can and can't do is to try building something with them — a small prototype, not a polished product. That's the entire premise of the AI Mini Hackathon.",
    notThis:
      "Staying purely on the consumption side — using AI only to answer questions faster — without ever testing what happens when you try to make it do something new. The gap between using a tool and building with one is where the real learning is.",
  },
] as const;

export const studentGoldenRule = {
  title: "AI accelerates the draft. The judgment stays yours.",
  description:
    "Every module above returns to the same line. An assistant can compress the time between a blank page and a first attempt at almost anything — a framework, a CV bullet, a summary, a prototype. What it cannot do is stand in for the judgment call a case, an interview or an assignment is actually testing. That's still entirely yours, every time.",
} as const;

export const studentResponsiblePrinciples: readonly string[] = [
  "Disclosure: know your programme's actual policy on AI use in assignments and exams, and follow it — 'everyone does it' is not a defence.",
  "Verification: never submit a fact, number or citation an assistant gave you that you haven't personally checked against the source.",
  "Ownership: if you're asked to defend it, you need to be able to explain the reasoning — not the prompt that produced it.",
] as const;
