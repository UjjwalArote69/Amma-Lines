import { Component } from "react";

/**
 * Top-level error boundary for the whole site.
 * Catches any render error below it and shows a branded fallback
 * instead of React's blank screen.
 *
 * Navigation is preserved — a simple reload or hitting Home will
 * unmount this boundary and re-mount fresh.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, pipe to Sentry / Bugsnag here.
    console.error("Site error boundary caught:", error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  reload = () => {
    if (typeof window !== "undefined") window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const errorMessage =
      (this.state.error && this.state.error.message) ||
      "An unexpected fault in the hull.";

    return (
      <main
        className="w-full min-h-screen flex flex-col"
        style={{
          backgroundColor: "var(--color-bone)",
          color: "var(--color-ink)",
        }}
        role="alert"
        aria-live="assertive"
      >
        <div className="px-6 md:px-12 lg:px-16 pt-32 md:pt-40">
          <div className="max-w-[1500px] mx-auto">
            <div
              className="h-[1px] w-full"
              style={{ backgroundColor: "var(--color-ink)" }}
            />
            <div className="flex items-center justify-between py-3">
              <span className="caption text-[var(--color-ink)]">
                Technical fault
              </span>
              <span className="caption text-[var(--color-ink-50)] hidden md:inline">
                Unrecoverable application error
              </span>
              <span className="caption tabular text-[var(--color-ink-50)]">
                Err. 500
              </span>
            </div>
            <div
              className="h-[1px] w-full"
              style={{ backgroundColor: "var(--color-ink-12)" }}
            />
          </div>
        </div>

        <section className="flex-1 px-6 md:px-12 lg:px-16 pt-16 md:pt-24 pb-20 md:pb-28">
          <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-3">
              <p className="caption text-[var(--color-ink-50)]">
                Report from the bridge
              </p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.96] tracking-[-0.02em]">
                Something in the rigging has{" "}
                <em className="italic text-[var(--color-marine)]">snapped.</em>
              </h1>

              <p className="mt-10 max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-[var(--color-ink-70)]">
                The page failed to render. Our engineering team has been
                notified. You can return to the home page below — or send us
                a note and we will take a look.
              </p>

              <p className="mt-6 caption tabular text-[var(--color-ink-50)] max-w-xl break-words">
                {errorMessage}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-start gap-5">
                <button
                  type="button"
                  onClick={this.reload}
                  className="group relative inline-flex items-center gap-3 ps-5 pe-1.5 py-2 rounded-full transition-all overflow-hidden"
                  style={{
                    backgroundColor: "var(--color-marine)",
                    color: "#fff",
                    boxShadow: "0 4px 14px -4px rgba(30,128,184,0.5)",
                  }}
                >
                  <span className="caption text-white relative">
                    Return home
                  </span>
                  <span
                    className="relative h-8 w-8 rounded-full flex items-center justify-center transition-transform duration-500 ltr:group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.22)",
                      color: "#fff",
                    }}
                  >
                    <span className="rtl-flip">→</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={this.reset}
                  className="group inline-flex items-center gap-3 caption text-[var(--color-ink)] border-b border-[var(--color-ink-30)] hover:border-[var(--color-marine)] pb-2 transition-colors"
                >
                  <span className="group-hover:text-[var(--color-marine)] transition-colors">
                    Try again
                  </span>
                  <span className="text-[var(--color-ink-70)] group-hover:text-[var(--color-marine)] ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all">
                    ↻
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default ErrorBoundary;
