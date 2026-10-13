import type { Metadata } from "next";
import { contactEmails, profile } from "@/data/profile";
import styles from "@/components/home/personal.module.css";
export const metadata: Metadata = { title: "Bora conversar?" };
export default function ContactPage() {
  return <div className={styles.innerPage}><p className={styles.eyebrow}>uma mensagem já é um começo</p><h1>Bora trocar<br />uma ideia<span className={styles.accent}>?</span></h1><p className={styles.intro}>Sobre código aberto, automação, IA, educação ou alguma ideia que ainda esteja em alpha.</p><div className={styles.emailList}>{contactEmails.map(({ label, email }) => <a href={"mailto:" + email} key={email}><span>{label}</span><strong>{email}</strong><span aria-hidden="true">↗</span></a>)}</div><div className={styles.socialLinks}>{profile.links.filter(({ label }) => label !== "Currículo Lattes").map(({ label, href }) => <a href={href} key={href} target="_blank" rel="noreferrer">{label} ↗<span className="sr-only"> (abre em nova aba)</span></a>)}</div></div>;
}
