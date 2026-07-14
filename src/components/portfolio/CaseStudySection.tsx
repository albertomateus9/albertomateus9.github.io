import type { ReactNode } from "react";
import { Heading, Section, Stack } from "@/components/ui";
import styles from "./portfolio.module.css";

interface CaseStudySectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}

export function CaseStudySection({ id, eyebrow, title, children }: CaseStudySectionProps) {
  return (
    <Section id={id} className={styles.caseStudySection}>
      <Stack gap={6}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <Heading level={2} size="heading2">{title}</Heading>
        </div>
        <div>{children}</div>
      </Stack>
    </Section>
  );
}
