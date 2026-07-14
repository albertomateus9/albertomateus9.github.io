import type { ProjectTimelineStage } from "@/types";
import styles from "./portfolio.module.css";

interface ProjectTimelineProps {
  stages: ProjectTimelineStage[];
}

export function ProjectTimeline({ stages }: ProjectTimelineProps) {
  return (
    <div className={styles.timelineNew}>
      {stages.map((stage, idx) => (
        <div key={idx} className={styles.timelineItemNew}>
          <div className={styles.timelineDotNew} />
          <div className={styles.timelinePeriodNew}>{stage.period}</div>
          <h4 className={styles.timelineTitleNew}>{stage.title}</h4>
          <p className={styles.timelineDescNew}>{stage.description}</p>
        </div>
      ))}
    </div>
  );
}
