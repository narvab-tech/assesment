const testimonials = [
  {
    quote:
      "We moved from spreadsheet chaos to continuous SOC 2 readiness in three weeks. The copilot surfaced gaps faster than any consultant we've hired.",
    author: "Lena Howard",
    title: "Head of Security, FintaPay"
  },
  {
    quote:
      "PCI evidence pulls went from 40 hours to 6. Our auditors were shocked at how clean the asset inventory was.",
    author: "Robert Chen",
    title: "CTO, SwipeFlow"
  }
];

const TestimonialsSection = () => (
  <section className="testimonials">
    <header className="section-header">
      <p className="section-header__eyebrow">Loved by high-growth teams</p>
      <h2 className="section-header__title">Compliance leaders trust our AI copilot</h2>
    </header>
    <div className="testimonials__grid">
      {testimonials.map((testimonial) => (
        <figure key={testimonial.author} className="testimonial-card">
          <blockquote>“{testimonial.quote}”</blockquote>
          <figcaption>
            <strong>{testimonial.author}</strong>
            <span>{testimonial.title}</span>
          </figcaption>
        </figure>
      ))}
      <div className="testimonial-card testimonial-card--cta">
        <h3>Ready to modernize your audit prep?</h3>
        <p>
          Join thousands of teams that trust our AI compliance copilot to keep assets
          inventoried, controlled, and evidence-ready.
        </p>
        <a className="btn btn--secondary" href="/demo">
          Book a guided tour
        </a>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
