import type { ReactNode } from "react";
import { Badge, Heading, Stack } from "@/components/ui";
import { StatusIndicator, type StatusTone } from "./StatusIndicator";
import styles from "./portfolio.module.css";

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  category: string;
  status: StatusTone;
  updateDate: string;
  year?: number;
}

export function CaseStudyHero({
  title,
  subtitle,
  category,
  status,
  updateDate,
  year,
}: CaseStudyHeroProps) {
  return (
    <header className={styles.caseStudyHero}>
      <Stack gap={4}>
        <div className={styles.caseTitleRow}>
          <Heading level={1} size="heading1">{title}</Heading>
          <StatusIndicator status={status} />
        </div>
        <p className={styles.caseSubtitle}>{subtitle}</p>
        <ul className={styles.caseMetaList}>
          <li className={styles.caseMetaItem}>
            DOMÍNIO: <strong>{category.toUpperCase()}</strong>
          </li>
          {year && (
            <li className={styles.caseMetaItem}>
              ANO: <strong>{year}</strong>
            </li>
          )}
          <li className={styles.caseMetaItem}>
            ATUALIZADO EM: <strong>{updateDate}</strong>
          </li>
        </ul>
      </Stack>
    </header>
  );
}
