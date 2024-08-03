import { EgogramQuestion, EgogramType } from "@/types/egogram";

export const EGOGRAM_QUESTIONS: EgogramQuestion[] = [
  { title: "Tem movimentos firmes e ativos?", target: "A" },
  { title: "É espontâneo e livre?", target: "CL" },
  { title: "Despreza os outros?", target: "PC" },
  { title: "Procura harmonizar-se com os que o cercam?", target: "CA" },
  { title: "Valoriza as tradições?", target: "PC" },
  {
    title: "Percebe as qualidades alheias e as ressalta?",
    target: "PA",
  },
  { title: "Interessa-se pelas conversas alheias?", target: "PA" },
  { title: "Analisa bem a realidade e toma decisões?", target: "A" },
  { title: "Expressa logo os sentimentos na fisionomia?", target: "A" },
  { title: "É crítico às coisas e fatos?", target: "PC" },
  { title: "É cerimonioso e retraído?", target: "CA" },
  { title: "É extremamente atencioso com os outros?", target: "PA" },
  {
    title: "Protela as decisões referente às questões desagradáveis?",
    target: "CA",
  },
  { title: "Valoriza o senso de responsabilidade?", target: "PC" },
  {
    title: "Conversa com o parceiro em postura correta, encarando-o?",
    target: "A",
  },
  { title: "Vive se queixando e se lamentando?", target: "CA" },
  { title: "Gosta de ajudar os outros?", target: "PA" },
  { title: "Examina a reação alheia?", target: "CA" },
  { title: 'Costuma questionr "Por quê? Como?"', target: "A" },
  { title: "É moralista?", target: "PC" },
  { title: "Julga corretamente os fatos?", target: "A" },
  {
    title: 'Manifesta expressões de espanto: "Não diga!"',
    target: "CL",
  },
  {
    title: "É rigoroso com os fracassos e defeitos alheios?",
    target: "PC",
  },
  {
    title: "Cozinha, lava e limpa por iniciativa própria?",
    target: "PA",
  },
  {
    title: "É do tipo que não consegue dizer o que pensa?",
    target: "CA",
  },
  { title: "Sempre arranja boas desculpas?", target: "CA" },
  {
    title: 'Costumeiramente expressa-se dizendo: "Deve fazer"?',
    target: "PC",
  },
  { title: "Tem dificuldades em ficar quieto e parado?", target: "CL" },
  { title: "Cumpre rigorosamente os regulamentos?", target: "PC" },
  {
    title: "Sabe lidar relativamente bem com as pessoas?",
    target: "CA",
  },
  { title: "Esforça-se para contentar os outros?", target: "CA" },
  { title: "Fala sem cerimônia sobre o que pensa?", target: "CL" },
  {
    title: "Colhe várias informações (fatos) e os analisa bem?",
    target: "A",
  },
  { title: "Você é targetísta?", target: "CL" },
  { title: 'Diz: "Desculpe-me", "Sinto muito"?', target: "CA" },
  {
    title: "Julga os fatos sem interferir a sua opinião pessoal?",
    target: "A",
  },
  { title: "É extremamente curioso?", target: "CL" },
  { title: "É indiferente aos assuntos alheios?", target: "CL" },
  { title: "Age sempre em busca do ideal?", target: "PC" },
  {
    title: "Sempre planeja conscientemente antes de agir?",
    target: "A",
  },
  { title: "Não se torna emotivo numa conversa?", target: "A" },
  {
    title: "Sempre que vê uma pessoa em dificuldades, consola-a?",
    target: "PA",
  },
  {
    title: "Assume a liderança do trabalho em atividades coletivas?",
    target: "PA",
  },
  {
    title: "Expressa com clareza e firmeza sua opinião pessoal?",
    target: "PC",
  },
  { title: "Decide pela intuição em lugar da razão?", target: "CL" },
  { title: "É maleável?", target: "PA" },
  { title: "É obstinado em relação aos seus desejos?", target: "CL" },
  { title: "Perdoa com sinceridade as falhas alheias?", target: "PA" },
  { title: "Dialoga facilmente com qualquer pessoa?", target: "A" },
  { title: "Não consegue recusar um pedido?", target: "PA" },
];

export const EGOGRAM_TYPES_DICT: Record<EgogramType, string> = {
  CL: "Criança Livre",
  CA: "Criança Adaptada",
  A: "Adulto",
  PC: "Pai Crítico",
  PA: "Pai Amigo",
};

export const EGOGRAM_TYPE_DESCRIPTIONS: Record<EgogramType, string> = {
  CL: "A Criança Livre é espontânea e livre, desprezando os outros e valorizando as tradições.",
  CA: "A Criança Adaptada procura harmonizar-se com os que o cercam, é cerimoniosa e retraída.",
  A: "O Adulto analisa bem a realidade e toma decisões, expressando logo os sentimentos na fisionomia.",
  PC: "O Pai Crítico é crítico às coisas e fatos, valoriza o senso de responsabilidade e é rigoroso com os fracassos e defeitos alheios.",
  PA: "O Pai Amigo percebe as qualidades alheias e as ressalta, interessa-se pelas conversas alheias e gosta de ajudar os outros.",
};

export const EGOGRAM_OPTIONS: Array<{
  value: EgogramType;
  label: string;
  description: string;
}> = [
  {
    value: "CL",
    label: EGOGRAM_TYPES_DICT["CL"],
    description: EGOGRAM_TYPE_DESCRIPTIONS.CL,
  },
  {
    value: "CA",
    label: EGOGRAM_TYPES_DICT["CA"],
    description: EGOGRAM_TYPE_DESCRIPTIONS.CA,
  },
  {
    value: "A",
    label: EGOGRAM_TYPES_DICT["A"],
    description: EGOGRAM_TYPE_DESCRIPTIONS.A,
  },
  {
    value: "PC",
    label: EGOGRAM_TYPES_DICT["PC"],
    description: EGOGRAM_TYPE_DESCRIPTIONS.PC,
  },
  {
    value: "PA",
    label: EGOGRAM_TYPES_DICT["PA"],
    description: EGOGRAM_TYPE_DESCRIPTIONS.PA,
  },
];
