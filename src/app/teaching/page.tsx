import type { Metadata } from "next";
import styles from "@/components/home/personal.module.css";
export const metadata: Metadata = { title: "Entre aulas e perguntas", description: "Docência nos cursos técnicos de Informática, Redes de Computadores e Ciência de Dados." };
const courses = [
  { title: "Informática", description: "Programação, desenvolvimento web e ferramentas digitais. A ideia é compreender o código, testar hipóteses e construir soluções com autonomia." },
  { title: "Redes de Computadores", description: "Conectividade, administração de redes, monitoramento e segurança. Fundamentos que fazem mais sentido quando a gente observa o que acontece no laboratório." },
  { title: "Ciência de Dados", description: "Organização, análise e interpretação de dados. Antes de aceitar um resultado, perguntar de onde ele veio, como foi calculado e o que ele realmente permite concluir." },
];
export default function TeachingPage() {
  return <div className={styles.innerPage}><p className={styles.eyebrow}>do terminal para a sala de aula</p><h1>Entre aulas<br />e boas perguntas.</h1><div className={styles.prose}><p>Sou professor de cursos técnicos na EETEPA Vilhena Alves, em Belém. Gosto de conectar fundamentos a situações que os estudantes possam investigar, testar e explicar.</p><p>Ensinar também me mantém aprendendo. A prática abre espaço para projetos, trabalho em equipe e discussões em que entender o caminho importa tanto quanto chegar ao resultado.</p></div><div className={styles.explorations}>{courses.map((course, index) => <article className={styles.exploration} key={course.title}><span className={styles.number}>0{index + 1}</span><div><h2>{course.title}</h2><p>{course.description}</p></div></article>)}</div><aside className={styles.alphaNote}><span aria-hidden="true">✳</span><p>IA pode ajudar a aprender. A compreensão, a avaliação crítica e a autoria continuam com o estudante.</p></aside></div>;
}
