PRD |
  *Creador Ventures Landing Page – PRD with Approved Copy**
Version 1.3 · May 7 2025

---

## 1 · Purpose and Scope

Build a public, single-domain landing site for **Creador Ventures (CV)** that

* presents the firm’s vision and three business verticals (GRIT, PRA, Creador Labs)
* showcases the current portfolio, published reports, and a visual archive of past events
* drives visitors toward four clear calls to action: **Contact Us**, **Apply for Funding**, **Collaborate**, **Become a Sponsor**
* grows the mailing list and schedules calls through embedded Calendly
* measures engagement with Google Analytics 4
* allows manual content updates without a CMS at launch

---

## 2 · Personas and Primary Goals

| Persona                              | Goal on Site                           | Primary CTA / Path              |
| ------------------------------------ | -------------------------------------- | ------------------------------- |
| Current Investor                     | Schedule a follow-up call              | **Contact Us** → Calendly       |
| Prospective Investor                 | Schedule an intro call                 | **Contact Us** → Calendly       |
| Founder                              | Submit a funding application           | **Apply for Funding** form      |
| Corporate Client / Ecosystem Partner | Explore research and joint initiatives | **Collaborate** form            |
| Sponsor Prospect                     | Book a call about event sponsorship    | **Become a Sponsor** → Calendly |
| Casual Visitor                       | Learn about CV and subscribe           | Mailing-list signup             |
| Internal Admin                       | Publish new items                      | Manual file edit and redeploy   |

---

## 3 · Functional Requirements with Copy

| ID       | Feature                                                                                | Copy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **F-1**  | **Hero and Vision**<br>Full-bleed media hero, large headline, sub-headline, scroll cue | **Headline:** *Building value where others overlook*<br>**Sub-headline:** *Creador Ventures blends AI insight with local intuition to fund and accelerate bold founders in LATAM, Africa, Eastern Europe, and the Hispanic USA.*                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **F-2**  | **Vertical Sections**                                                                  | **GRIT – Startup Sourcing and Events**<br>*We scout rising talent through cultural gatherings that mix music, art, and local tech scenes. Each event feeds the Startup League, giving partners a first look at high-potential teams.*<br><br>**Creador Labs – Venture Studio and Portfolio**<br>*Our studio backs founders with capital, hands-on guidance, and shared resources. Current projects include The Hub, Fitchin, Solana ID, VIIO, and Heartstocks.*<br><br>**PRA – Psychology Research Advisory**<br>*PRA publishes open reports on counter-cyclical trends and runs bespoke studies for funds, corporates, and public bodies seeking clear insight into underdog markets.* |
| **F-3**  | **Portfolio**                                                                          | *A growing collection of companies and protocols shaped inside Creador Labs. Each tile links to an external deep dive.*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **F-4**  | **Reports**                                                                            | *Free public papers build reach and trust. Custom work for clients sits behind private briefings. Browse and download the latest editions below.*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **F-5**  | **Events**<br>Archive plus sponsorship CTA                                             | **Section intro:** *Our events spark partnerships that last. See highlights from recent editions.*<br>**CTA card:** *Interested in sponsoring the next gathering? Book a 30-minute call.*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **F-6**  | **Team**                                                                               | *A compact crew of builders, operators, and researchers committed to long-term results.*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **F-7**  | **Kontak Footer**                                                                      | *Creador Ventures · Bogotá · [biz@creador.vc](mailto:biz@creador.vc)*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **F-8**  | **CTAs**                                                                               | **Contact Us:** *Book a call* — leads to Calendly<br>**Apply for Funding:** *Send your deck* — opens validated form<br>**Collaborate:** *Start a project* — opens form<br>**Become a Sponsor:** *Schedule sponsor call* — opens Calendly                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **F-9**  | **Mailing List**                                                                       | *Stay on the radar. One concise update per quarter.*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **F-10** | Google Analytics 4 events                                                              | cta_click, funding_apply_submit, calendly_call_booked, sponsor_call_booked, report_download                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

---

## 4 · Non-Functional Requirements (unchanged)

*Performance, SEO, Availability, Analytics, Security, Accessibility* – see previous version.

---

## 5 · Success Metrics (90 days)

| Metric                               | Target       |
| ------------------------------------ | ------------ |
| Calendly investor-call bookings      | ≥ 50         |
| Mailing-list sign-ups                | ≥ 200        |
| Funding applications                 | ≥ 25         |
| Sponsor calls booked                 | ≥ 10         |
| Bounce rate on Portfolio and Reports | ≤ 40 percent |

---

## 6 · Roadmap

| Phase         | Weeks | Deliverables                                                   |
| ------------- | ----- | -------------------------------------------------------------- |
| MVP           | 0-4   | F-1 through F-4, Footer, CTAs, mailing list, GA4               |
| Enhancement 1 | 5-6   | Events archive, Team grid, micro-interactions                  |
| Enhancement 2 | 7-8   | JSON/Markdown content pipeline                                 |
| Future        | 9 +   | CMS, multilingual, investor dashboard, ticketing, AI assistant |

---

## 7 · Acceptance Criteria

1. Mobile load ≤ 3 s; Calendly booking works without horizontal scroll.
2. Funding form logs GA4 event funding_apply_submit.
3. New portfolio JSON shows on site within 15 min after deploy.
4. Zero critical aXe accessibility issues.
5. Portfolio and Reports bounce ≤ 40 percent.
6. Sponsor Calendly flow logs GA4 event sponsor_call_booked.

---

## 8 · Risks and Mitigations

| Risk                                       | Impact | Mitigation                                        |
| ------------------------------------------ | ------ | ------------------------------------------------- |
| Manual updates slow publishing             | Medium | Introduce JSON/Markdown pipeline then CMS         |
| Heavy media slows load                     | Medium | Lazy-load video, optimise images                  |
| External tool outage                       | Low    | Provide mailto fallback links                     |
| Motion and large type overwhelm some users | Medium | Respect user motion settings; adaptive font sizes |
