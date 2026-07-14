# Checklist de Segurança e Publicação (Hardening)

Este checklist consolida as práticas de hardening e higienização do **Portfolio OS** adotadas a partir da Fase P2. Antes de qualquer commit ou deploy público, revise cada item para garantir a integridade dos dados e a conformidade legal.

---

## 1. Vazamento de Credenciais e Segredos
* [ ] **Chaves e Tokens**: Verifique se não foram adicionadas chaves de API do Google, OpenAI, tokens do GitHub, senhas de e-mail ou chaves SSH ao código.
* [ ] **Variáveis de Ambiente**: Confirme se o arquivo `.env` está devidamente listado no `.gitignore` e **nunca** seja trackeado pelo Git.
* [ ] **Configurações Locais**: Garanta que chaves privadas de criptografia ou hashes de teste não estejam expostos em constantes de arquivos estáticos.

---

## 2. Leak de Rede e Infraestrutura Privada
* [ ] **IPs Privados**: Certifique-se de que nenhum IP privado de produção (ex: faixas `10.0.0.0/8`, `172.16.0.0/12` ou `192.168.0.0/16`) ou público real de servidores corporativos/educacionais esteja exposto no código ou descrições.
* [ ] **Hostnames e Intranets**: Remova referências a nomes de servidores internos, domínios de intranets privadas ou topologias de rede reais da PRODEPA ou da EETEPA.
* [ ] **Portas Sensíveis**: Evite mapeamentos de portas de banco de dados ou endpoints administrativos em ambientes de produção que não estejam estritamente protegidos por VPN/Firewall.

---

## 3. Privacidade e Proteção de Dados de Terceiros (LGPD)
* [ ] **Dados de Estudantes**: É expressamente proibida a publicação de nomes, matrículas, notas, turmas ou histórico de alunos reais da EETEPA. Use apenas identidades fictícias e simulações conceituais gerais se necessário.
* [ ] **Documentos Pessoais**: Garanta que nenhum CPF, RG, telefone celular privado, endereço residencial ou comprovante pessoal de Alberto Mateus ou de terceiros esteja presente em dados públicos.
* [ ] **Prints de Tela**: Caso adicione novas imagens de previews de projetos à pasta `public/assets/`, verifique se o print não captura abas do navegador com sistemas internos de órgãos públicos, e-mails legíveis, rostos sem consentimento ou credenciais visíveis no console.

---

## 4. Enquadramento e Claims Quantitativos
* [ ] **Isenção de Responsabilidade (Disclaimers)**: Projetos que funcionam como provas de conceito, simulações ou trabalhos acadêmicos devem conter a etiqueta clara de `Conceito` ou `Pesquisa` com seus devidos disclaimers em tela.
* [ ] **Evitação de Falsas Métricas**: Não introduza porcentagens arbitrárias sem comprovação técnica associada (ex: "redução de 40% na latência" ou "99.8% de precisão"). Prefira termos neutros: *"pipeline experimental para avaliação de métodos"*.
* [ ] **Linguagem Diagnóstica/Clínica**: Para projetos de processamento ou IA aplicada a movimentos humanos (como o *Tea Pose Analysis*), utilize enquadramentos estritamente focados no estudo de keypoints matemáticos e visão computacional, deixando claro que **não possuem finalidade diagnóstica, clínica ou terapêutica**.

---

## 5. Autoria Acadêmica e Comercial
* [ ] **Coautores**: Preserve o nome de todos os coautores nos artigos e capítulos listados em `src/data/articles.ts` exatamente como foram indexados e publicados nos anais científicos originais.
* [ ] **Propriedade Intelectual**: Projetos comerciais ou institucionais desenvolvidos sob contrato devem respeitar termos de confidencialidade (NDA), exibindo apenas especificações genéricas de alto nível permitidas em portfólio.

---

## 6. Higiene do Repositório Git
* [ ] **Git Status**: Verifique os arquivos modificados através de `git status --short`.
* [ ] **Trailing Whitespaces e Conflitos**: Execute `git diff --check` antes de consolidar o commit.
* [ ] **Pastas Proibidas**: Confirme se pastas geradas de build ou cache local (`node_modules/`, `.next/`, `dist/`, `.agents/`, `.tsbuildinfo`) não estão na lista de arquivos rastreados.
