import { Template } from "../types";

export const templates: Template[] = [
  {
    id: "leave-app",
    category: "Leave Application",
    name: "Standard Medical/Casual Leave Request",
    description: "A formal request to HR or your manager for medical or casual leave.",
    text: `Subject: Application for Leave - [Your Name]

Dear [Manager/HR Name],

I am writing to formally request leave from [Start Date] to [End Date], inclusive. I expect to return to the office on [Return Date].

The reason for my leave is [Reason, e.g., medical treatment / family personal matters]. During my absence, I will have [limited/no] access to my emails. 

To ensure our ongoing tasks are not interrupted, I have [handed over urgent tasks to Team Member Name / completed all immediate deliverables]. 

Thank you for your understanding and consideration of my request. Please let me know if any further clarification is required.

Sincerely,
[Your Name]
[Your Role/Title]`,
    placeholders: [
      { key: "Your Name", label: "Your Name", placeholder: "John Doe" },
      { key: "Manager/HR Name", label: "Recipient Name (Manager/HR)", placeholder: "Jane Smith" },
      { key: "Start Date", label: "Leave Start Date", placeholder: "July 24, 2026" },
      { key: "End Date", label: "Leave End Date", placeholder: "July 28, 2026" },
      { key: "Return Date", label: "Return Date", placeholder: "July 29, 2026" },
      { key: "Reason", label: "Reason for Leave", placeholder: "scheduled medical procedure" },
      { key: "Your Role/Title", label: "Your Role/Title", placeholder: "Senior Engineer" },
    ],
  },
  {
    id: "job-app",
    category: "Job Application",
    name: "Professional Cover Letter",
    description: "An elegant, persuasive cover letter designed to accompany your resume.",
    text: `Subject: Job Application for [Job Title] - [Your Name]

Dear [Hiring Manager Name],

I am writing to express my strong interest in the [Job Title] position at [Company Name], as advertised on [Where you found it]. With my background in [Your Key Expertise] and over [Years] years of experience in [Your Industry], I am confident I can bring immediate value to your team.

At [Current/Previous Company], I successfully [Mention a Key Achievement, e.g., led a project that improved efficiency by 20%]. This experience has equipped me with strong skills in [Mention 1-2 key skills] which directly align with your requirements.

I am particularly drawn to [Company Name]'s mission and recent work on [Company Project/Value]. I would welcome the opportunity to discuss how my experience and passion can support your business goals.

Thank you for your time and consideration. Please find my attached resume for your review.

Sincerely,
[Your Name]
[Your Email]
[Your Phone Number]`,
    placeholders: [
      { key: "Job Title", label: "Job Title", placeholder: "Software Engineer" },
      { key: "Your Name", label: "Your Name", placeholder: "John Doe" },
      { key: "Hiring Manager Name", label: "Hiring Manager Name", placeholder: "Hiring Team" },
      { key: "Company Name", label: "Company Name", placeholder: "Acme Corp" },
      { key: "Where you found it", label: "Job Platform / Source", placeholder: "LinkedIn" },
      { key: "Your Key Expertise", label: "Key Expertise", placeholder: "full-stack development and cloud infrastructure" },
      { key: "Years", label: "Years of Experience", placeholder: "5" },
      { key: "Your Industry", label: "Your Industry", placeholder: "Information Technology" },
      { key: "Current/Previous Company", label: "Previous Company", placeholder: "TechSolutions Ltd" },
      { key: "Mention a Key Achievement", label: "Key Achievement", placeholder: "designed an automated workflow that saved 15 hours weekly" },
      { key: "Mention 1-2 key skills", label: "1-2 Core Skills", placeholder: "React, Node.js, and agile team management" },
      { key: "Company Project/Value", label: "Company Goal/Value", placeholder: "scalable enterprise automation" },
      { key: "Your Email", label: "Your Email", placeholder: "john.doe@example.com" },
      { key: "Your Phone Number", label: "Your Phone Number", placeholder: "+1 (555) 019-2834" },
    ],
  },
  {
    id: "meeting-invitation",
    category: "Meeting Invitation",
    name: "Official Meeting Request & Agenda",
    description: "An invitation email detailing the agenda, time, and objectives.",
    text: `Subject: Meeting Invitation: [Meeting Subject]

Dear Team,

You are invited to participate in a meeting regarding [Meeting Topic] to discuss our next steps and align on immediate priorities.

Here are the schedule details:
• Date: [Date]
• Time: [Time] (Timezone)
• Location/Link: [Location or Video Link]

The primary objectives of this meeting are:
1. Review current progress on [Project/Topic].
2. Identify and resolve current bottlenecks regarding [Key Challenge].
3. Finalize task allocations and timelines for the next sprint.

Agenda:
• 00:00 - 00:10 | Welcome & Alignment
• 00:10 - 00:30 | Core Discussion on [Main Agenda Item]
• 00:30 - 00:40 | Action Items & Owner Assignments
• 00:40 - 00:45 | Q&A & Wrap-up

Please review [Attached Document/Dashboard] beforehand and arrive prepared to share your updates. If you are unable to attend, please let me know or delegate a representative.

Best regards,
[Your Name]
[Your Role/Title]`,
    placeholders: [
      { key: "Meeting Subject", label: "Meeting Subject", placeholder: "Q3 Project Kick-off" },
      { key: "Meeting Topic", label: "Meeting Topic", placeholder: "the launch schedule for Q3 projects" },
      { key: "Date", label: "Date", placeholder: "July 25, 2026" },
      { key: "Time", label: "Time", placeholder: "10:00 AM - 10:45 AM" },
      { key: "Location or Video Link", label: "Location / Video Link", placeholder: "Google Meet (meet.google.com/abc-defg-hij)" },
      { key: "Project/Topic", label: "Project/Topic Name", placeholder: "Apollo UI Redesign" },
      { key: "Key Challenge", label: "Key Challenge", placeholder: "asset bundle optimization" },
      { key: "Main Agenda Item", label: "Main Agenda Item", placeholder: "Component modularity & styling guidelines" },
      { key: "Attached Document/Dashboard", label: "Required Reading/Resource", placeholder: "the Figma spec board" },
      { key: "Your Name", label: "Your Name", placeholder: "John Doe" },
      { key: "Your Role/Title", label: "Your Role/Title", placeholder: "Product Owner" },
    ],
  },
  {
    id: "complaint-letter",
    category: "Complaint Letter",
    name: "Polite but Firm Workplace/HR Complaint",
    description: "A professional and objective complaint letter to express grievances properly.",
    text: `Subject: Formal Feedback / Grievance regarding [Issue Title]

Dear [HR/Manager Name],

I am writing to bring an important matter to your attention regarding [Brief Description of Grievance, e.g., the recurring delivery delays from vendor X / recent policy changes / workplace environment challenges].

On [Date of Incident/Period], the following event(s) took place: [Details of Event]. This resulted in [Impact, e.g., delays in our final deployment / budget overruns / team communication disruptions].

I believe it is crucial for us to address this professionally to maintain our high operational standards and healthy work environment. I would appreciate it if we could schedule a brief meeting to discuss this further and look into potential remedies.

I have compiled [relevant documentation / email logs] that provide additional context, which I am ready to share upon request. Thank you for your swift attention and support in resolving this matter.

Sincerely,
[Your Name]
[Your Role/Title]
[Your Department]`,
    placeholders: [
      { key: "Issue Title", label: "Issue Title", placeholder: "Vendor Deliverable Delays" },
      { key: "HR/Manager Name", label: "HR/Manager Name", placeholder: "Alice Peterson (HR Director)" },
      { key: "Brief Description of Grievance", label: "Brief Description", placeholder: "unnotified delays in receiving standard design assets from our external creative partner" },
      { key: "Date of Incident/Period", label: "Date of Incident/Period", placeholder: "the week of July 10" },
      { key: "Details of Event", label: "Event Details", placeholder: "the typography packages were delivered 4 days late without prior communication, halting visual prototyping" },
      { key: "Impact", label: "Impact", placeholder: "missing our initial preview deadline with stakeholders and causing developer idle time" },
      { key: "Your Name", label: "Your Name", placeholder: "John Doe" },
      { key: "Your Role/Title", label: "Your Role/Title", placeholder: "Lead Designer" },
      { key: "Your Department", label: "Your Department", placeholder: "UX/UI Design" },
    ],
  },
  {
    id: "thank-you",
    category: "Thank-You Email",
    name: "Post-Interview or Business Thank-You",
    description: "A highly polite note of gratitude after a meeting, interview, or collaboration.",
    text: `Subject: Sincere Thanks - [Your Name] / [Meeting/Interview Title]

Dear [Recipient Name],

Thank you very much for taking the time to [meet/interview] with me on [Date] regarding [Topic, e.g., the Marketing Manager role / potential partner integration]. It was a pleasure learning more about [Company/Project Name] and your vision for the future.

Our conversation reinforced my enthusiasm for [the position / our potential collaboration]. I was particularly interested in our discussion about [Specific point that resonated, e.g., expanding your digital outreach in EMEA / implementing scalable micro-frontends].

I am confident that my experience in [Your Key Skill] makes me an ideal fit to help address [Recipient's goal, e.g., your team's design scalability / expanding client onboarding].

Please feel free to reach out if you need any further information from my side. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Phone Number]
[Your LinkedIn Profile Link (optional)]`,
    placeholders: [
      { key: "Your Name", label: "Your Name", placeholder: "John Doe" },
      { key: "Recipient Name", label: "Recipient Name", placeholder: "Dr. Raymond Miller" },
      { key: "Date", label: "Date of Meeting/Interview", placeholder: "this morning" },
      { key: "Topic", label: "Topic of Meeting", placeholder: "the Lead Consultant vacancy" },
      { key: "Company/Project Name", label: "Company/Project Name", placeholder: "Omni Health Systems" },
      { key: "Specific point that resonated", label: "Key Insight Discussed", placeholder: "integrating AI diagnostic charts directly into the physician workflow seamlessly" },
      { key: "Your Key Skill", label: "Your Key Skill", placeholder: "clinical workflow optimization and digital integrations" },
      { key: "Recipient's goal", label: "Recipient's Goal", placeholder: "maximize patient throughput without sacrificing chart quality" },
      { key: "Your Phone Number", label: "Your Phone Number", placeholder: "+1 (555) 012-9988" },
    ],
  },
  {
    id: "reminder-email",
    category: "Reminder Email",
    name: "Polite Action Item & Deliverable Reminder",
    description: "A warm, professional nudge for overdue status updates or deliverables.",
    text: `Subject: Gentle Reminder: [Task/Deliverable Name] due [Due Date]

Dear [Recipient Name],

I hope you are having a productive week.

This is a gentle reminder that [Task/Deliverable Name] is scheduled for review on [Due Date]. To ensure we remain on track for our master release on [Project Deadline], we would appreciate your update or delivery.

Could you please share your latest progress or upload the file to [Link/Drive]? 

If you are facing any unexpected challenges or require extra resources, please let me know so we can coordinate support or adjust timelines as a team.

Thank you for your hard work and dedication.

Best regards,
[Your Name]
[Your Role/Title]
[Company Name]`,
    placeholders: [
      { key: "Task/Deliverable Name", label: "Task / Deliverable Name", placeholder: "the translation bundle code reviews" },
      { key: "Due Date", label: "Due Date", placeholder: "tomorrow, July 22, by 5:00 PM" },
      { key: "Recipient Name", label: "Recipient Name", placeholder: "Sarah Jenkins" },
      { key: "Project Deadline", label: "Main Project Deadline", placeholder: "August 1st" },
      { key: "Link/Drive", label: "Resource Location Link", placeholder: "the shared GitHub Pull Request" },
      { key: "Your Name", label: "Your Name", placeholder: "John Doe" },
      { key: "Your Role/Title", label: "Your Role/Title", placeholder: "Release Coordinator" },
      { key: "Company Name", label: "Company Name", placeholder: "GlobalSoft" },
    ],
  },
  {
    id: "request-letter",
    category: "Request Letter",
    name: "Official Budget / Resource Allocation Request",
    description: "A highly structured proposal requesting additional funding, software, or manpower.",
    text: `Subject: Proposal & Request for [Resource Type, e.g., Software Licenses / Budget Allocation]

Dear [Approver Name/Title],

I am writing to formally request [Resource Type, e.g., budget allocation of $5,000 / additional team headcount / premium software licenses] for our upcoming [Project Name].

To ensure the success of this initiative, our team requires this resource to address [Key Challenge, e.g., severe rendering lag in UI testing / heavy content generation demands]. 

Implementing this resource will enable us to:
1. Improve [Metric, e.g., output quality / time-to-market] by [Expected improvement, e.g., 30%].
2. Prevent [Risk, e.g., delayed client releases / bottleneck in copy validation].
3. Automate [Process, e.g., routine documentation checks].

Cost-Benefit Estimation:
• Total Estimated Investment: [Cost, e.g., $150 per seat / $3,500 one-off]
• Primary Beneficiaries: [Team, e.g., Design & Engineering teams]
• Return on Investment: [ROI details, e.g., save 12 developer hours per week]

I have attached a detailed breakdown of the specifications and vendor options for your review. I would appreciate the opportunity to present this briefly in our next executive review.

Thank you for your support and leadership in keeping our team empowered.

Sincerely,
[Your Name]
[Your Role/Title]
[Your Department]`,
    placeholders: [
      { key: "Resource Type", label: "Resource Type", placeholder: "premium Copilot & AI coding tools" },
      { key: "Approver Name/Title", label: "Approver Name/Title", placeholder: "Vice President of Technology" },
      { key: "Project Name", label: "Project Name", placeholder: "Project Hyper-Scale" },
      { key: "Key Challenge", label: "Key Challenge", placeholder: "repetitive boilerplate generation and localized testing tasks" },
      { key: "Metric", label: "Key Metric to Improve", placeholder: "developer shipping velocity" },
      { key: "Expected improvement", label: "Expected Improvement Value", placeholder: "25%" },
      { key: "Risk", label: "Business Risk to Mitigate", placeholder: "missing our Q4 cloud integration milestones" },
      { key: "Process", label: "Process to Automate", placeholder: "test harness scaffolding generation" },
      { key: "Cost", label: "Total Estimated Investment", placeholder: "$80 per developer/month" },
      { key: "Team", label: "Primary Beneficiary Team", placeholder: "Core Platform Engineering" },
      { key: "ROI details", label: "Return on Investment details", placeholder: "reclaim approximately 10 hours of active engineering per week" },
      { key: "Your Name", label: "Your Name", placeholder: "John Doe" },
      { key: "Your Role/Title", label: "Your Role/Title", placeholder: "Engineering Director" },
      { key: "Your Department", label: "Your Department", placeholder: "Cloud Operations" },
    ],
  },
];
