// Checks /learning-lab/services and the company purpose on /learning-lab/purpose.
// Static checks always run. With LAB_BASE_URL set to a local server, every linked page is
// fetched and every #fragment must exist in the rendered HTML.
import assert from "node:assert/strict";
import { labLegalName } from "../src/features/learning-lab/entity.ts";
import { labMission, labPurpose } from "../src/features/learning-lab/mission.ts";
import {
  howItWorks,
  labServicesPath,
  serviceFaqs,
  serviceGroups,
  serviceStatus,
  serviceTerms,
  startGoals,
  whyLearnWithLab,
} from "../src/features/learning-lab/services.ts";
import { journeyModules } from "../src/features/learning-lab/entrepreneurship-journey.ts";
import { toolkitTools } from "../src/features/learning-lab/founder-toolkit.ts";
import { freeCourses } from "../src/features/learning-lab/free-courses.ts";
import { checkLabLinks } from "./learning-lab-links.mjs";

// The founder's own lines stay word for word.
assert.equal(labMission.purpose, "Making learning freely accessible to everyone");
assert.equal(labMission.promise, "Learn freely. Think independently. Build your future.");

// Purpose, mission, vision and values of the company.
assert.ok(
  labPurpose.statement.startsWith(
    `${labLegalName} exists to make learning freely accessible to everyone`
  )
);
assert.deepEqual(
  labPurpose.pillars.map((pillar) => pillar.label),
  ["Purpose", "Mission", "Vision"]
);
assert.match(labPurpose.pillars[1].text, /aged 18 and over/);
assert.equal(labPurpose.values.length, 5);
assert.equal(new Set(labPurpose.values.map((value) => value.title)).size, 5);
assert.ok(
  labPurpose.values.some((value) =>
    /No funding, job, business success or certificate is guaranteed/.test(value.text)
  )
);

// Services: honest statuses, no fees, real destinations.
assert.equal(labServicesPath, "/learning-lab/services");
assert.deepEqual(
  serviceGroups.map((group) => group.id),
  ["entrepreneurs", "institutions", "professionals", "roadmap"]
);
// Roadmap pathways are planned, never presented as open; the Lab is for adults today.
for (const service of serviceGroups.find((group) => group.id === "roadmap").services)
  assert.equal(service.status, "planned", `${service.id}: roadmap stays planned`);
assert.ok(
  serviceGroups
    .flatMap((group) => group.services)
    .filter((service) => service.status === "planned")
    .every((service) => service.href.startsWith("/learning-lab/purpose#")),
  "Only roadmap pathways are planned"
);
const services = serviceGroups.flatMap((group) => group.services);
assert.equal(
  new Set(services.map((service) => service.id)).size,
  services.length,
  "Unique service ids"
);
for (const service of services) {
  for (const key of ["name", "summary", "format", "href", "action"])
    assert.ok(service[key]?.trim(), `${service.id}: ${key}`);
  assert.ok(serviceStatus[service.status], `${service.id}: known status`);
  // "₹0–₹500" is the toolkit's test-budget range, not a price.
  const text = `${service.name} ${service.summary} ${service.format}`.replace("₹0–₹500", "");
  assert.ok(
    !/\b(paid|fees?|price[ds]?|discount|subscription)\b|₹\s?[1-9]\d{2,}/i.test(text),
    `${service.id}: no price or fee wording`
  );
  if (service.href.startsWith("/learning-lab/programmes/")) {
    assert.equal(
      service.status,
      "proposed",
      `${service.id}: programmes stay proposed until approved`
    );
    assert.match(service.format, /^Proposed:/);
  }
}
const byId = Object.fromEntries(services.map((service) => [service.id, service]));
assert.equal(byId["institution-pilots"].status, "proposed");
assert.match(byId["institution-pilots"].format, /no partnerships or completed pilots yet/);
assert.equal(byId["ai-viva-bot"].status, "prototype");
assert.equal(byId["founder-feedback"].status, "pilot");
assert.match(
  byId["founder-feedback"].summary,
  /up to 20 learners at a time\. Turnaround is not guaranteed\./
);
assert.match(
  serviceTerms.find((term) => term.title === "Price").text,
  /^Free\. The Lab charges no fees/
);
assert.match(
  serviceTerms.find((term) => term.title === "Who can use them").text,
  /^Adults aged 18 and over\./
);
assert.match(
  serviceTerms.find((term) => term.title === "What we do not promise").text,
  /not investment, legal or tax advice/
);

// Counts written as words must match the data they describe.
assert.equal(journeyModules.length, 7, "Seven modules");
assert.equal(toolkitTools.length, 8, "Eight tools");
assert.equal(freeCourses.length, 6, "Six courses");
assert.equal(startGoals.length, 6);
assert.equal(whyLearnWithLab.length, 6);
assert.equal(howItWorks.length, 4);
assert.match(
  whyLearnWithLab.find((item) => item.title === "Feedback from the founder").text,
  /Up to 20 learners at a time .* Turnaround is not guaranteed\./
);
// Questions are answered honestly: no live classes yet, no funding help, nothing charged.
const faq = Object.fromEntries(serviceFaqs);
assert.match(faq["Do you run live classes?"], /^Not yet\./);
assert.match(
  faq["Will the Lab help me raise funding?"],
  /^No\..*does not arrange funding or introduce investors/
);
assert.match(faq["Is everything really free?"], /^Yes\. The Lab charges no fees/);
assert.match(faq["Will I get a certificate?"], /^Not for the free self-paced services\./);

const links = [
  ...services.map((service) => service.href),
  ...startGoals.map((item) => item.href),
  "/learning-lab/purpose",
  "/learning-lab/policies",
  "/learning-lab/policies/refunds",
  "/learning-lab/contact",
  "/learning-lab/support",
  "/learning-lab/founder",
];
const { pages, note } = await checkLabLinks(links, { extraPages: [labServicesPath] });
const servicesPage = pages.get(labServicesPath);
if (servicesPage) {
  for (const group of serviceGroups)
    assert.ok(servicesPage.includes(`id="${group.id}"`), `#${group.id} section`);
  for (const service of services)
    assert.ok(servicesPage.includes(`id="service-${service.id}"`), `service-${service.id} anchor`);
  for (const id of ["why", "how", "questions", "terms", "provider"])
    assert.ok(servicesPage.includes(`id="${id}"`), `#${id} section`);
  const homeResponse = await fetch(new URL("/learning-lab", process.env.LAB_BASE_URL));
  assert.ok((await homeResponse.text()).includes('id="choose"'), "homepage goal selector");
  const purposePage = pages.get("/learning-lab/purpose");
  for (const id of ["purpose", "values"])
    assert.ok(purposePage.includes(`id="${id}"`), `purpose #${id}`);
  assert.ok(purposePage.includes(labPurpose.headline), "purpose headline rendered");
}

console.log(
  `PASS services and purpose: ${services.length} services in ${serviceGroups.length} audiences, honest statuses, no fees, purpose/mission/vision and ${labPurpose.values.length} values; ${links.length} links resolve to real routes; ${note}.`
);
