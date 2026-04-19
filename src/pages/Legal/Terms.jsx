import SEO from "../../components/common/SEO";
import LegalLayout from "./LegalLayout";
import { company, contact } from "../../data/company";

const Terms = () => (
  <>
    <SEO
      title="Terms & Conditions"
      description="Terms and conditions governing use of the Amma Lines website."
      path="/terms"
    />
    <LegalLayout
      chapter="VIII · Terms"
      title="Terms & Conditions"
      page="p. 101"
      lastUpdated="20 April 2026"
    >
      <p>
        These terms and conditions ("Terms") govern your use of the website
        ammalines.com ("Site") operated by {company.fullName}. By accessing
        or using the Site, you agree to be bound by these Terms. If you do
        not agree, please do not use the Site.
      </p>

      <h2>1. About the Site</h2>
      <p>
        This Site is a public information service of {company.fullName},
        flagship marine construction firm of the Meka Group. The content on
        the Site is provided for general information about our practice,
        capabilities and works; it does not constitute professional advice,
        an offer, or the formation of a contractual relationship.
      </p>

      <h2>2. Intellectual property</h2>
      <p>
        All content on this Site — text, photography, drawings,
        illustrations, logos and trademarks — is the property of{" "}
        {company.fullName}, its licensors, or its clients (where project
        photography is used by permission) and is protected by applicable
        copyright and trademark law. You may view and print pages for your
        personal or internal business reference. Any other reuse,
        republication, distribution or derivative use requires our prior
        written consent.
      </p>

      <h2>3. Permitted use</h2>
      <ul>
        <li>You may link to our home page from other professional sites without prior consent, provided the link accurately reflects Amma Lines.</li>
        <li>You may not use the Site in any manner that could damage, disable, overburden or impair it, or interfere with any other party's use.</li>
        <li>You may not use automated systems to extract content from the Site beyond normal search-engine crawling permitted by our robots.txt.</li>
      </ul>

      <h2>4. Accuracy of information</h2>
      <p>
        We make reasonable efforts to keep the Site accurate and current,
        but specifications of past projects, technical descriptions and
        third-party references may vary from the actual works delivered.
        For authoritative information about any specific work, please
        contact us.
      </p>

      <h2>5. Third-party links</h2>
      <p>
        The Site contains links to third-party sites, including our parent
        <em> Meka Group</em> careers portal. Those sites are not under our
        control, and we are not responsible for their content or privacy
        practices. Your use of those sites is governed by their own terms.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {company.fullName} shall not
        be liable for any indirect, incidental, consequential, special or
        exemplary damages arising out of or in connection with your use of
        the Site, even if advised of the possibility of such damages. Our
        total aggregate liability for any claim arising from use of the Site
        shall not exceed ₹10,000.
      </p>

      <h2>7. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless {company.fullName}, the
        Meka Group and their directors, officers, employees and agents from
        any claim or demand arising from your breach of these Terms or your
        misuse of the Site.
      </p>

      <h2>8. Governing law &amp; jurisdiction</h2>
      <p>
        These Terms are governed by the laws of India. Any dispute arising
        out of or in connection with these Terms shall be subject to the
        exclusive jurisdiction of the courts of Mumbai, Maharashtra.
      </p>

      <h2>9. Changes to these terms</h2>
      <p>
        We may revise these Terms at any time by updating this page. Your
        continued use of the Site after any change constitutes acceptance
        of the revised Terms.
      </p>

      <h2>10. Contact</h2>
      <p>
        For any question about these Terms, write to{" "}
        <a href={`mailto:${contact.emailGeneral}`}>
          {contact.emailGeneral}
        </a>{" "}
        or to the registered office at {contact.address.full}.
      </p>
    </LegalLayout>
  </>
);

export default Terms;
