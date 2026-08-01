export type ComicsStoryChapter = {
  level: string;
  stage: string;
  title: string;
  concept: string;
  paragraphs: readonly string[];
  reflection: string;
};

export type ComicsStoryCycle = {
  title: string;
  subtitle: string;
  premise: string;
  chapters: readonly ComicsStoryChapter[];
  highestOrder: {
    title: string;
    body: string;
    question: string;
  };
};

export const spiderManStory = {
  title: "The Block That Wouldn’t Go Dark",
  subtitle:
    "A neighbourhood emergency becomes a journey from immediate rescue to responsibility that protects other people’s agency.",
  premise:
    "During a punishing Queens heatwave, Spider-Man reaches a failing community cooling centre. One room can still keep medicine cold and breathing equipment charged—but the outage is not an accident, and restoring power to one building may deepen the danger elsewhere.",
  chapters: [
    {
      level: "01",
      stage: "The basic human need",
      title: "Keep one room alive",
      concept: "Attention",
      paragraphs: [
        "The first transformer fails shortly after sunset, when the heat trapped between the buildings has nowhere left to go. A neighbourhood pharmacy and cooling centre occupy the ground floor of an ageing apartment block. Its emergency batteries are already fading. Refrigerated medicine is warming, two breathing machines need power, and a rain-damaged ceiling begins to sag above families who believed this was the safest room on the street.",
        "Spider-Man arrives prepared for spectacle and finds work that is almost painfully ordinary. He braces the ceiling, carries people down a narrow stairwell and follows the instructions of Nia, an apprentice electrician who knows which cables are still live. Mira, the pharmacist, marks every medicine pack with the minute it left refrigeration. No grand theory fits inside the room. There is only the next ten minutes and the work required to keep everyone alive.",
      ],
      reflection:
        "Responsibility begins before action. It begins with attention: seeing the actual need instead of the dramatic version we expected to find.",
    },
    {
      level: "02",
      stage: "The first ethical choice",
      title: "People before pursuit",
      concept: "Priority",
      paragraphs: [
        "As Nia isolates the damaged circuit, Spider-Man sees a masked courier leave the transformer enclosure with a stolen grid controller. Catching the courier could explain the failure and prevent another one. Staying means the evidence may disappear. At that same moment, Mira discovers that one patient cannot be moved until a portable ventilator is fully charged. The choice is not between good and evil. It is between two legitimate responsibilities that cannot both receive his full attention.",
        "He stays. The courier escapes across the rooftops while Spider-Man holds a temporary cable above the flooded floor and Nia makes the connection. The ventilator reaches full charge. The medicine is transferred. Everyone reaches safety. Yet three blocks away another transformer fails, and the stolen controller vanishes into the city. A sound choice has produced a painful cost. That matters because moral maturity begins when we stop treating a good intention as proof that every consequence will also be good.",
      ],
      reflection:
        "A responsible choice does not remove regret. It gives us a reason for the cost we accepted and a duty to face what follows.",
    },
    {
      level: "03",
      stage: "The consequence",
      title: "When rescue hides the pattern",
      concept: "Second-order effects",
      paragraphs: [
        "By morning, city officials describe the outage as an isolated equipment failure. Spider-Man’s rescue becomes evidence that emergency response worked. Voss, an infrastructure consultant, offers landlords a private-power contract priced far beyond what most tenants can sustain. Buildings that reject the contract experience fresh outages, surprise safety citations and anonymous purchase offers. The night’s visible success is being used to conceal a repeating structure of pressure.",
        "Nia brings Spider-Man repair logs copied long before the crisis. Mira adds a record of medicine lost during earlier blackouts. Together, the documents show that the most neglected buildings are also the ones being pushed towards distressed sale. Spider-Man can lift a transformer and still leave the machinery of exploitation untouched. Repeated heroic repairs can even help everyone pretend that the machinery is tolerable. By noon, the lights are on and the residents are no safer from the next deliberate failure.",
      ],
      reflection:
        "The first-order question is whether an action helps now. The second-order question is what pattern that action may quietly allow to continue.",
    },
    {
      level: "04",
      stage: "The system beneath the event",
      title: "Follow the incentives",
      concept: "Systems thinking",
      paragraphs: [
        "The stolen controller leads toward Voss, but not toward a simple criminal switch. His company has learned to exploit a grid already weakened by deferred maintenance. Predictive software sends scarce repair crews toward districts with dense sensors, high property values and residents who report faults through approved apps. Buildings with fewer sensors appear less urgent because their suffering produces less data. Insurers then raise premiums, safety enforcement accelerates, and buyers acquire the resulting distress at a discount.",
        "Voss has manipulated the process and paid contractors to deepen selected failures, but arresting him would not repair the incentives that made his strategy profitable. Another consultant could inherit the same opportunity. The clarity of an immediate threat gives way to a network of contracts, measurements and institutional blind spots.",
        "The villain is real; the vulnerability is larger than the villain. Understanding the whole web means asking who defines risk, whose knowledge counts and who bears the cost when an optimisation system is declared neutral.",
      ],
      reflection:
        "Systems thinking does not excuse individual wrongdoing. It prevents one arrest from being mistaken for a complete remedy.",
    },
    {
      level: "05",
      stage: "The shared response",
      title: "The neighbourhood becomes the protagonist",
      concept: "Collective agency",
      paragraphs: [
        "Spider-Man’s first impulse is to collect the files and expose everything at once. Nia stops that plan. Several contract workers are ready to testify, but a premature release could reveal their identities. A rushed shutdown of Voss’s network could also cut power to residents who now depend on its temporary generators. The neighbourhood does not need another person—even a well-intentioned hero—to choose the timing of its risk without consent.",
        "Tenants map every outage. Union electricians verify the physical faults. Mira creates a medical-priority register that protects privacy while showing where power cannot be interrupted. Workers pressured into sabotage receive legal protection as witnesses. Spider-Man carries equipment, guards meetings and retrieves records from unsafe locations, but he does not write the demands or appoint himself their voice. The web is no longer a metaphor for one hero’s reach. It becomes a practical network in which different kinds of knowledge can hold one another up.",
      ],
      reflection:
        "Helping becomes more durable when the people who live with a problem retain authorship of the response.",
    },
    {
      level: "06",
      stage: "The highest-order principle",
      title: "Stand beside the remedy",
      concept: "Restorative responsibility",
      paragraphs: [
        "The residents choose a coordinated disclosure during a public safety hearing, after emergency repairs and anti-eviction protections are in place. Voss attempts to destroy the remaining records, giving Spider-Man one final physical task. He preserves the evidence, but Nia, Mira, the tenants and the protected workers present the case. Over the following months, their testimony and records lead to a settlement that voids coercive contracts, directs recovered funds into the grid and gives residents a formal role in maintenance oversight. Workers who acted under threat receive a path to repair the damage they helped cause.",
        "The settlement does not renew old wiring overnight. Public budgets remain contested, and trust does not return in a single season. What changes is the distribution of agency. Spider-Man has not saved a passive neighbourhood; he has helped protect a community while it built the power to defend itself. His decision to keep one room alive has expanded into a more demanding responsibility: to make justice possible without taking ownership of justice away from the people most affected.",
      ],
      reflection:
        "The highest form of responsibility is not control. It is accountable action that enlarges another person’s freedom to shape the remedy.",
    },
  ],
  highestOrder: {
    title: "Responsibility that does not take over",
    body: "Mature responsibility combines courage with humility. It intervenes when harm is urgent, traces the consequences of intervention, understands the system beneath the emergency and protects the right of affected people to lead what comes next.",
    question:
      "When we have the ability to help, how do we support a solution without making ourselves the centre of it?",
  },
} satisfies ComicsStoryCycle;

export const supermanStory = {
  title: "The Weight of the Bridge",
  subtitle:
    "A spectacular rescue reveals how exceptional power can unintentionally excuse ordinary institutions from doing their work.",
  premise:
    "A bridge joint tears during the morning commute, leaving a city bus above the river. Superman can hold the structure—but the deeper failure lives in hidden inspection records, a distorted risk model and a city that has begun to budget around the assumption that he will always arrive.",
  chapters: [
    {
      level: "01",
      stage: "The basic human need",
      title: "Bring everyone home",
      concept: "Protection",
      paragraphs: [
        "The fracture begins as a sound beneath the morning traffic, too low for most passengers to recognise. A bridge joint gives way, the outer lane drops, and a city bus settles against a guardrail that was never designed to carry its weight. Superman reaches the span before the bus falls. He can support the steel, but he cannot safely move the vehicle while passengers are crowded against one side.",
        "Priya, a structural engineer already on the bridge, identifies a service path and the bus’s reinforced anchor points. Tomas, the driver, keeps the passengers moving in order. Rin, a student who maps accessibility barriers and uses a wheelchair, refuses an unsafe lift, explains the chair’s securement needs and directs their own transfer. Superman’s strength holds the immediate danger still; the people inside the bus decide how that strength can help without causing fresh harm.",
      ],
      reflection:
        "At the most basic level, power protects life. Even here, effective protection depends on listening to knowledge outside oneself.",
    },
    {
      level: "02",
      stage: "The first ethical choice",
      title: "Leave the fracture visible",
      concept: "Restraint",
      paragraphs: [
        "Once the bus is empty, the emergency director asks Superman to fuse the broken joint and reopen two lanes before evening. The request is understandable: the closure is separating workers from jobs and cutting several neighbourhoods off from their most direct hospital route. Priya warns that compressing and heating the fracture would erase evidence of how it began. Rin adds that any closure plan without accessible replacement transport would simply move the danger from the bridge to the people stranded by it.",
        "Superman builds a reversible cradle around the joint instead of sealing it. The bridge remains closed while engineers study the exposed break and the city establishes accessible detours. The decision is publicly unpopular, and the extra day of disruption has real costs. During that night, the digital inspection archive is remotely erased. Restraint has preserved the physical evidence, but it has also given whoever hid the warnings more time to cover the institutional trail.",
      ],
      reflection:
        "Restraint is not passive. It accepts a visible short-term cost to preserve truth, learning and safer choices later.",
    },
    {
      level: "03",
      stage: "The consequence",
      title: "When the hero becomes a budget line",
      concept: "Dependency",
      paragraphs: [
        "After investigators document the exposed fracture, Superman makes a temporary repair so emergency vehicles can cross. He expects the bridge to remain closed for a full inspection. Instead, officials reopen most lanes. Maintenance funds are redirected to projects with faster political returns. Internal messages reveal the unspoken calculation: if the structure fails again, Superman will catch it. His reliability has been converted into a substitute for public responsibility.",
        "The budget calculation unsettles him more than the missing archive. Every rescue has been sincere, yet a sequence of rescues can teach an institution that prevention is optional. Citizens become safer during the moment of collapse and less safe in the years between collapses. Superman could announce that he will no longer intervene, but making vulnerable commuters carry that lesson would be another form of coercion. He must remain available without allowing availability to become an excuse for neglect.",
      ],
      reflection:
        "Power can solve a crisis so effectively that the people responsible for preventing the next crisis feel less pressure to change.",
    },
    {
      level: "04",
      stage: "The system beneath the event",
      title: "A bridge is also a model",
      concept: "Legitimacy",
      paragraphs: [
        "Priya and Rin reconstruct the bridge’s failure history from field notes, copies kept by maintenance crews, accessibility reports and sensor records that the official system ignored. Rook, designer of the city’s risk model, has ranked repairs by traffic volume, commercial value and the estimated cost of closure. Routes serving lower-income neighbourhoods and disabled passengers receive less weight because the model treats time lost in those communities as less economically significant.",
        "Rook has concealed warnings, but the deeper problem is not a malicious equation. Elected officials approved the priorities and then allowed technical language to hide the values inside them. The model turns a political decision—whose safety matters first—into something that appears inevitable. Superman can retrieve data from an unreachable sensor, but he cannot legitimately decide the city’s priorities alone. Who may distribute risk across other people’s lives, and what gives that decision public legitimacy?",
      ],
      reflection:
        "A decision can be technically sophisticated and still lack legitimacy when those who bear its risks cannot inspect or challenge its values.",
    },
    {
      level: "05",
      stage: "The shared response",
      title: "Let shared knowledge set the direction",
      concept: "Distributed knowledge",
      paragraphs: [
        "Drivers, disabled commuters, maintenance crews, students and engineers build an independent map of structural risk. They rank repairs using safety, accessibility and the consequences of isolation—not property value alone. Public meetings are slower than a unilateral order, and disagreement remains visible. People previously reduced to data points are now participants in the decision.",
        "Superman retrieves damaged sensors, lifts temporary supports and carries replacement sections under the direction of the crews who will maintain them. He refuses invitations to announce which bridge should come next. His role is substantial but bounded: he makes truthful information available, protects the process from intimidation and lends strength where the publicly accountable plan requires it. The city’s knowledge becomes wider than any one expert, algorithm or hero could hold.",
      ],
      reflection:
        "Shared agency does not diminish expertise. It connects expertise to lived knowledge and makes authority answerable to both.",
    },
    {
      level: "06",
      stage: "The highest-order principle",
      title: "Make hope accountable",
      concept: "Power under review",
      paragraphs: [
        "Rook’s revised system can detect structural failures nearly two days earlier than the city’s old process. After a second dangerous fault, some exhausted officials back his proposal: give the model emergency authority and ask Superman to enforce its closures. Residents remain divided. The safety advantage is credible. So is the fear. But Rook will not accept a public appeal process, a fixed sunset date or independent review of the values inside the model.",
        "Superman refuses the enforcement role while supporting the early-warning technology under different rules. The city adopts a transparent maintenance charter, independent audits and a public record of deferred risks. Emergency interventions—including his own—can be reviewed after the danger passes. He remains ready for emergencies beyond ordinary capacity. Hope, however, no longer means waiting for him. It means having the truth, institutions and shared confidence needed to act together.",
      ],
      reflection:
        "The highest use of exceptional power is to accept scrutiny, consent and limits rather than asking good intentions to substitute for accountability.",
    },
  ],
  highestOrder: {
    title: "Hope a city can practise",
    body: "Hope becomes durable when information is visible, expertise is heard, authority can be questioned and even the strongest participant accepts limits. A hero can save a life; a hopeful society learns how to stop placing the same communities in danger again and again.",
    question:
      "How can extraordinary ability remain available in an emergency without making everyone else less powerful between emergencies?",
  },
} satisfies ComicsStoryCycle;

export const heManStory = {
  title: "The Wells of Ilyra",
  subtitle:
    "A dry village well expands into a struggle over scarcity, shared knowledge and the duty owed to people who have not yet been born.",
  premise:
    "Ilyra’s spring stops without warning. He-Man can lift the stones trapping its keepers and force open a relief gate, but Eternia’s old water channels are connected: every flow restored in one place changes the fate of another community downstream.",
  chapters: [
    {
      level: "01",
      stage: "The basic human need",
      title: "Lift the fallen stones",
      concept: "Strength",
      paragraphs: [
        "At dawn, the main well of Ilyra produces mud instead of water. When two keepers descend to inspect the old channel, part of the cistern collapses above them. He-Man holds the fractured stone while Sera Noll, a young water-cartographer, traces a safe route through passages too narrow for him to enter. Villagers form a line to remove debris by hand.",
        "The keepers emerge alive, and for a moment the village celebrates. Yet the well remains dry. No enemy stands at its edge, and no amount of lifting can create water that is no longer arriving. He-Man has removed the weight that threatened two lives; he has not discovered why the water disappeared or what the next dawn will bring.",
      ],
      reflection:
        "Strength is indispensable when it protects life, but physical capacity is not the same as understanding.",
    },
    {
      level: "02",
      stage: "The first ethical choice",
      title: "Open the gate slowly",
      concept: "Disciplined strength",
      paragraphs: [
        "A pressurised feeder channel still reaches Ilyra’s relief gate. He-Man could force it wide and fill the central cistern before sunset, but Sera hears the old pipes shudder beneath the street. A sudden surge would split their weakened joints, flood the lower houses and spill much of the village’s remaining reserve into the dry ground. Opening the gate by hand, one narrow turn at a time, will preserve the system—but families will have to endure another night of rationing.",
        "He-Man accepts the slower choice. He holds the stone wheel steady while Sera measures each change in pressure and villagers carry the first careful flow to the infirmary. Some accuse him of withholding water he has the strength to release. By midnight, the pipes are intact and the cistern is only partly full. Then Kes brings worse news: copies of the old control map have disappeared from a neglected royal archive, and Custodian Vorun is already closing northern reservoirs in the name of order. Ilyra has gained time, not security.",
      ],
      reflection:
        "Disciplined strength can endure criticism and delay when a faster display of power would destroy the very system people need.",
    },
    {
      level: "03",
      stage: "The consequence",
      title: "Relief moves the drought",
      concept: "Interdependence",
      paragraphs: [
        "The restored channel fills Ilyra’s cistern and drains three farms downstream. Families who had shared their reserve now watch their irrigation trenches empty. Fear becomes accusation. One community calls the water an ancient right; another calls its diversion theft. Guards gather at the gates, each convinced that survival requires taking control before someone else does.",
        "He-Man could stand between the groups and impose peace, but a command would not create enough water or answer the claim of either side. Sera shows him her incomplete channel map: Ilyra’s relief and the farms’ loss are the same event viewed from different banks. A local success has displaced harm rather than resolved it. The water itself has made the wider duty visible: every benefit must be judged alongside the costs carried somewhere else.",
      ],
      reflection:
        "Interdependence turns private victory into a shared accounting: what reached us, what left someone else and what the whole system can sustain.",
    },
    {
      level: "04",
      stage: "The system beneath the event",
      title: "Read the whole watershed",
      concept: "Ecological thinking",
      paragraphs: [
        "Sera and Kes Ardan, a former reservoir guard, reconstruct the network from broken gauges and seasonal records. Vorun has falsified scarcity reports and sold privileged access, but his deception rests on a genuine decline. Forests above the springs have been cut, soil no longer holds winter rain, old machinery leaks, and fixed water promises exceed what the watershed now produces. Defeating Vorun cannot refill an exhausted aquifer.",
        "The discovery replaces a single enemy with several interacting causes: corruption, damaged ecology, forgotten technology and agreements written for seasons that no longer come. Each attempted solution changes conditions elsewhere. More wells lower the water table. Higher gates starve the river. Identical allocations ignore crops at different stages; permanent privilege turns temporary need into inherited power. Wisdom now requires more than choosing the correct side. It requires thinking across place, time and feedback.",
      ],
      reflection:
        "Ecological thinking asks not only what a system contains, but how every part changes the conditions under which the other parts can survive.",
    },
    {
      level: "05",
      stage: "The shared response",
      title: "Many kinds of knowledge make the map",
      concept: "Plural stewardship",
      paragraphs: [
        "Farmers bring planting calendars. Travelling herders remember springs absent from official charts. Channel keepers know which stones vibrate before a breach. Forest communities understand which slopes once held the snowmelt. Sera combines their memory with new measurements. Kes persuades guards who served Vorun to protect the gathering rather than control it. No single form of knowledge is complete, but together they reveal choices that the old map could not show.",
        "The communities restore gauges, repair leaks, replant the upper slopes and negotiate flexible shares for drought and flood years. Vorun activates siphon engines that tear open an upstream embankment, hoping the flood will turn the councils against one another and make central control seem necessary. He-Man holds the torn embankment together while the channel keepers shut down each machine and the councils move their meeting to the riverbank. He does not decide who receives each measure of water. His strength protects the space in which knowledge, disagreement and consent can do their slower work.",
        "By dawn, the delegates are still arguing—and still together. The protector has become one participant in a practice of guardianship distributed across many hands.",
      ],
      reflection:
        "Plural stewardship treats different forms of knowledge as resources to be coordinated, not competitors from which one permanent winner must be chosen.",
    },
    {
      level: "06",
      stage: "The highest-order principle",
      title: "Guard the people not yet present",
      concept: "Intergenerational justice",
      paragraphs: [
        "After weeks of rationing, frightened councils reach for an old custom: they ask He-Man to become the sole keeper of the master gates until the drought ends. The request is sincere. They trust his judgement more than they trust one another, and a single command would be faster than negotiation. He-Man refuses because even benevolent control would teach every community that its future depends on one irreplaceable hand. A just system cannot be measured only by the goodness of the person currently in charge.",
        "Control is divided among upstream and downstream councils, and major changes require consent from both. A protected minimum flow remains in the river to sustain forests and wildlife. Extraction limits allow the aquifer to recharge, while a jointly governed drought reserve is released by published rules rather than private favour. These safeguards preserve choices for future generations not yet represented at the council. He-Man leaves Ilyra with less direct authority than he was offered, while the communities leave with greater responsibility than they had before. Power has built a guardianship capable of surviving the guardian.",
      ],
      reflection:
        "Intergenerational justice asks present power to protect the conditions of choice for people who cannot yet defend their own interests.",
    },
  ],
  highestOrder: {
    title: "Power that makes itself less necessary",
    body: "Strength first appears as the ability to move stone. It matures into the willingness to distribute authority, preserve a living system and limit present consumption. A guardian succeeds not by becoming permanent, but by helping many guardians—and future generations—inherit the capacity to care.",
    question:
      "If power is genuinely held in trust, what should remain possible after the most powerful person has gone?",
  },
} satisfies ComicsStoryCycle;
