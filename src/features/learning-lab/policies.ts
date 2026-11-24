import { labPublicConfig } from "./config";

export type LabPolicy = {
  slug: string;
  title: string;
  /** "current" applies today; "draft" is prepared for future programmes. */
  status: "current" | "draft";
  summary: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const operator = {
  heading: "Who runs the Lab",
  paragraphs: [
    `Updated on 24 November 2026. Swapnil Sahoo Learning Lab is run by ${labPublicConfig.legalName}, a company founded by Dr. Swapnil Sahoo, and hosted on swapnilsahoo.com. Contact the Lab using the email on the contact page.`,
    "Academic employers and institutions do not sponsor or operate the Lab by virtue of the founder's biography or contact email.",
  ],
};

const futureDraft = {
  heading: "Status of this policy",
  paragraphs: [
    `This is a draft for future programmes, which are still being planned and will be free. It will be finalised before a programme opens, and it is not a statement of legal compliance. ${labPublicConfig.legalName} runs the Lab.`,
  ],
};

export const labPolicies: LabPolicy[] = [
  {
    slug: "terms",
    title: "Terms of participation and website use",
    status: "current",
    summary:
      "Everything the Lab offers is free. Voluntary financial assistance and support for its infrastructure and services are welcome and never required. These terms cover the website, the free guide, the toolkit and enquiries.",
    sections: [
      operator,
      {
        heading: "Everything is free",
        paragraphs: [
          "The Lab charges no fees. The free courses, the 14-day venture experiment, the founder toolkit, the open catalogue, written founder feedback and any future programmes are free. The website has no checkout and never asks for card or bank details.",
          "Voluntary financial assistance and support for the Lab's infrastructure and services are welcome and appreciated. They are never required, and they do not buy a place, feedback, assessment, a certificate or preferential treatment.",
        ],
      },
      {
        heading: "What the Lab offers",
        paragraphs: [
          "The Lab offers free practical learning in entrepreneurship, management, strategy and applied AI, starting with first-time student entrepreneurs. Descriptions state expected skills and learner outputs. They do not promise employment, salaries, promotion, funding or business success.",
          "Public demonstrations use original hypothetical learning examples. The Lab does not award a degree, a recognised qualification or accreditation. A Certificate of Completion, if issued after the configured requirements, records completion of the specified Lab programme only.",
        ],
      },
      {
        heading: "Free 14-day venture experiment",
        paragraphs: [
          "The open guide, local planner and downloads are free. The initial founder-feedback pilot is for college students who confirm they are aged 18 or over, with up to 20 active private feedback places. A place exists only after successful registration. Participation is free and creates no enrolment, qualification or certificate. The 14-day route is a working plan; customer access, time and review availability may require longer. Completing a real test and making an evidence-supported decision, including stopping, are the learning goals; no commercial outcome is guaranteed.",
          "The participant controls any customer approach, time and affordable commitment. No spending or outreach is performed by the planner. Describe offers honestly, seek voluntary adult participation, respect a refusal and submit only anonymised evidence. The guide does not authorise collecting payments, using college facilities or claiming institutional endorsement. Written founder feedback appears only after a human saves a review; automated next-task suggestions do not grade work or impersonate the founder. Research, publication and testimonial permission are separate from participating in the pilot.",
        ],
      },
      {
        heading: "Voluntary support",
        paragraphs: [
          "The support page offers an email route to give your time or expertise and the founder’s original PhonePe QR for a voluntary contribution of any amount. The image prints the payee name SWAPNIL SAHOO; check the recipient in your payment app before sending. The payment app handles the transfer. The website does not verify transactions, issue automatic confirmations or submit an email automatically.",
          "Contributions support the Lab's infrastructure and services. No registered-charity status or tax deduction is claimed. If you sent a contribution by mistake, for example a duplicate or the wrong amount, email the Lab with the date, amount and transaction reference and it will be returned to the account it came from.",
        ],
      },
      {
        heading: "Interest enquiries and availability",
        paragraphs: [
          "An interest enquiry records your request for information. It does not reserve a place, confirm a cohort or create an enrolment, and nothing is charged. A saved-enquiry confirmation does not mean an email was sent. The site must report an error if it cannot save your enquiry.",
          "Before a programme opens, the Lab will publish its dates, format, capacity, workload, access period, assessment and cancellation arrangements. Programmes will be free.",
        ],
      },
      {
        heading: "Accounts and acceptable use",
        paragraphs: [
          "The initial learner area is invitation-only and limited to adults aged 18 or over. Use your own account, protect your credentials and do not access another learner's records. Report suspected unauthorised access through the contact email on the contact page.",
          "Do not submit confidential employer information, personal information about other people, proprietary teaching cases or materials that you lack permission to use. Submit original work and disclose permitted AI assistance. Assessment, feedback and certificate decisions remain with a human instructor.",
        ],
      },
      {
        heading: "Materials and learner work",
        paragraphs: [
          "Access to Lab materials is for your own learning. It does not permit redistribution of Lab materials or recordings. Third-party resources retain their own copyright and licence conditions.",
          "Learner work remains the learner's work. The Lab needs limited permission to store, assess and give feedback on a submitted assignment. Publication, testimonial use and use of identifiable work in later teaching require separate permission. No institutional logo, endorsement or co-branded certificate is implied.",
        ],
      },
      {
        heading: "Changes, problems and complaints",
        paragraphs: [
          "Material changes to a programme will be communicated before they take effect, with a fair alternative where possible. These terms may be updated; the date at the top shows the latest version.",
          "Send questions, problems and complaints to the email on the contact page. These terms do not limit any rights you have under applicable law, and they impose no exclusive jurisdiction, liability exclusion or arbitration agreement.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy notice",
    status: "current",
    summary:
      "How the website handles enquiry details, optional marketing permission and learning records. Online forms depend on configured storage.",
    sections: [
      {
        heading: "Operator and current enquiry handling",
        paragraphs: [
          `Updated on 24 November 2026 to name the company that runs the Lab. The operator is ${labPublicConfig.legalName}, founded by Dr. Swapnil Sahoo; contact swapnil.s@greatlakes.edu.in for an enquiry or privacy question. Academic employers and institutions do not sponsor or operate the Lab by virtue of the founder's biography or contact email.`,
          "The contact page shows whether online enquiries are available. When a form is offered, your entries are sent to the website when you submit it. A saved confirmation means the enquiry was accepted into configured storage; it does not confirm an email, enrolment or booking. If online forms are unavailable, the email link opens your email app and the website does not save or send that message.",
          "This notice describes the implemented workflow and does not certify legal compliance. Everything the Lab offers is free, and the website has no checkout.",
        ],
      },
      {
        heading: "Interest and institutional enquiries",
        paragraphs: [
          "The enquiry form asks for your name, email address and programme of interest. Institutional enquiries also ask for the institution or organisation name, with optional role, approximate adult learner count and preferred timetable. Your message is optional. The form requires confirmation that you are aged 18 or over and acknowledgement of enquiry processing. Please do not include student lists or sensitive personal, student or employer information.",
          "These details are used to record and handle the enquiry, avoid duplicate records and discuss a proposed programme or institutional pilot. Optional permission to receive programme updates is separate, unticked by default and not required to enquire. Registering interest does not enrol you.",
          "The current source field records the Lab page path and, if present, limited campaign parameters such as utm_source, utm_medium and utm_campaign. It is not cross-site tracking. Anti-spam controls use limited technical request information and keyed identifiers for rate limiting. Vercel hosts this website and may maintain operational request logs. When online forms are configured, accepted enquiries are stored in a Turso Cloud libSQL database hosted separately from Vercel. The contact page shows current form availability, and a saved confirmation means the enquiry reached that storage.",
        ],
      },
      {
        heading: "14-day venture experiment: private feedback",
        paragraphs: [
          "Added on 21 October 2026. The optional private pilot collects a name or alias, email, college, idea, skills, relationships described without names, daily time, affordable commitment, customer access and four stages of original work. Adult, college-student and privacy acknowledgements are required. The operator uses these details to provide private feedback, assess evidence and track actual mentoring time. Email is used for identity or privacy handling; no automatic email, marketing permission or research/publication consent is created. Do not include identifiable customer data, contact lists, recordings or confidential records.",
          "Vercel processes requests and the existing Turso Cloud database stores pilot registrations, work revisions, human reviews, rubric scores and mentoring minutes. A high-entropy private access code is shown once at registration; only its keyed hash is stored. The code is sent in an Authorization header, never a page URL. Keep the separate private-code download safe; worksheets exclude the code. The code is held in page memory during use, not automatically saved in browser storage. Drafts are stored in this browser only if you choose Save on this device; you can clear them. Downloaded files remain under your control.",
          "The code expires 90 days after registration. After expiry, access is denied; expired private pilot records and their associated work/reviews are deleted at the next database maintenance/bootstrap, not at a guaranteed instant. A participant can withdraw and delete their private pilot record and associated work/reviews using the code. The permanent operator can handle deletion or lost-access requests after checking identity; automatic code recovery by email is not available. These rules apply to this new pilot and do not change retention for other Lab services. Restricted operator exports and backups remain subject to the existing manual retention process. Individual work and comparative research data are not published without separate consent.",
        ],
      },
      {
        heading: "Voluntary free-lesson feedback pilot",
        paragraphs: [
          "Added on 20 October 2026. The voluntary pilot form asks adults for a name or alias, a real email, the lesson tried, whether the task was completed or stopped, a brief reasoning or stopping point, and instruction clarity. Difficulty, next action and pilot-only email follow-up permission are optional. Email is used to match correction or withdrawal requests and, only if separately permitted, discuss that pilot response or a revised lesson. A separate, initially unticked choice permits the four short pilot practice notes through 13 November 2026. These messages use Google Mail through the operator’s OpenAI-connected Gmail tool, from swapnil.s@greatlakes.edu.in; reply STOP to withdraw. Your most recent pilot response controls both optional email choices across all pilot lessons; leaving a choice unticked in an updated response withdraws it. A STOP reply overrides form choices. To restart these pilot notes after STOP, reply RESUBSCRIBE from the same email. Neither choice subscribes you to general programme marketing.",
          "Accepted feedback is stored in the same restricted Turso enquiry workspace as other Lab enquiries, labelled separately as volunteer feedback. Repeating an email/lesson combination updates that pilot response; it does not overwrite a programme enquiry. Technical anti-spam and limited source/campaign information are handled as described above. Submitting sends no immediate email; optional practice notes remain a separate choice. The feedback form creates no account, booking, assessment or certificate. New responses are accepted only from 20 October through 18 November 2026, India time; corrections and withdrawal requests can still be emailed after this window. The existing manual retention, access, correction and deletion arrangements apply.",
          "You may decline or stop without affecting grades, admissions, references or free access. A reported completion is not an observed or assessed learning outcome. Names, work and comments are not published without separate permission; no recording permission is requested or inferred. Use fictional examples and do not submit sensitive personal, student or employer information.",
        ],
      },
      {
        heading: "Voluntary support and external payments",
        paragraphs: [
          "If you choose to email about voluntary assistance or contributions, your email provider and the recipient's email service process the message. Share only the information needed to discuss your offer. Clicking an email link does not send a message. Supporters' names, messages and contributions are not published without separate permission.",
          "Optional voluntary contributions use the original QR displayed on the support page. Your chosen payment app, bank and payment services process the transfer under their own terms and privacy notices. This website has no contribution form, payment gateway, public supporter list or transaction-verification service. It does not receive an automatic payment confirmation or issue an automatic receipt. A transfer does not create a learner account, enrolment or certificate eligibility.",
        ],
      },
      {
        heading: "Invited learners and administration",
        paragraphs: [
          "The pilot learner workflow uses your name, email, authentication records, assigned programme or cohort, lesson progress, attendance entered by the instructor, submitted assignment text, assessment scores and feedback. These are used to provide access, teach, assess and determine completion. Account credentials and sessions are handled by the configured authentication service. Never submit passwords through an enquiry.",
          "Learners may access their own assigned records. Authorised administrators and instructors access only what is needed to operate the pilot. Privileged changes can create audit records. Exports must remain restricted to authorised operators and be stored securely; they are not permission to reuse data for unrelated marketing or research.",
        ],
      },
      {
        heading: "Cookies, demonstrations and external services",
        paragraphs: [
          "Authentication requires essential session cookies. Free-course and demonstration notes stay on the page unless you choose to save them in this browser or download a worksheet. They are not sent to the Lab by these exercises. A separate learner-workspace submission is required for assessment. Browser-stored notes can be cleared in the exercise or using your browser's site-data controls.",
          "Google Tag Manager (container GTM-KJMH54BC) loads across the website to manage tags. Loading it contacts Google and provides standard request information such as your IP address, browser and the page address. The individual measurement services depend on tags configured and published in that container; installing the container alone does not establish which analytics reports are available. This installation adds no custom data-layer events containing form answers, worksheet text, private access codes or founder feedback. Google services operate under Google's privacy terms.",
          "The Google tag G-PTGSDRSVK3 is also installed once per page for Google Analytics measurement. It can collect page views, page addresses and titles, browser/device information and cookie-based identifiers; enabled automatic events depend on the Analytics property settings. Browser cookie controls and tracking protections can limit collection. This manual installation does not add names, emails, worksheet answers, private access codes or founder feedback to measurement events. Analytics report access and processing are managed in the owner's Google Analytics account.",
          "Public exercises do not send your work to an AI provider. General marketing email is not configured, and the website has no checkout. Optional QR contributions are processed in your chosen payment app, not on this website. External resource links have the destination provider's own privacy terms.",
        ],
      },
      {
        heading: "Swapnil’s digital guide",
        paragraphs: [
          "The animated assistant is an AI-generated likeness of Dr. Swapnil Sahoo, not a live conversation with him. Its simple mouth animation accompanies a standard browser or device voice; this is not a clone of the founder's voice. Answers are prepared from published website information and run in your browser. The website does not save the audio or conversation; resetting or refreshing clears the text held on the page. The optional welcome video is a prerecorded introduction with stock synthetic narration, captions and a transcript; playing it does not start a microphone or an AI-provider session.",
          "Optional browser voice input requires your separate choice before starting each question. Your browser's speech service may send microphone audio to its provider for transcription; processing and retention depend on that browser and service. This website receives the resulting text only within the page, limits each question to 500 characters, and does not upload it to an AI service. Listening and playback stop on close, reset, mode change, page navigation or when the tab becomes hidden. Voice support varies; text remains available.",
          "Live AI video is a separate optional mode; the video panel explains when it is not yet available. Before connecting, the assistant identifies the provider (1mind or Tavus) and asks you to choose to start. The provider and its video infrastructure process your microphone audio and conversation under the linked provider privacy notice. The website does not request your camera. Provider settings govern transcripts, recording and retention; review the provider notice before starting. Do not share confidential information, student records or sensitive personal information.",
        ],
      },
      {
        heading: "Certificates and public identity",
        paragraphs: [
          "A certificate verification link is shared using a non-guessable identifier. Verification is limited to certificate status, programme, issue date and whether it is demonstration data. A learner's display name is hidden unless that learner separately chooses to publish it. Email, assessment scores, feedback and submitted work are not public verification information.",
          "Do not share your certificate link if you do not want another person to see even these minimal details. Public name consent can be changed through the learner workflow. A testimonial, photograph, recording or public learner story requires separate permission and is not a condition of completion.",
        ],
      },
      {
        heading: "Retention, withdrawal and requests",
        paragraphs: [
          "There is no scheduled automatic deletion in this release. Retention periods remain under review: the proposed review points are six months for unconverted enquiries and 24 months for programme records. These are proposals, not an automatic deletion promise. Security, audit, accounting and certificate records, together with provider logs and backups, need separate retention decisions and a manual deletion or anonymisation procedure.",
          "Email swapnil.s@greatlakes.edu.in for questions about optional marketing permission, access, correction, deletion or complaints. Requests go to the operator for manual handling; the website has no automatic privacy-request workflow. Some records may need to be retained for a documented legal or dispute purpose; the operator should explain any such reason in the reply.",
          "The initial offer is for adults only. Do not submit a child's information. If the operator learns that an enquiry or account belongs to someone under 18, it should restrict the record and arrange appropriate deletion or other legally reviewed handling.",
        ],
      },
      {
        heading: "Service configuration and future programmes",
        paragraphs: [
          "Online-enquiry availability depends on the private hosting and storage configuration. The published provider details and retention information need to follow the actual setup and any later changes. The contact email above is the route for privacy questions; no response-time guarantee or automated deletion is offered.",
          "Invited learning, recordings and any future programme need their own agreed scope and policies. This notice does not turn a saved enquiry into permission to enrol someone, publish their work, record them or send unrelated marketing. Draft policies for future programmes will be finalised before those programmes open.",
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refunds and cancellations",
    status: "current",
    summary:
      "Everything is free, so there is no fee to refund or cancel. A voluntary contribution sent by mistake will be returned.",
    sections: [
      operator,
      {
        heading: "No fees, nothing to cancel",
        paragraphs: [
          "The Lab charges no fees for courses, the 14-day experiment, the toolkit, founder feedback or programmes. Registering interest or joining a free activity creates no payment, so there is nothing to refund. You can stop or withdraw at any time without a charge.",
          "If the Lab cancels or reschedules a free session or programme, it will tell participants as early as it can.",
        ],
      },
      {
        heading: "Voluntary contributions",
        paragraphs: [
          "Contributions are voluntary support for the Lab's infrastructure and services, not payment for anything. They are not needed for any place, feedback or certificate.",
          "If you sent a contribution by mistake, for example a duplicate or the wrong amount, email the Lab with the date, amount and transaction reference. After the transfer is identified, it will be returned to the account it came from. These terms do not limit any rights you have under applicable law.",
        ],
      },
    ],
  },
  {
    slug: "participation",
    title: "Participation and assessment policy",
    status: "draft",
    summary:
      "Draft for future programmes. Adult learners receive explicit workload, assessment and completion criteria before joining an approved cohort.",
    sections: [
      futureDraft,
      {
        heading: "Eligibility and access",
        paragraphs: [
          "The initial programmes are for adults aged 18 or over. Programme pages state prerequisites and the proposed workload. Dates, capacity, access duration and required tools must be approved before enrolment. No coding background or paid AI subscription should be assumed unless a programme explicitly requires it.",
          "Learner accounts are provisioned by invitation. Access is personal. Reasonable access or attendance barriers should be raised through the approved support contact so that the instructor can agree a fair alternative consistent with the learning outcomes.",
        ],
      },
      {
        heading: "Respect and confidentiality",
        paragraphs: [
          "Discuss ideas critically and treat other participants respectfully. Harassment, discriminatory behaviour, impersonation and attempts to access someone else's work are not acceptable. Do not disclose another participant's personal information or circulate their work without permission.",
          "Use original hypothetical examples or information you are authorised to use. Do not upload confidential company information, personal data about customers or students, proprietary cases or restricted teaching assets.",
        ],
      },
      {
        heading: "AI assistance and original work",
        paragraphs: [
          "The programme specifies permitted AI assistance for each task. Disclose material assistance, check every factual claim and citation, and be able to defend the submitted reasoning. An AI-generated answer alone does not establish learning. The Lab does not provide an automated AI assessor in this release.",
          "The instructor reviews the capstone against the published rubric and provides feedback. Revisions replace earlier submission text in the initial workflow and require a new review. Learners should keep their own copy of work and follow the agreed reassessment process.",
        ],
      },
      {
        heading: "Completion and fair review",
        paragraphs: [
          "Certificate eligibility depends on the assigned programme's configured lesson completion, attendance and approved capstone score, together with instructor approval. An enquiry, a contribution, a login or a completed demonstration does not qualify a learner for a certificate.",
          "Before an assessed cohort opens, approve deadlines, late work, accessible alternatives, a reassessment or appeal route, and a fair procedure for participation concerns. Do not change published requirements retrospectively to improve completion statistics.",
        ],
      },
    ],
  },
  {
    slug: "recording",
    title: "Recording and media consent policy",
    status: "draft",
    summary:
      "Draft for future programmes. Learner contributions and sessions are not recorded by default; recording and promotional permissions are separate.",
    sections: [
      futureDraft,
      {
        heading: "Default and specific consent",
        paragraphs: [
          "The initial pilot should run without recording learner voices, video or identifiable contributions by default. Joining a programme, turning on a camera or registering interest is not consent to recording or promotion.",
          "If a recording is proposed, give a separate notice before recording: what is captured, why, who can access it, where it is stored, how long it remains available and how permission can be withdrawn. Obtain a clear affirmative choice. Provide an alternative for learners who decline, such as an instructor-only recap or equivalent learning material.",
        ],
      },
      {
        heading: "Use and sharing",
        paragraphs: [
          "Learning-access permission does not permit promotional use. Publishing a photograph, testimonial, learner name or clip requires a separate specific approval for the relevant channel and purpose. No employer or institution endorsement is implied.",
          "Participants must not independently record sessions, share meeting links or redistribute recordings without permission. Do not include restricted employer information or third-party personal data in a recording.",
        ],
      },
      {
        heading: "Launch decisions still required",
        paragraphs: [
          "The operator must approve the recording tool, storage location, access controls, deletion schedule, consent record and request contact before enabling recording. Recordings from academic employment or previous teaching are not reused for the Lab without explicit rights and participant permissions.",
        ],
      },
    ],
  },
  {
    slug: "certificates",
    title: "Certificate of Completion policy",
    status: "draft",
    summary:
      "Draft for future programmes. Certificates record completion of a Lab programme and imply no degree, recognised qualification or accreditation.",
    sections: [
      futureDraft,
      {
        heading: "Eligibility and human approval",
        paragraphs: [
          "A Certificate of Completion can be issued only when the learner meets the assigned programme's configured lesson, attendance and capstone requirements and a human instructor has approved the assessment. The proposed programmes currently require all six lessons, at least 80% live attendance and an instructor-approved capstone score of at least 60 out of 100. Any approved alternative must be documented consistently before issue.",
          "A saved enquiry, demonstration exercise or contribution does not earn a certificate. Demo records and certificates must be labelled as demonstrations and excluded from production outcome reporting.",
        ],
      },
      {
        heading: "Meaning and issuer",
        paragraphs: [
          "The document identifies the Lab programme, issuer and issue date. It is a Certificate of Completion for professional education, not a degree, recognised qualification, accreditation, licence to practise or guarantee of employment.",
          `Certificates are issued by ${labPublicConfig.legalName}. They carry no employer logo, university seal, institutional credit or co-signatory without verified authority and written permission.`,
        ],
      },
      {
        heading: "Verification and privacy",
        paragraphs: [
          "The verification identifier is non-guessable. A person with the link can see certificate status, programme, issue date and demonstration status. The learner's display name is hidden by default and appears only after the learner separately chooses to publish it. Public verification does not reveal email, marks, feedback or assignment text.",
          "Keep the link private if you do not wish to share even the minimal completion information. The learner can change the public-name choice through the learner area. Verification pages should not be indexed by search engines.",
        ],
      },
      {
        heading: "Corrections, reassessment and revocation",
        paragraphs: [
          "Before issuing assessed certificates, approve a staffed process for name corrections, disputed assessment, certificate errors and revocation. An erroneous or invalid issue should be reviewed by an authorised instructor or administrator with an audit record and a fair opportunity for the learner to respond.",
          "A changed submission needs a new instructor review; eligibility must not be silently preserved after a material change. If revoked, verification should state that status without publishing unnecessary personal reasons.",
        ],
      },
    ],
  },
];
