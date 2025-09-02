export interface Hymn {
  id: string;
  number: number;
  title: string;
  lyrics: string[];
  audioUrl: string;
}

export const hymns: Hymn[] = [
  {
    id: "1",
    number: 1,
    title: "Chuva de Graça",
    lyrics: [
      "Deus promete chuvas de graça,",
      "Chuvas de bênçãos dos céus;",
      "Gotas benditas já temos,",
      "Chuvas rogamos a Deus.",
      "",
      "[Coro]",
      "Chuvas de graça, chuvas pedimos, Senhor;",
      "Manda-nos chuvas constantes,",
      "Chuvas do Consolador.",
      "",
      "Cristo nos dá a promessa",
      "De sempre o Consolador;",
      "Dá-nos o gozo e a paz,",
      "Seu divinal e santo amor.",
      "",
      "Dá-nos, Senhor, a TUA graça,",
      "Graça do Consolador;",
      "Dá-nos poder e alegria,",
      "E o Teu divino amor.",
    ],
    audioUrl: "",
  },
  {
    id: "15",
    number: 15,
    title: "Conversão",
    lyrics: [
      "Oh! Quão cego eu andei e perdido vaguei,",
      "Longe, longe do meu Salvador!",
      "Mas do céu Ele desceu, e Seu sangue verteu",
      "Pra salvar a um tão pobre pecador.",
      "",
      "[Coro]",
      "Foi na cruz, foi na cruz, onde um dia eu vi",
      "Meu pecado castigado em Jesus;",
      "Foi ali, pela fé, que os olhos abri,",
      "E agora me alegro em Sua luz.",
      "",
      "Eu ouvia falar dessa graça sem par,",
      "Que do céu trouxe nosso Jesus;",
      "Mas eu surdo me fiz, converter-me não quis",
      "Ao Senhor, que por mim morreu na cruz.",
      "",
      "Mas um dia senti meu pecado, e vi",
      "Sobre mim a espada da lei;",
      "Apressado fugi, em Jesus me escondi,",
      "E abrigo seguro nEle achei.",
    ],
    audioUrl: "",
  },
  {
    id: "545",
    number: 545,
    title: "Porque Ele Vive",
    lyrics: [
        "Deus enviou Seu Filho amado",
        "Para morrer em meu lugar;",
        "Na cruz pagou por meus pecados,",
        "Mas o sepulcro vazio está porque Ele vive.",
        "",
        "[Coro]",
        "Porque Ele vive, posso crer no amanhã;",
        "Porque Ele vive, temor não há.",
        "Mas eu bem sei, eu sei, que a minha vida",
        "Está nas mãos do meu Jesus, que vivo está.",
        "",
        "E quando, enfim, chegar a hora",
        "Em que a morte enfrentarei,",
        "Sem medo, então, terei vitória:",
        "Verei na glória o meu Jesus que vivo está.",
    ],
    audioUrl: "",
  }
];

export const getHymnById = (id: string): Hymn | undefined => {
  return hymns.find(hymn => hymn.id === id);
};

export const getAllHymns = (): Hymn[] => {
  return hymns;
}
