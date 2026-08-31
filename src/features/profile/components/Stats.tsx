import { Container } from "@/components/ui/Container";
import { stats } from "@/features/profile/data/stats";

export function Stats() {
  return (
    <section className="mb-20">
      <Container className="max-w-[min(100%,120rem)]">
        <div className="glass-card grid grid-cols-2 gap-6 p-8 text-center md:grid-cols-5 md:p-10 md:text-left">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="stat-num">
                {stat.value}
                {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
              </div>
              <p className="text-ink-500 dark:text-ink-300 mt-2 font-mono text-xs tracking-wider uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
