import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/home/personal.module.css";
import portrait from "../../../public/assets/profile/alberto-mateus-about.webp";
export const metadata: Metadata = { title: "Sobre mim", description: "Alberto Mateus: dev em Belém, professor de cursos técnicos e eterno aprendiz." };
export default function AboutPage() {
  return <div className={styles.innerPage}>
    <p className={styles.eyebrow}>um pouco além do código</p><h1>Oi, eu sou o Alberto.</h1>
    <div className={styles.aboutGrid}>
      <div className={styles.prose}>
        <p>Sou de Belém, no Pará. Gosto de entender como as coisas funcionam, automatizar o que se repete e experimentar ideias com código aberto.</p>
        <p>Sou professor de cursos técnicos em Informática, Redes de Computadores e Ciência de Dados na EETEPA Vilhena Alves. Entre uma aula e um experimento, tento transformar conceitos em coisas que a gente consegue testar e compreender.</p>
        <h2>Eterno aprendiz, inclusive no doutorado.</h2>
        <p>Estou no doutorado em Computação Aplicada, explorando visão computacional e análise de vídeos. Minha formação em telecomunicações e o mestrado em Engenharia Elétrica também fazem parte dessa curiosidade por conectar o mundo físico ao digital.</p>
        <p>Fora do terminal, gosto de rock, estou começando no violão e me interesso por astronomia, física e filosofia. Nem tudo precisa virar um projeto, mas quase tudo pode virar uma boa pergunta.</p>
        <Link href="/contact" className={styles.secondaryButton}>Bora trocar uma ideia? ↗</Link>
      </div>
      <figure className={styles.aboutPortrait}><Image src={portrait} alt="Retrato de Alberto Mateus" sizes="(max-width: 720px) 85vw, 320px" /><figcaption>Belém, Pará 🌴<br />Um eterno aprendiz.</figcaption></figure>
    </div>
  </div>;
}
