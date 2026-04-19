import SEO from "../../components/common/SEO";
import LegalLayout from "./LegalLayout";
import { company, contact } from "../../data/company";

const Privacy = () => (
  <>
    <SEO
      title="Privacy Policy"
      description="How Amma Lines Pvt. Ltd. collects, uses and safeguards personal data under India's Digital Personal Data Protection Act, 2023."
      path="/privacy"
      noindex={false}
    />
    <LegalLayout
      chapter="VII · Privacy"
      title="Privacy Policy"
      page="p. 100"
      lastUpdated="20 April 2026"
    >
      <p>
        This Privacy Policy explains how {company.fullName} ("Amma Lines",
        "we", "us") collects, uses, shares and safeguards personal data in
        connection with this website (ammalines.com) and our business
        activities. We process personal data in line with India's{" "}
        <strong>Digital Personal Data Protection Act, 2023 ("DPDP Act")</strong>{" "}
        and, where applicable, other international data-protection law.
      </p>

      <h2>1. Who we are</h2>
      <p>
        {company.fullName} — a company incorporated under the laws of India
        on {company.incorporated}, CIN {company.cin}, with its registered
        office at {contact.address.full}. For the purposes of the DPDP Act we
        are the <em>Data Fiduciary</em> for personal data processed through
        this site.
      </p>

      <h2>2. Personal data we collect</h2>
      <p>We collect the following categories of data:</p>
      <ul>
        <li>
          <strong>Data you give us</strong> — name, organisation, email,
          telephone and message content when you complete our enquiry form or
          correspond with us.
        </li>
        <li>
          <strong>Technical data</strong> — IP address, browser type,
          operating system, referring pages and timestamps, collected
          automatically through server logs and cookies for operation and
          security.
        </li>
        <li>
          <strong>Usage data</strong> — anonymised pages viewed, approximate
          geographic region, time on page, collected only with your consent.
        </li>
      </ul>

      <h2>3. How we use your data</h2>
      <ul>
        <li>To reply to enquiries and conduct the engineering and commercial work you have approached us for.</li>
        <li>To comply with legal obligations, including KYC, tender pre-qualification and tax filings.</li>
        <li>To secure the site, detect abuse and maintain service continuity.</li>
        <li>With your consent, to improve the site through aggregated analytics.</li>
      </ul>

      <h2>4. Legal basis</h2>
      <p>
        We process personal data on the basis of your consent (Section 6,
        DPDP Act), our legitimate business interests as a data fiduciary, and
        legal obligations. We do not use your data for automated
        decision-making that produces legal effects.
      </p>

      <h2>5. Sharing &amp; transfers</h2>
      <p>
        We may share personal data with: our parent and sister companies
        within the Meka Group (on a need-to-know basis, subject to
        intra-group data-sharing controls); professional advisors (auditors,
        counsel); and service providers who host the site, process email, or
        provide analytics, each under a written agreement requiring
        equivalent safeguards. International transfers — e.g., to servers
        located outside India — are made only to jurisdictions in line with
        Section 16 of the DPDP Act, and only where appropriate safeguards
        apply.
      </p>

      <h2>6. Retention</h2>
      <p>
        We retain personal data only for as long as necessary for the
        purposes set out above, after which we delete or anonymise it.
        Enquiry-form submissions are retained for 24 months; contractual
        data for the longer of seven years or the period required by
        applicable law.
      </p>

      <h2>7. Your rights under the DPDP Act</h2>
      <p>You have the right to:</p>
      <ul>
        <li>access the personal data we hold about you,</li>
        <li>request correction or completion of inaccurate data,</li>
        <li>request erasure where the purpose has been served,</li>
        <li>withdraw consent at any time (without prejudice to prior lawful processing),</li>
        <li>nominate another person to exercise these rights on your behalf,</li>
        <li>lodge a grievance with our Grievance Officer, and subsequently with the Data Protection Board of India.</li>
      </ul>

      <h2>8. Cookies</h2>
      <p>
        We use a small number of cookies to operate the site, remember your
        preferences, and — only with consent — measure anonymised usage. You
        may decline non-essential cookies through the notice shown on your
        first visit, or by configuring your browser.
      </p>

      <h2>9. Security</h2>
      <p>
        We apply reasonable technical and organisational measures to protect
        personal data against unauthorised access, alteration, disclosure or
        destruction. No transmission over the internet can be guaranteed
        fully secure.
      </p>

      <h2>10. Grievance officer</h2>
      <p>
        For any grievance relating to the processing of your personal data,
        please write to our Grievance Officer at{" "}
        <a href={`mailto:${contact.emailGeneral}`}>
          {contact.emailGeneral}
        </a>{" "}
        or by post to the registered office address above. We will
        acknowledge your grievance within seven working days and respond
        substantively within thirty days.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update this policy from time to time. Material changes will
        be reflected in the "last updated" date above and, where required,
        re-prompted via the consent notice on site.
      </p>
    </LegalLayout>
  </>
);

export default Privacy;
