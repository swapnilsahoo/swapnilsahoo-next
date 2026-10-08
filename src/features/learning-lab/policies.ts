export type LabPolicy = {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; paragraphs: string[] }[];
};

const draftReview = {
  heading: "Draft status and operator details",
  paragraphs: [
    "Draft prepared on 8 October 2026 for founder and professional review. It is not a statement that the initiative is legally compliant, and it is not an approved paid-service agreement.",
    "Swapnil Sahoo Learning Lab is a founder-led professional education initiative hosted on swapnilsahoo.com, proposed to be operated by Dr. Swapnil Sahoo. It is presently unincorporated. The founder has supplied the contact email shown on the contact page. The operator address and any applicable tax details remain to be confirmed before paid enrolment. Academic employers and institutions do not sponsor or operate the Lab by virtue of the founder's biography or contact email.",
  ],
};

export const labPolicies: LabPolicy[] = [
  {
    slug: "terms",
    title: "Terms of participation and website use",
    summary:
      "Draft for founder and legal review. Email questions are welcome through the contact page; online interest forms await secure service setup. Fees, dates and enrolment are not confirmed.",
    sections: [
      draftReview,
      {
        heading: "What the Lab offers",
        paragraphs: [
          "The Lab proposes adult professional education in management, strategy, entrepreneurship and applied AI. Programme descriptions state expected skills and learner outputs. They do not promise employment, salaries, promotion, funding or business success.",
          "Public demonstrations use original hypothetical learning examples. The proposed service is not a degree, a recognised qualification or a claim of accreditation. A Certificate of Completion, if issued after the configured requirements, records completion of the specified Lab programme only.",
        ],
      },
      {
        heading: "Interest enquiries and availability",
        paragraphs: [
          "An interest enquiry records your request for information. It does not reserve a place, confirm a cohort, create paid enrolment or charge a fee. A saved-enquiry confirmation does not mean an email was sent. The site must report an error if it cannot save your enquiry.",
          "Before an approved paid cohort, the operator must provide the actual dates, format, capacity, total fee and tax presentation, workload, access period, assessment and cancellation terms. Payments remain disabled until operator eligibility, policies, programme details and accountant-reviewed receipt or invoice handling are confirmed.",
        ],
      },
      {
        heading: "Accounts and acceptable use",
        paragraphs: [
          "The initial learner area is invitation-only and limited to adults aged 18 or over. Use your own account, protect your credentials and do not access another learner's records. Report suspected unauthorised access through the approved business contact once it is published.",
          "Do not submit confidential employer information, personal information about other people, proprietary teaching cases or materials that you lack permission to use. Submit original work and disclose permitted AI assistance. Assessment, feedback and certificate decisions remain with a human instructor.",
        ],
      },
      {
        heading: "Materials and learner work",
        paragraphs: [
          "The proposed access licence is for your own learning within the agreed programme. It does not permit redistribution of Lab materials or recordings. Third-party resources retain their own copyright and licence conditions.",
          "Learner work remains the learner's work. The Lab needs limited permission to store, assess and give feedback on a submitted assignment. Publication, testimonial use and use of identifiable work in later teaching require separate permission. No institutional logo, endorsement or co-branded certificate is implied.",
        ],
      },
      {
        heading: "Changes, problems and complaints",
        paragraphs: [
          "Material changes to an approved cohort must be communicated before they take effect, with fair cancellation or alternative arrangements under the approved policy and applicable law. Mandatory consumer rights are not waived by this draft.",
          "The founder must approve and publish the business contact, grievance process, support availability, refund terms and dispute provisions after legal review. No exclusive jurisdiction, liability exclusion or arbitration agreement is imposed by this draft.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy notice",
    summary:
      "Draft privacy notice for founder and professional review. Public data collection needs approved operator contact details, retention decisions and configured storage before launch.",
    sections: [
      draftReview,
      {
        heading: "Interest and institutional enquiries",
        paragraphs: [
          "The enquiry form asks for your name, email address and programme of interest. Institutional enquiries also ask for the institution or organisation name, with optional role, approximate adult learner count and preferred timetable. Your message is optional. The form requires confirmation that you are aged 18 or over and acknowledgement of enquiry processing. Please do not include student lists or sensitive personal, student or employer information.",
          "These details are used to record and handle the enquiry, avoid duplicate records and discuss a proposed programme or institutional pilot. Optional permission to receive programme updates is separate, unticked by default and not required to enquire. Registering interest does not enrol you.",
          "The current source field records the Lab page path and, if present, limited campaign parameters such as utm_source, utm_medium and utm_campaign. It is not cross-site tracking. Anti-spam controls use limited technical request information and keyed identifiers for rate limiting. Database and hosting providers may also maintain their own operational logs; the final notice must identify the chosen processors and their practices.",
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
          "Public exercises do not send your work to an AI provider. External marketing email, analytics and payment collection are not configured in this release. External resource links have the destination provider's own privacy terms.",
        ],
      },
      {
        heading: "Swapnil’s digital guide",
        paragraphs: [
          "The portrait-based assistant is an automated website guide, not a live conversation with Dr. Swapnil Sahoo or talking video. Answers are prepared from published website information and run in your browser. The website does not save the audio or conversation; resetting or refreshing clears the text held on the page. Replies and optional read-aloud use a standard browser or device voice, not a clone of the founder's voice.",
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
          "Proposed retention decisions for approval are a review of unconverted enquiries after six months and programme records after 24 months. Security, audit, accounting and certificate records need separate justified periods, processor settings and a deletion or anonymisation procedure. These are recommendations, not a claim that automatic deletion is already configured.",
          "Use the founder-approved email on the contact page for questions about optional marketing permission, access, correction, deletion or complaints. The response process and final retention schedule still require approval before online registration opens. Some records may need to be retained for a documented legal or dispute purpose; this must be explained rather than used as an unlimited retention rule.",
          "The initial offer is for adults only. Do not submit a child's information. If the operator learns that an enquiry or account belongs to someone under 18, it should restrict the record and arrange appropriate deletion or other legally reviewed handling.",
        ],
      },
      {
        heading: "Review before online registration",
        paragraphs: [
          "The final notice must name the actual operator and processors, explain hosting and any cross-border processing, state the approved retention schedule and give an accessible rights and grievance contact. Indian privacy rules have phased commencement; this draft does not assert that every provision is already effective or that the Lab is compliant. The launch checklist records dated primary sources for professional review.",
        ],
      },
    ],
  },
  {
    slug: "refunds",
    title: "Refund and cancellation policy",
    summary:
      "Draft for founder, accountant and legal review. Payments are disabled; registration of interest has no fee or cancellation charge.",
    sections: [
      draftReview,
      {
        heading: "Current interest-only stage",
        paragraphs: [
          "No fee is collected for registering interest. An enquiry does not reserve a place or create a paid commitment. There is therefore no paid booking to cancel at this stage.",
        ],
      },
      {
        heading: "Terms needed before a paid offer",
        paragraphs: [
          "Before accepting any payment, publish the exact fee and tax display, refund request channel, cancellation cut-offs, cohort minimum, rescheduling options and handling of partially delivered learning. State how and when accepted refunds will be processed and how provider delays or fees are handled. These details must be approved and shown before checkout.",
          "A proposed principle is a full refund if the Lab cancels an approved cohort before delivery, with a choice of refund rather than a forced credit if a material reschedule is unacceptable. The founder and lawyer must settle the exact learner-withdrawal and partially delivered service rules. This draft creates no blanket non-refundable fee and does not limit mandatory consumer rights.",
        ],
      },
      {
        heading: "Problems during delivery",
        paragraphs: [
          "Provide a staffed business contact for access problems, cancellation requests and complaints. Assess the actual service delivered, the agreed terms and applicable law. Record the decision and refund reconciliation accurately; refund targets in business planning are never a limit on valid claims.",
          "Paid enrolment must stay unavailable until merchant eligibility, the approved programme and policies, and accountant-reviewed receipts or invoices are confirmed. A future checkout should be provider-hosted, with verified payment notifications; the Lab must never store card details.",
        ],
      },
    ],
  },
  {
    slug: "participation",
    title: "Participation and assessment policy",
    summary:
      "Draft for founder and professional review. Adult learners receive explicit workload, assessment and completion criteria before joining an approved cohort.",
    sections: [
      draftReview,
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
          "Certificate eligibility depends on the assigned programme's configured lesson completion, attendance and approved capstone score, together with instructor approval. An enquiry, a payment, a login or a completed demonstration does not qualify a learner for a certificate.",
          "Before an assessed cohort opens, approve deadlines, late work, accessible alternatives, a reassessment or appeal route, and a fair procedure for participation concerns. Do not change published requirements retrospectively to improve completion statistics.",
        ],
      },
    ],
  },
  {
    slug: "recording",
    title: "Recording and media consent policy",
    summary:
      "Draft for founder and professional review. Learner contributions and sessions are not recorded by default; recording and promotional permissions are separate.",
    sections: [
      draftReview,
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
    summary:
      "Draft for founder and professional review. Certificates record completion of a Lab programme and imply no degree, recognised qualification or accreditation.",
    sections: [
      draftReview,
      {
        heading: "Eligibility and human approval",
        paragraphs: [
          "A Certificate of Completion can be issued only when the learner meets the assigned programme's configured lesson, attendance and capstone requirements and a human instructor has approved the assessment. The proposed programmes currently require all six lessons, at least 80% live attendance and an instructor-approved capstone score of at least 60 out of 100. Any approved alternative must be documented consistently before issue.",
          "A saved enquiry, demonstration exercise or payment does not earn a certificate. Demo records and certificates must be labelled as demonstrations and excluded from production outcome reporting.",
        ],
      },
      {
        heading: "Meaning and issuer",
        paragraphs: [
          "The document identifies the Lab programme, issuer and issue date. It is a Certificate of Completion for professional education, not a degree, recognised qualification, accreditation, licence to practise or guarantee of employment.",
          "Use the actual approved operator identity at the time of issue. Do not add a company suffix, employer logo, university seal, institutional credit or co-signatory without verified authority and written permission.",
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
          "A changed submission needs a new instructor review; eligibility must not be silently preserved after a material change. If revoked, verification should state that status without publishing unnecessary personal reasons. Future incorporation does not automatically transfer old certificate obligations or change the historical issuer.",
        ],
      },
    ],
  },
];
