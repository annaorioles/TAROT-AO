'use client';

import { useState } from 'react';

type Card = {
  id: string;
  name: string;
  file: string;
  essence: string;
  light: string;
  shadow: string;
  advice: string;
  keywords?: string;
  slot?: number;
};

type Spread = {
  id: number;
  name: string;
  subtitle: string;
  positions: string[];
};

type SelectionMode = "card" | "position";

type Category = {
  name: string;
  questions: string[];
  recommended: number;
};

const majors: Card[] = [
  ["00","El Loco","00-el-loco.png","Inicio, libertad, aventura y salto hacia lo desconocido","Espontaneidad, confianza","Impulsividad o falta de rumbo","Atrévete a comenzar","inicio · libertad · aventura"],
  ["01","El Mago","01-el-mago.png","Acción, potencial y capacidad de crear y materializar","Iniciativa, habilidad, creatividad","Dispersión o manipulación","Utiliza lo que ya tienes","acción · potencial · creación"],
  ["02","La Sacerdotisa","02-la-sacerdotisa.png","Intuición, silencio y conocimiento interior","Sabiduría, percepción","Pasividad o secretos","Escucha tu intuición","intuición · misterio · conocimiento interior"],
  ["03","La Emperatriz","03-la-emperatriz.png","Creación, abundancia y fertilidad","Creatividad, amor, expansión","Dependencia o exceso","Nutre aquello que quieres hacer crecer","creación · abundancia · fertilidad"],
  ["04","El Emperador","04-el-emperador.png","Orden, estructura, autoridad y responsabilidad","Estabilidad, liderazgo","Rigidez o necesidad de controlar","Construye una estructura sólida","orden · estructura · autoridad"],
  ["05","El Sacerdote","05-el-sacerdote.png","Enseñanza, tradición y valores compartidos","Guía, aprendizaje","Dogma o conformismo","Busca conocimiento y orientación","enseñanza · tradición · valores"],
  ["06","Los Enamorados","06-los-enamorados.png","Elección, vínculo y coherencia con los valores","Amor, unión, decisión consciente","Duda o conflicto","Elige desde tus valores","elección · vínculo · decisión"],
  ["07","El Carro","07-el-carro.png","Movimiento, voluntad, dirección y conquista","Determinación, avance","Prisa o falta de control","Dirige tu energía hacia un objetivo","movimiento · voluntad · avance"],
  ["08","La Fuerza","08-la-fuerza.png","Poder interior, coraje sereno y dominio del impulso","Coraje, paciencia, confianza","Represión o inseguridad","La verdadera fuerza nace del equilibrio","coraje · autocontrol · poder interior"],
  ["09","El Ermitaño","09-el-ermitano.png","Introspección, búsqueda interior y sabiduría","Claridad, discernimiento","Aislamiento o distancia","Detente para encontrar tu propia respuesta","introspección · búsqueda · sabiduría"],
  ["10","La Rueda de la Fortuna","10-la-rueda-de-la-fortuna.png","Cambio, ciclos y giro de las circunstancias","Oportunidad, movimiento","Inestabilidad o resistencia","Acepta el cambio y adáptate","cambio · ciclos · movimiento"],
  ["11","La Justicia","11-la-justicia.png","Equilibrio, verdad, responsabilidad y consecuencias","Claridad, responsabilidad","Rigidez o juicio","Actúa con honestidad","equilibrio · verdad · responsabilidad"],
  ["12","El Colgado","12-el-colgado.png","Pausa, entrega y cambio de perspectiva","Nueva mirada, aceptación","Estancamiento o sacrificio inútil","Cambia tu perspectiva","pausa · perspectiva · entrega"],
  ["13","La Muerte","13-la-muerte.png","Transformación y cierre de una etapa","Renovación, liberación","Resistencia o miedo al cambio","Deja espacio para lo nuevo","transformación · cierre · renacimiento"],
  ["14","La Templanza","14-la-templanza.png","Integración, armonía y equilibrio","Equilibrio, sanación","Exceso o desequilibrio","Encuentra el punto medio","integración · armonía · paciencia"],
  ["15","El Diablo","15-el-diablo.png","Deseo, materia, instinto, apego y poder personal","Pasión, vitalidad, poder","Dependencia u obsesión","Reconoce aquello que te ata","deseo · apego · instinto"],
  ["16","La Torre","16-la-torre.png","Ruptura y revelación de una estructura que ya no sostiene","Liberación, verdad","Crisis o resistencia","Permite que caiga lo que ya no sostiene","ruptura · revelación · liberación"],
  ["17","La Estrella","17-la-estrella.png","Esperanza, inspiración, confianza y renovación","Fe, creatividad, renovación","Idealización o vulnerabilidad","Confía en el proceso","esperanza · inspiración · renovación"],
  ["18","La Luna","18-la-luna.png","Mundo emocional, inconsciente, intuición e incertidumbre","Imaginación, intuición","Miedo, confusión o ilusión","No confundas percepción con realidad","inconsciente · intuición · emociones"],
  ["19","El Sol","19-el-sol.png","Claridad, alegría, vitalidad y conciencia","Éxito, autenticidad","Ego o exceso de confianza","Muéstrate con claridad","claridad · alegría · vitalidad"],
  ["20","El Juicio","20-el-juicio.png","Despertar, llamada interior y revisión","Renacimiento, conciencia","Culpa o juicio excesivo","Escucha la llamada y responde","despertar · revisión · renacimiento"],
  ["21","El Mundo","21-el-mundo.png","Culminación, integración y realización","Plenitud, integración","Cierre incompleto","Reconoce lo conseguido y completa el ciclo","culminación · integración · realización"]
].map(([id,name,file,essence,light,shadow,advice,keywords]) => ({id,name,file,essence,light,shadow,advice,keywords}));

const minorRows = [
  ["22","As de Copas","22-as-de-copas.png","Nacimiento emocional, amor y apertura del corazón","Apertura emocional, amor, sentimiento nuevo","Bloqueo afectivo o cerrarse a sentir","Permite que tus emociones fluyan","emociones, vínculos y mundo afectivo"],
  ["23","Dos de Copas","23-dos-de-copas.png","Unión, reciprocidad y conexión","Encuentro, reciprocidad, vínculo","Dependencia o desequilibrio","Busca un vínculo equilibrado","emociones, vínculos y mundo afectivo"],
  ["24","Tres de Copas","24-tres-de-copas.png","Celebración, amistad y comunidad","Alegría, amistad, celebración","Dispersión o exceso social","Comparte la alegría","emociones, vínculos y mundo afectivo"],
  ["25","Cuatro de Copas","25-cuatro-de-copas.png","Introspección y apatía emocional","Contemplación y oportunidad de mirar hacia dentro","Desconexión o ignorar una oportunidad","Observa aquello que estás dejando pasar","emociones, vínculos y mundo afectivo"],
  ["26","Cinco de Copas","26-cinco-de-copas.png","Pérdida, tristeza y duelo","Aceptación y aprendizaje","Quedarse atrapado en la pérdida","Mira también lo que permanece","emociones, vínculos y mundo afectivo"],
  ["27","Seis de Copas","27-seis-de-copas.png","Recuerdos, infancia y nostalgia","Recuperar algo valioso del pasado","Idealizar el pasado o quedarse en él","Recupera algo valioso del pasado sin quedarte en él","emociones, vínculos y mundo afectivo"],
  ["28","Siete de Copas","28-siete-de-copas.png","Opciones, imaginación e ilusiones","Creatividad y apertura de posibilidades","Confusión o fantasía sin realidad","Distingue deseo de realidad","emociones, vínculos y mundo afectivo"],
  ["29","Ocho de Copas","29-ocho-de-copas.png","Alejarse de algo que ya no satisface","Búsqueda de sentido y evolución emocional","Aferrarse a lo conocido o huir sin comprender","Busca aquello que tiene verdadero sentido","emociones, vínculos y mundo afectivo"],
  ["30","Nueve de Copas","30-nueve-de-copas.png","Satisfacción y deseo cumplido","Placer, satisfacción y disfrute","Complacencia o exceso","Disfruta lo conseguido","emociones, vínculos y mundo afectivo"],
  ["31","Diez de Copas","31-diez-de-copas.png","Plenitud afectiva y armonía familiar","Felicidad emocional, familia, plenitud","Idealizar la armonía o depender de ella","Construye vínculos basados en autenticidad","emociones, vínculos y mundo afectivo"],
  ["32","Sota de Copas","32-sota-de-copas.png","Sensibilidad, intuición y mensaje emocional","Curiosidad emocional, apertura","Inmadurez o hipersensibilidad","Permanece abierto a sentir","emociones, vínculos y mundo afectivo"],
  ["33","Caballero de Copas","33-caballero-de-copas.png","Romanticismo, propuesta y movimiento emocional","Expresión afectiva, propuesta","Idealización o impulso emocional","Expresa lo que sientes","emociones, vínculos y mundo afectivo"],
  ["34","Reina de Copas","34-reina-de-copas.png","Empatía, profundidad y sensibilidad","Comprensión emocional y cuidado","Absorber emociones ajenas o desbordarse","Cuida tus emociones sin absorber las de otros","emociones, vínculos y mundo afectivo"],
  ["35","Rey de Copas","35-rey-de-copas.png","Madurez emocional y equilibrio","Serenidad, comprensión y dominio emocional","Contención excesiva o distancia emocional","Siente profundamente y actúa con serenidad","emociones, vínculos y mundo afectivo"],
  ["36","As de Espadas","36-as-de-espadas.png","Claridad, verdad y decisión","Claridad mental, verdad","Dureza o cortar sin integrar","Corta la confusión con una verdad clara","pensamiento, verdad y conflicto mental"],
  ["37","Dos de Espadas","37-dos-de-espadas.png","Indecisión y bloqueo","Pausa para reunir información","Evitar decidir o cerrar los ojos","Permite que la información te ayude a decidir","pensamiento, verdad y conflicto mental"],
  ["38","Tres de Espadas","38-tres-de-espadas.png","Dolor, separación y verdad difícil","Reconocer la verdad y comenzar a integrar","Quedarse en la herida","Reconoce la herida para poder integrarla","pensamiento, verdad y conflicto mental"],
  ["39","Cuatro de Espadas","39-cuatro-de-espadas.png","Descanso, pausa y recuperación","Recuperación y perspectiva","Aislamiento prolongado o evitar actuar","Detenerse también forma parte del proceso","pensamiento, verdad y conflicto mental"],
  ["40","Cinco de Espadas","40-cinco-de-espadas.png","Conflicto y victoria con coste","Aprender de un conflicto y elegir batallas","Enfrentamiento innecesario","Decide qué batallas merecen tu energía","pensamiento, verdad y conflicto mental"],
  ["41","Seis de Espadas","41-seis-de-espadas.png","Transición y desplazamiento hacia aguas más tranquilas","Cambio y transición","Aferrarse a una etapa agotada","Permite que el cambio te lleve hacia una nueva etapa","pensamiento, verdad y conflicto mental"],
  ["42","Siete de Espadas","42-siete-de-espadas.png","Estrategia, discreción y autonomía","Inteligencia estratégica y autonomía","Ocultación, evasión o falta de transparencia","Actúa con inteligencia y transparencia","pensamiento, verdad y conflicto mental"],
  ["43","Ocho de Espadas","43-ocho-de-espadas.png","Sensación de limitación mental","Cuestionar las creencias que limitan","Sentirse atrapado sin revisar las propias creencias","Revisa las creencias que están condicionando tus opciones","pensamiento, verdad y conflicto mental"],
  ["44","Nueve de Espadas","44-nueve-de-espadas.png","Preocupación, ansiedad y pensamientos repetitivos","Tomar conciencia de los pensamientos","Anticipación y escenarios mentales repetitivos","Separa los hechos de los escenarios mentales","pensamiento, verdad y conflicto mental"],
  ["45","Diez de Espadas","45-diez-de-espadas.png","Final de una etapa dolorosa","Liberación y nuevo comienzo","Resistirse al cierre o identificarse con el dolor","Acepta el cierre","pensamiento, verdad y conflicto mental"],
  ["46","Sota de Espadas","46-sota-de-espadas.png","Curiosidad, observación y comunicación","Investigación y aprendizaje","Impulsividad verbal o mirar sin comprender","Pregunta, investiga y aprende","pensamiento, verdad y conflicto mental"],
  ["47","Caballero de Espadas","47-caballero-de-espadas.png","Acción mental rápida","Determinación y decisión","Precipitación o confrontación","Piensa antes de actuar","pensamiento, verdad y conflicto mental"],
  ["48","Reina de Espadas","48-reina-de-espadas.png","Claridad, independencia y discernimiento","Lucidez y límites sanos","Frialdad o exceso de distancia","Establece límites desde la verdad","pensamiento, verdad y conflicto mental"],
  ["49","Rey de Espadas","49-rey-de-espadas.png","Razón, autoridad intelectual y justicia","Lógica, perspectiva y decisión","Rigidez intelectual o abuso de autoridad","Decide con lógica y perspectiva","pensamiento, verdad y conflicto mental"],
  ["50","As de Bastos","50-as-de-bastos.png","Nacimiento de una energía creativa","Inspiración, entusiasmo, oportunidad","Impulso sin dirección","Empieza; la energía está disponible","energía, deseo, acción y creatividad"],
  ["51","Dos de Bastos","51-dos-de-bastos.png","Planificación y visión","Estrategia y expansión","Quedarse pensando sin decidir","Mira más lejos y decide tu dirección","energía, deseo, acción y creatividad"],
  ["52","Tres de Bastos","52-tres-de-bastos.png","Expansión","Crecimiento y resultados futuros","Esperar demasiado","Confía en lo que has puesto en marcha","energía, deseo, acción y creatividad"],
  ["53","Cuatro de Bastos","53-cuatro-de-bastos.png","Celebración y estabilidad","Hogar, comunidad y alegría","Acomodamiento","Celebra los logros","energía, deseo, acción y creatividad"],
  ["54","Cinco de Bastos","54-cinco-de-bastos.png","Competencia y fricción","Estímulo y aprendizaje","Conflicto innecesario","Convierte la fricción en energía creativa","energía, deseo, acción y creatividad"],
  ["55","Seis de Bastos","55-seis-de-bastos.png","Reconocimiento","Éxito y confianza","Necesidad de aprobación","Reconoce tu propio avance","energía, deseo, acción y creatividad"],
  ["56","Siete de Bastos","56-siete-de-bastos.png","Defender una posición","Valentía y perseverancia","Estar siempre a la defensiva","Protege aquello que realmente importa","energía, deseo, acción y creatividad"],
  ["57","Ocho de Bastos","57-ocho-de-bastos.png","Velocidad y movimiento","Noticias, avance y comunicación","Precipitación","Aprovecha el impulso","energía, deseo, acción y creatividad"],
  ["58","Nueve de Bastos","58-nueve-de-bastos.png","Resistencia","Perseverancia y experiencia","Agotamiento o desconfianza","Estás cerca; administra tus fuerzas","energía, deseo, acción y creatividad"],
  ["59","Diez de Bastos","59-diez-de-bastos.png","Carga y responsabilidad","Compromiso y capacidad","Sobrecarga","Aprende a delegar","energía, deseo, acción y creatividad"],
  ["60","Sota de Bastos","60-sota-de-bastos.png","Curiosidad y descubrimiento","Entusiasmo y aventura","Inmadurez","Explora y aprende","energía, deseo, acción y creatividad"],
  ["61","Caballero de Bastos","61-caballero-de-bastos.png","Acción apasionada","Valentía y dinamismo","Impulsividad","Avanza, pero dirige tu fuego","energía, deseo, acción y creatividad"],
  ["62","Reina de Bastos","62-reina-de-bastos.png","Confianza y magnetismo","Creatividad e independencia","Orgullo o intensidad","Ocupa tu espacio con autenticidad","energía, deseo, acción y creatividad"],
  ["63","Rey de Bastos","63-rey-de-bastos.png","Liderazgo creativo","Visión e iniciativa","Autoritarismo","Lidera inspirando","energía, deseo, acción y creatividad"],
  ["64","As de Oros","64-as-de-oros.png","Nueva oportunidad material","Oportunidad concreta y recursos","Dejar pasar la oportunidad o no materializarla","Convierte la oportunidad en algo concreto","materia, recursos, cuerpo y construcción"],
  ["65","Dos de Oros","65-dos-de-oros.png","Adaptación y equilibrio práctico","Flexibilidad y gestión de recursos","Desorden o intentar sostener demasiado","Organiza tus recursos","materia, recursos, cuerpo y construcción"],
  ["66","Tres de Oros","66-tres-de-oros.png","Trabajo conjunto y aprendizaje","Colaboración y desarrollo de habilidades","Trabajar aislado o no valorar la colaboración","Construye con otros","materia, recursos, cuerpo y construcción"],
  ["67","Cuatro de Oros","67-cuatro-de-oros.png","Seguridad y conservación","Protección y estabilidad","Apego y miedo a perder","Protege sin encerrarte","materia, recursos, cuerpo y construcción"],
  ["68","Cinco de Oros","68-cinco-de-oros.png","Carencia y sensación de exclusión","Buscar apoyo y reconocer recursos disponibles","Aislamiento o asumir que no hay salida","Busca apoyo y recursos disponibles","materia, recursos, cuerpo y construcción"],
  ["69","Seis de Oros","69-seis-de-oros.png","Dar, recibir y reciprocidad","Generosidad e intercambio equilibrado","Dependencia o desequilibrio entre dar y recibir","Equilibra generosidad y autonomía","materia, recursos, cuerpo y construcción"],
  ["70","Siete de Oros","70-siete-de-oros.png","Paciencia y evaluación","Observar el crecimiento y valorar resultados","Impaciencia o abandonar demasiado pronto","Observa qué está creciendo antes de decidir el siguiente paso","materia, recursos, cuerpo y construcción"],
  ["71","Ocho de Oros","71-ocho-de-oros.png","Trabajo, práctica y perfeccionamiento","Constancia y desarrollo de maestría","Perfeccionismo o trabajar sin sentido","La maestría nace de la constancia","materia, recursos, cuerpo y construcción"],
  ["72","Nueve de Oros","72-nueve-de-oros.png","Independencia y prosperidad","Autonomía, disfrute y prosperidad","Aislamiento o medir el valor solo por lo material","Disfruta aquello que has construido","materia, recursos, cuerpo y construcción"],
  ["73","Diez de Oros","73-diez-de-oros.png","Patrimonio, familia y estabilidad a largo plazo","Abundancia, legado y estabilidad","Aferrarse al patrimonio o a expectativas familiares","Piensa en lo que quieres dejar construido","materia, recursos, cuerpo y construcción"],
  ["74","Sota de Oros","74-sota-de-oros.png","Aprendizaje práctico y oportunidad","Estudio, curiosidad y oportunidad","Inexperiencia o falta de continuidad","Estudia y experimenta","materia, recursos, cuerpo y construcción"],
  ["75","Caballero de Oros","75-caballero-de-oros.png","Constancia, responsabilidad y progreso lento","Fiabilidad y progreso sostenido","Lentitud excesiva o rigidez","Avanza paso a paso","materia, recursos, cuerpo y construcción"],
  ["76","Reina de Oros","76-reina-de-oros.png","Cuidado, abundancia y practicidad","Bienestar, cuidado y recursos","Sobreproteger o cargar con todo","Crea bienestar tangible","materia, recursos, cuerpo y construcción"],
  ["77","Rey de Oros","77-rey-de-oros.png","Estabilidad, experiencia y prosperidad","Administración, seguridad y visión","Control material o identificación con el poder","Administra tus recursos con visión de futuro","materia, recursos, cuerpo y construcción"]
] as const;

const minors: Card[] = minorRows.map(([id,name,file,essence,light,shadow,advice,keywords]) => ({
  id,name,file,essence,light,shadow,advice,keywords
}));

const cards: Card[] = [...majors,...minors];
// Las cartas se seleccionan y se renderizan desde deckOrder, sin un segundo estado de selección.

function imageSources(card: Card){
  const sources = [
    `/cards/${card.file}`,
    `/${card.file}`,
  ];

  // Fallbacks for the two filenames that have caused path/name mismatches.
  if (card.id === "09") {
    sources.push(
      "/cards/09-el-ermitano.png", "/09-el-ermitano.png",
      "/cards/09-el-ermitaño.png", "/09-el-ermitaño.png",
      "/cards/el-ermitano.png", "/el-ermitano.png",
      "/cards/el-ermitaño.png", "/el-ermitaño.png"
    );
  }
  if (card.id === "44") {
  sources.push(
    "/cards/44-nueve-de-espada.png",
    "/44-nueve-de-espada.png",
    "/cards/nueve-de-espada.png",
    "/nueve-de-espada.png"
  );
}
  if (card.id === "29") {
    sources.push("/cards/ocho-de-copas.png", "/ocho-de-copas.png");
    sources.push("/cards/29-ocho-de-copas.jpg", "/29-ocho-de-copas.jpg");
  }
  if (card.id === "53") {
    sources.push(
      "/cards/53-cuatro-de-bastos.jpg",
      "/53-cuatro-de-bastos.jpg",
      "/cards/cuatro-de-bastos.png",
      "/cuatro-de-bastos.png",
      "/cards/cuatro-de-bastos.jpg",
      "/cuatro-de-bastos.jpg"
    );
  }

  return [...new Set(sources)];
}

function CardImage({card, className, alt}:{card:Card; className?:string; alt:string}){
  const sources = imageSources(card);
  const [sourceIndex, setSourceIndex] = useState(0);

  return (
    <img
      className={className}
      src={sources[sourceIndex]}
      alt={alt}
      style={{
        display:"block",
        width:"100%",
        height:"100%",
        objectFit:"cover",
        objectPosition:"center",
        borderRadius:"inherit"
      }}
      onError={() => {
        setSourceIndex(index => Math.min(index + 1, sources.length - 1));
      }}
    />
  );
}

const spreads: Spread[] = [
  {id:1,name:"1 carta",subtitle:"mensaje",positions:["lo esencial ahora"]},
  {id:2,name:"2 cartas",subtitle:"situación / orientación",positions:["situación","orientación"]},
  {id:3,name:"3 cartas",subtitle:"",positions:["origen","presente","tendencia"]},
  {id:5,name:"5 cartas",subtitle:"lectura profunda",positions:["dinámica","en juego","lo no dicho","dirección","clave"]},
  {id:7,name:"7 cartas",subtitle:"lectura profesional",positions:["contexto","tensión","deseo","miedo","camino","clave","síntesis"]}
];

const threeCardVariants = [
  {id:0, label:"origen / presente / tendencia", positions:["origen","presente","tendencia"]},
  {id:1, label:"yo / el otro / el vínculo", positions:["yo","el otro","el vínculo"]},
  {id:2, label:"qué siente / qué piensa / qué intenciones", positions:["qué siente","qué piensa","qué intenciones"]}
];

const categories: Category[] = [
  {name:"Amor y relaciones",recommended:3,questions:[
    "¿Qué necesito comprender sobre mi relación y hacia dónde se está moviendo?",
    "¿Qué piensa esta persona sobre nuestra situación?",
    "¿Qué siente esta persona respecto a mí y al vínculo?",
    "¿Qué intenciones muestra esta persona en relación con el vínculo?",
    "¿Qué está ocurriendo realmente entre nosotros?",
    "¿Qué necesito ver con claridad sobre este vínculo?"
  ]},
  {name:"Una decisión",recommended:5,questions:[
    "¿Qué necesito ver con claridad antes de tomar esta decisión?",
    "¿Qué estoy evitando considerar en esta elección?",
    "¿Qué me ayudará a elegir de forma coherente conmigo?",
    "¿Qué diferencia realmente los dos caminos que tengo delante?"
  ]},
  {name:"Trabajo y propósito",recommended:3,questions:[
    "¿Qué está pidiendo transformarse en mi vida profesional?",
    "¿Dónde está mi energía más fértil ahora?",
    "¿Qué necesito comprender sobre mi próximo paso profesional?"
  ]},
  {name:"Crecimiento personal",recommended:3,questions:[
    "¿Qué patrón necesito reconocer para avanzar?",
    "¿Qué parte de mí necesita atención en este momento?",
    "¿Qué aprendizaje está intentando abrirse paso?"
  ]},
  {name:"Pregunta libre",recommended:3,questions:[
    "¿Qué necesito comprender de la situación que estoy viviendo?",
    "¿Qué no estoy viendo todavía con suficiente claridad?",
    "¿Qué pregunta debería hacerme ahora?"
  ]}
];

export default function Home(){
  const shuffleCards = () => {
    const order = [...cards];
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  };
  const [cat, setCat] = useState(0);
  const [question, setQuestion] = useState(categories[0].questions[0]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [spread, setSpread] = useState(3);
  const [threeCardVariant, setThreeCardVariant] = useState(1);
  // ÚNICA FUENTE DE VERDAD:
  // deckOrder contiene las 78 cartas, su orden actual y, si están giradas,
  // la posición exacta que ocupan en la tirada.
  // La mesa superior, las marcas de la baraja y la lectura nacen de este mismo estado.
  const [reading, setReading] = useState(false);
  const [started, setStarted] = useState(false);

  const makeDeck = () =>
    shuffleCards().map(card => ({...card, slot: undefined}));

  const [deckOrder, setDeckOrder] = useState<Card[]>(() => cards.map(card => ({...card, slot: undefined})));

  const baseSpread = spreads.find(s => s.id === spread)!;
  const current = spread === 3
    ? {...baseSpread, subtitle: threeCardVariants[threeCardVariant].label, positions: threeCardVariants[threeCardVariant].positions}
    : baseSpread;
  const count = current.positions.length;
  const effectiveQuestion = customQuestion.trim() || question;

  // Las cartas elegidas se leen DIRECTAMENTE del mismo deckOrder.
  const selected = deckOrder
    .filter(card => card.slot != null)
    .sort((a,b) => (a.slot as number) - (b.slot as number))
    .slice(0, count);

  // Invariante de producto: una posición solo puede pertenecer a una carta
  // y una carta solo puede tener una posición. Si este estado se rompe,
  // el problema queda detectado en consola en lugar de producir una lectura falsa.
  if (process.env.NODE_ENV !== "production") {
    const slots = selected.map(card => card.slot);
    const uniqueSlots = new Set(slots);
    if (slots.length !== uniqueSlots.size || selected.length > count) {
      console.error("CARTAS: estado de tirada inválido", {selected, count});
    }
  }

  const selectedFilled = selected;
  const picked = selectedFilled;
  const [zoomCard, setZoomCard] = useState<Card | null>(null);
  const [selectionMode, setSelectionMode] = useState<SelectionMode>("card");
  const [selectionNotice, setSelectionNotice] = useState("");

  function freshDeck(){
    return makeDeck();
  }

  function resetDeck(){
    setDeckOrder(cards.map(card => ({...card, slot: undefined})));
    setReading(false);
    setStarted(false);
    setZoomCard(null);
    setSelectionMode("card");
    setSelectionNotice("");
  }

  function startReading(){
    setDeckOrder(makeDeck());
    setStarted(true);
    setReading(false);
    setZoomCard(null);
    setSelectionMode("card");
    setSelectionNotice("");
  }

  function selectCat(i:number){
    setCat(i);
    setQuestion(categories[i].questions[0]);
    setCustomQuestion("");
    setSpread(categories[i].recommended);
    setThreeCardVariant(i === 0 ? 1 : 0);
    setDeckOrder(cards.map(card => ({...card, slot: undefined})));
    setReading(false);
    setStarted(false);
    setZoomCard(null);
    setSelectionMode("card");
    setSelectionNotice("");
  }

  // Este es el único mecanismo de selección.
  // La carta pulsada conserva su posición dentro de la baraja y recibe un slot.
  // La misma carta/slot alimenta arriba, abajo y la lectura.
  function choose(card:Card){
    if(reading) return;

    setDeckOrder(order => {
      const clicked = order.find(item => item.id === card.id);
      if(!clicked) return order;

      // Si ya está girada, la quitamos y compactamos las posiciones.
      if(clicked.slot != null){
        const removedSlot = clicked.slot;
        return order.map(item => {
          if(item.id === card.id) return {...item, slot: undefined};
          if(item.slot != null && item.slot > removedSlot) {
            return {...item, slot: item.slot - 1};
          }
          return item;
        });
      }

      // Si aún quedan posiciones libres, esta carta ocupa la siguiente.
      const selectedCount = order.filter(item => item.slot != null).length;
      if(selectedCount >= count) return order;

      const nextSlot = selectedCount + 1;

      return order.map(item =>
        item.id === card.id
          ? {...item, slot: nextSlot}
          : item
      );
    });
  }

  function chooseByPosition(position:number){
    if(!started || reading || selectionMode !== "position") return;
    if(position < 1 || position > 78) return;

    const card = deckOrder[position - 1];
    if(!card) return;

    const alreadySelected = card.slot != null;
    if(!alreadySelected && picked.length >= count) return;

    choose(card);
    setSelectionNotice(
      alreadySelected
        ? `Has quitado la posición ${String(position).padStart(2,"0")}.`
        : `Has marcado la posición ${String(position).padStart(2,"0")}.`
    );
  }

  function changeCardAt(index:number){
    if(reading) return;

    setDeckOrder(order =>
      order.map(item => {
        if(item.slot === index + 1) return {...item, slot: undefined};
        if(item.slot != null && item.slot > index + 1) {
          return {...item, slot: item.slot - 1};
        }
        return item;
      })
    );
  }

  function random(){
    // Tirada al Azar: baraja de nuevo y asigna las primeras posiciones.
    const order = shuffleCards().map((card, index) => ({
      ...card,
      slot: index < count ? index + 1 : undefined
    }));
    setDeckOrder(order);
    setStarted(true);
    setReading(false);
    setZoomCard(null);
    setSelectionMode("card");
    setSelectionNotice("");
  }

  function interpret(){
    if(picked.length === count) {
      setReading(true);
      requestAnimationFrame(() => document.getElementById("lectura")?.scrollIntoView({behavior:"smooth", block:"start"}));
    }
  }

  function cardArea(c:Card){
    if(c.id.length && Number(c.id) < 22) return "Arcano Mayor";
    const n = Number(c.id);
    if(n < 36) return "Copas";
    if(n < 50) return "Espadas";
    if(n < 64) return "Bastos";
    return "Oros";
  }

  function cardMeaning(c:Card){
    return `Por sí sola, ${c.name} habla de ${c.essence.toLowerCase()}.`;
  }

  function directAnswer(c:Card, i:number){
    const position = current.positions[i];
    const q = effectiveQuestion.toLowerCase();

    if(position === "tendencia"){
      return `En la tendencia, ${c.name} señala ${c.essence.toLowerCase()}. Si la dinámica actual continúa, puede expresarse como ${c.light.toLowerCase()}. No es un resultado cerrado: muestra una dirección posible.`;
    }

    if(position === "orientación"){
      return `Como orientación para tu pregunta, ${c.name} te propone ${c.advice.toLowerCase()}.`;
    }

    if(position === "clave"){
      return `Como clave, ${c.name} concentra el mensaje en ${c.essence.toLowerCase()}. La acción que propone es clara: ${c.advice.toLowerCase()}.`;
    }

    const relational = /amor|relación|vínculo|pareja|siente|persona/.test(q);

    if(relational){
      return `En «${position}», ${c.name} pone el foco en ${c.essence.toLowerCase()}. Mira cómo esta energía aparece realmente en el vínculo y qué diferencia hay entre lo que observas y lo que imaginas.`;
    }

    return `En «${position}», ${c.name} pone el foco en ${c.essence.toLowerCase()}. Para tu pregunta, observa dónde aparece ${c.light.toLowerCase()} y qué parte de ${c.shadow.toLowerCase()} necesita atención.`;
  }

  function synthesis(){
    if (!selected.length) return "Elige las cartas para construir tu lectura.";

    const first = selected[0];
    const last = selected[selected.length - 1];
    const names = selected.map(c => c.name).join(" → ");
    const questionText = effectiveQuestion.toLowerCase();
    const relational = /relación|vínculo|pareja|amor|persona/.test(questionText);

    if(relational){
      return `Tu pregunta es «${effectiveQuestion}». La secuencia ${names} muestra distintas capas de la situación. ${first.name} abre el tema con ${first.essence.toLowerCase()} y ${last.name} lo lleva hacia ${last.essence.toLowerCase()}. La lectura simbólica te ayuda a distinguir lo que sientes, lo que observas y lo que necesitas hablar o decidir.`;
    }

    return `Para «${effectiveQuestion}», la secuencia ${names} va de ${first.essence.toLowerCase()} hacia ${last.essence.toLowerCase()}. La lectura muestra el proceso que aparece ahora y qué puedes hacer con él, sin convertir la tendencia en un resultado inevitable.`;
  }

  function evolutionaryReading(){
    if (!selected.length) return "Cuando elijas las cartas, aquí aparecerá la mirada evolutiva.";

    const lessons = selected.map(c => c.advice.toLowerCase());
    return `Desde una mirada evolutiva, la tirada te invita a comprender esta secuencia: ${lessons.join(" · ")}. El aprendizaje está en reconocer qué te muestra cada carta y qué puedes transformar conscientemente en tu manera de actuar.`;
  }

  function spreadReading(){
    if (!selected.length) return "Elige las cartas para obtener la interpretación de la tirada.";

    const pieces = selected.map((c,i) =>
      `${current.positions[i]}: ${c.name} aporta ${c.essence.toLowerCase()}`
    );

    return `La interpretación conjunta conecta ${pieces.join("; ")}. Las cartas no se leen como frases aisladas: la posición modifica su sentido y la pregunta da dirección a todo el conjunto.`;
  }

  function practicalKey(){
    const lead = selected[0];
    const end = selected[selected.length-1];

    if (!lead || !end) return "Elige las cartas para obtener una clave práctica.";

    return `Quédate con esto: ${lead.advice}. Después, observa qué te pide ${end.name} y conviértelo en un paso concreto que dependa de ti.`;
  }

  function shareUrl(){
    if (typeof window === "undefined") return "";
    const ids = selected.map(c => c.id).join("-");
    return `${window.location.origin}/compartir/${ids}?q=${encodeURIComponent(effectiveQuestion)}`;
  }

  function shareText(){
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = shareUrl();

    const lines = [
      "Tarot AO · Anna Oriol",
      `Pregunta: ${effectiveQuestion}`,
      `Tirada: ${current.name} — ${current.positions.join(" / ")}`,
      "",
      `Ver mi lectura: ${url}`,
      "",
      "CARTAS",
      ...selected.map((card, i) =>
        `${i+1}. ${current.positions[i]}: ${card.name}
Significado: ${card.essence}
Luz: ${card.light}
Sombra: ${card.shadow}
Consejo: ${card.advice}`
      ),
      "",
      "RESPUESTA A TU PREGUNTA",
      synthesis(),
      "",
      "INTERPRETACIÓN DE LA TIRADA",
      spreadReading(),
      "",
      "MIRADA EVOLUTIVA",
      evolutionaryReading(),
      "",
      "CLAVE PARA LLEVARLO A TU VIDA",
      practicalKey(),
      "",
      "Lectura simbólica para la reflexión personal."
    ];

    return lines.join("\n");
  }

  async function shareReading(){
    const url = shareUrl();
    const text = shareText();

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({title:"Tarot AO · Mi tirada", text, url});
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }

    const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappBase = isMobile
      ? "https://api.whatsapp.com/send?text="
      : "https://web.whatsapp.com/send?text=";
    window.open(`${whatsappBase}${encodeURIComponent(`Mira mi lectura de Tarot AO\n${url}`)}`, "_blank", "noopener,noreferrer");
  }

  return <main className="appShell">
    <header className="topbar">
      <a className="brand" href="#inicio" aria-label="Tarot AO, Anna Oriol, inicio">
        <span className="brandName">TAROT AO</span>
        <span className="brandSignature">
          <span className="brandMark"><img src="/ao-logo.png" alt="AO" /></span>
          <span className="brandByline">ANNA ORIOL</span>
        </span>
      </a>
      <div className="headerRight">
        <div className="headerMeta">TAROT INTERACTIVO · 78 CARTAS</div>
        <div className="headerSubmeta">VIDA · SALUD · AUTOCONOCIMIENTO · PSICOLOGÍA</div>
      </div>
    </header>

    <section className="hero sectionBlock" id="inicio">
      <div className="heroCopy">
        <div className="eyebrow">TAROT AO · UN ESPACIO PARA MIRARTE</div>
        <h1>Preguntas que<br/><span>iluminan tu camino.</span></h1>
        <p className="heroIntro">Un espacio de tarot simbólico para explorar la vida cotidiana, el bienestar, el autoconocimiento y la psicología desde nuevas perspectivas.</p>
      </div>
      <div className="heroArtwork" aria-hidden="true">
        <img src="/portada.png" alt="" />
      </div>

      <div className="categories" role="tablist" aria-label="Temas">
        {categories.map((c,i) => <button className={cat===i ? "category active" : "category"} onClick={()=>selectCat(i)} key={c.name}>{c.name}</button>)}
      </div>

      <div className="questionPanel">
        <div className="label">Preguntas para empezar</div>
        <div className="questionList">
          {categories[cat].questions.map(q => <button className={question===q && !customQuestion.trim() ? "qoption active" : "qoption"} onClick={()=>{
  setQuestion(q);
  setCustomQuestion("");
  const nq = q.toLowerCase();
  if(nq.includes("siente") || nq.includes("piensa") || nq.includes("intenciones")) {
    setSpread(3);
    setThreeCardVariant(2);
    setDeckOrder(cards.map(card => ({...card, slot: undefined})));
    setReading(false);
    setStarted(false);
  } else if (cat === 0) {
    setSpread(3);
    setThreeCardVariant(1);
    setDeckOrder(cards.map(card => ({...card, slot: undefined})));
    setReading(false);
    setStarted(false);
  }
}} key={q}>{q}</button>)}
        </div>
        <div className="customQuestion">
          <div className="label">Tu propia pregunta <span>· opcional</span></div>
          <textarea value={customQuestion} placeholder="Escribe aquí tu pregunta..." onChange={e=>setCustomQuestion(e.target.value)} />
        </div>
      </div>
      <div className="questionEcho">“{effectiveQuestion}”</div>
    </section>

    <section className="sectionBlock spreadSection">
      <div className="eyebrow">02 · La tirada</div>
      <div className="sectionHeading"><div><h2>Elige la forma de mirar.</h2><p>La propuesta se adapta a tu pregunta, pero tú decides.</p></div></div>
      <div className="spreads">
        {spreads.map(s => s.id === 3 ? (
          <button
            key={s.id}
            className={spread===3 ? "spread active" : "spread"}
            onClick={()=>{setSpread(3);setDeckOrder(cards.map(card => ({...card, slot: undefined})));setReading(false);setStarted(false);setZoomCard(null);}}
            type="button"
          >
            <strong>3 cartas</strong>
            <span>elige una de las tres formas de mirar</span>
          </button>
        ) : (
          <button className={spread===s.id ? "spread active" : "spread"} onClick={()=>{setSpread(s.id);setDeckOrder(cards.map(card => ({...card, slot: undefined})));setReading(false);setStarted(false);setZoomCard(null);}} key={s.id} type="button">
            <strong>{s.name}</strong>
            <span>{s.subtitle}</span>
          </button>
        ))}
      </div>
      {spread === 3 && (
        <div className="threeVariants" aria-label="Opciones de la tirada de 3 cartas">
          {threeCardVariants.map(v => (
            <button
              type="button"
              key={v.id}
              className={threeCardVariant===v.id ? "threeVariant active" : "threeVariant"}
              onClick={()=>{setThreeCardVariant(v.id);setDeckOrder(cards.map(card => ({...card, slot: undefined})));setReading(false);setStarted(false);setZoomCard(null);}}
            >
             <span className="variantNumber">{v.id+1}</span>
              <b>{v.label}</b>
            </button>
          ))}
        </div>
      )}
    </section>

    <section className="sectionBlock tableSection" id="mesa">
     
      <div className="selectionArea">
      <div className="selectedSpread" aria-label="Tu tirada">
        {current.positions.map((position,i) => {
          const card = selected[i] ?? undefined;
          return <div className={card ? "drawSlot filled" : "drawSlot"} key={position}>
            <div className="drawTop"><span>{String(i+1).padStart(2,"0")}</span><b>{position}</b></div>
            <button
              className="drawCard"
              type="button"
              disabled={!card}
              onClick={() => card && setZoomCard(card)}
              aria-label={card ? `Ampliar ${card.name}` : "Elige una carta"}
            >
              {card ? (
                <>
                  <CardImage card={card} alt={card.name}/>
                  
                </>
              ) : (
                <div className="emptyBack"><i>✦</i></div>
              )}
            </button>
            <div className="drawName">
              {card ? card.name : ""}
            </div>
          </div>;
        })}
      </div>
 <div className="eyebrow">03 · La mesa</div>
      <div className="pickHeader">
        <div><h2>{started ? "Elige tus cartas." : "Contempla la baraja."}</h2><p>{started ? "Toca una carta para incorporarla a la tirada y construir tu lectura." : "Las 78 cartas se muestran de cara. Cuando pulses Iniciar tirada, se mezclarán y podrás elegir."}</p></div>
        <div className="counter"><b>{picked.length}</b><span>/ {count}</span></div>
      </div>
        {started && (
          <div className="selectionMethod" style={{margin:"18px 0 12px"}}>
            <div style={{fontWeight:800, marginBottom:"10px"}}>¿Cómo quieres escoger tus cartas?</div>

            <div style={{display:"flex", flexWrap:"wrap", gap:"10px", alignItems:"center"}}>
              <button
                className={selectionMode === "card" ? "primary" : "secondary"}
                type="button"
                onClick={() => {
                  setDeckOrder(order => order.map(item => ({...item, slot:undefined})));
                  setSelectionMode("card");
                  setSelectionNotice("");
                }}
                disabled={false}
              >
                👁️ POR VISTA
              </button>

              <button
                className={selectionMode === "position" ? "primary" : "secondary"}
                type="button"
                onClick={() => {
                  setDeckOrder(order => order.map(item => ({...item, slot:undefined})));
                  setSelectionMode("position");
                  setSelectionNotice("");
                }}
              >
                🔢 POR NÚMERO
              </button>
            </div>

            {selectionMode === "card" ? (
              <p style={{margin:"10px 0 0", opacity:0.72, fontSize:"0.92rem"}}>
                La baraja ya está mezclada. Pulsa las cartas que quieras elegir.
              </p>
            ) : (
              <div style={{margin:"16px 0 0"}}>
                <div style={{fontWeight:700, marginBottom:"10px"}}>
                  Marca exactamente {count === 1 ? "1 número" : `${count} números`}.
                </div>
                <div
                  role="group"
                  aria-label={`Selecciona ${count} posiciones entre 1 y 78`}
                  style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(13, minmax(34px, 1fr))",
                    gap:"6px",
                    maxWidth:"760px"
                  }}
                >
                  {Array.from({length:78}, (_, index) => {
                    const position = index + 1;
                    const selectedAtPosition = deckOrder[position - 1]?.slot != null;
                    return (
                      <button
                        key={position}
                        type="button"
                        aria-pressed={selectedAtPosition}
                        aria-label={`Posición ${position}${selectedAtPosition ? ", seleccionada" : ""}`}
                        onClick={() => chooseByPosition(position)}
                        disabled={!selectedAtPosition && picked.length >= count}
                        style={{
                          minHeight:"40px",
                          border:"1px solid currentColor",
                          borderRadius:"7px",
                          background:selectedAtPosition ? "currentColor" : "transparent",
                          color:selectedAtPosition ? "var(--bg, #fff)" : "inherit",
                          cursor:(!selectedAtPosition && picked.length >= count) ? "not-allowed" : "pointer",
                          fontWeight:700,
                          opacity:(!selectedAtPosition && picked.length >= count) ? 0.35 : 1
                        }}
                      >
                        {String(position).padStart(2,"0")}
                      </button>
                    );
                  })}
                </div>
                <p style={{margin:"10px 0 0", opacity:0.72, fontSize:"0.9rem"}}>
                  Solo aparecen los números. Las cartas permanecen ocultas. Cada número corresponde a una posición de la baraja después de barajar.
                </p>
              </div>
            )}

            {selectionNotice && (
              <div role="status" style={{marginTop:"9px", fontSize:"0.9rem", fontWeight:600}}>
                {selectionNotice}
              </div>
            )}
          </div>
        )}
        <div className="actions actionsCentered">
          {!started && <button className="primary" type="button" onClick={startReading}>Iniciar tirada</button>}
          <button className="secondary shuffleButton" onClick={startReading}>Mezclar</button>
          <button className="primary" disabled={picked.length!==count} onClick={interpret}>Ver mi lectura</button>
          <button className="secondary" onClick={random}>Tirada al Azar</button>
          <button className="textButton" onClick={resetDeck}>Nueva lectura</button>
        </div>
      </div>

      <div className="deckToolbar"><span>{started ? (selectionMode === "position" ? "78 POSICIONES · BARAJADAS" : "78 CARTAS · BARAJADAS") : "78 CARTAS · VISTA CONTEMPLATIVA"}</span><small>{!started ? "Haz clic en una carta para consultar su significado" : picked.length===count ? "Tirada completa" : `Faltan ${count-picked.length}`}</small></div>
      {selectionMode === "card" && <div
        className="deck"
        aria-label="Baraja de 78 cartas"
        style={{
          display:"grid",
          gridTemplateColumns:"repeat(12, minmax(0, 1fr))",
          gap:"10px",
          width:"100%",
          alignItems:"start"
        }}
      >
        {deckOrder.map((c) => {
          const pickNumber = c.slot != null ? c.slot - 1 : -1;
          const isPicked = pickNumber !== -1;
          return (
            <button
              className={isPicked ? "tarot picked" : "tarot"}
              key={`${c.id}-${c.slot ?? 0}`}
              type="button"
              style={{
                cursor:"pointer",
                pointerEvents:"auto",
                position:"relative",
                display:"block",
                width:"100%",
                aspectRatio:"2 / 3",
                minWidth:0,
                height:"auto",
                padding:0,
                overflow:"hidden",
                boxSizing:"border-box"
              }}
              onClick={() => {
                if (!started) {
                  setZoomCard(c);
                } else {
                  choose(c);
                }
              }}
              disabled={false}
              aria-label={!started ? `Consultar ficha de ${c.name}` : isPicked ? `${c.name}, posición seleccionada ${pickNumber + 1}` : `Carta boca abajo, posición ${deckOrder.indexOf(c) + 1}`}
            >
              {!started ? (
                <span style={{display:"block",position:"relative",pointerEvents:"none",width:"100%",height:"100%"}}>
                  <CardImage card={c} alt={c.name}/>
                </span>
              ) : (
                <span className="tarotFlip">
                  <span className="cardFace cardFaceBack">
                    <span className="backFrame backFrameOuter"></span>
                    <span className="backFrame backFrameInner"></span>
                    <span className="backGarland backGarlandLeft"></span>
                    <span className="backGarland backGarlandRight"></span>
                    <span className="backMedallion">
                      <span className="backStar">✦</span>
                    </span>
                  </span>
                  <span className="cardFace cardFaceFront">
                    <CardImage card={c} alt={c.name}/>
                  </span>
                </span>
              )}
              {started && (
                <span
                  className="positionMark"
                  style={{
                    position:"absolute",
                    top:"6px",
                    left:"6px",
                    zIndex:5,
                    minWidth:"22px",
                    padding:"3px 5px",
                    borderRadius:"999px",
                    background:"rgba(255,255,255,.86)",
                    color:"#222",
                    fontSize:"11px",
                    lineHeight:1,
                    textAlign:"center",
                    pointerEvents:"none"
                  }}
                >
                  {deckOrder.indexOf(c) + 1}
                </span>
              )}
              {isPicked && <span className="pickedMark">{pickNumber + 1}</span>}
            </button>
          );
        })}
      </div>}


    </section>

    {reading && <section className="sectionBlock readingSection" id="lectura">
      <div className="eyebrow">04 · La revelación</div>
      <div className="readingIntro">
        <div><h2>Ahora mira la historia.</h2><p className="readingQuestion">“{effectiveQuestion}”</p></div>
        <div className="readingBadge">Lectura {current.name}</div>
      </div>

      <div className="expertCard centralIdea">
        <div className="label">La idea central de tu consulta</div>
        <p>{synthesis()}</p>
      </div>

      <div className="positionReadings">
        <div className="readingLabel">Lectura carta a carta</div>
        {selected.map((c,i)=> c ? <article className="positionReading" key={`${c.id}-${i}`}>
          <div className="positionNumber">{String(i+1).padStart(2,"0")}</div>
          <button className="readingCardThumb" type="button" onClick={() => setZoomCard(c)} aria-label={`Ampliar ${c.name}`}>
            <CardImage card={c} alt={c.name}/>
            
          </button>
          <div className="positionInfo"><span>{current.positions[i]}</span><h3>{c.name}</h3><small>{cardArea(c)}</small></div>
          <div className="positionText"><p>{directAnswer(c,i)}</p></div>
        </article> : null)}
      </div>
        <div className="expertCard mainSynthesis unifiedStory">
          <div className="label">Interpretación de la tirada</div>
          <p>{spreadReading()}</p>

          <div style={{marginTop:"20px"}}>
            <div className="label">Mirada evolutiva</div>
            <p>{evolutionaryReading()}</p>
          </div>

          <p className="storyConclusion">
            <strong>La clave para ti:</strong> {practicalKey()}
          </p>
        </div>

      <div className="readingShare">
        <div className="label">Guardar o compartir esta lectura</div>
        <div className="shareButtons">
          <button className="shareButton whatsapp" type="button" onClick={shareReading}>Compartir por WhatsApp</button>
          <button className="shareButton email" type="button" onClick={() => {
            const subject = encodeURIComponent("Mi tirada · Tarot AO");
            const body = encodeURIComponent(shareText());
            window.location.href = `mailto:?subject=${subject}&body=${body}`;
          }}>Compartir por email</button>
          <button className="shareButton other" type="button" onClick={shareReading}>Otras opciones</button>
        </div>
      </div>
    </section>}

    {zoomCard && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Ficha de ${zoomCard.name}`}
        onClick={() => setZoomCard(null)}
        style={{
          position:"fixed",
          inset:0,
          zIndex:99999,
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          padding:"20px",
          boxSizing:"border-box",
          background:"rgba(20,18,15,.78)",
          overflowY:"auto"
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position:"relative",
            width:"min(900px, 100%)",
            maxHeight:"calc(100vh - 40px)",
            overflowY:"auto",
            boxSizing:"border-box",
            background:"#f7f3eb",
            color:"#24201b",
            borderRadius:"22px",
            padding:"28px",
            boxShadow:"0 25px 80px rgba(0,0,0,.35)"
          }}
        >
          <button
            type="button"
            onClick={() => setZoomCard(null)}
            aria-label="Cerrar ficha"
            style={{
              position:"absolute",
              top:"12px",
              right:"12px",
              zIndex:2,
              width:"42px",
              height:"42px",
              borderRadius:"50%",
              border:"1px solid rgba(36,32,27,.25)",
              background:"rgba(255,255,255,.9)",
              color:"#24201b",
              fontSize:"28px",
              lineHeight:1,
              cursor:"pointer"
            }}
          >
            ×
          </button>

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"minmax(170px, 32%) minmax(0,1fr)",
              gap:"30px",
              alignItems:"start"
            }}
          >
            <div style={{minWidth:0}}>
              <CardImage card={zoomCard} alt={zoomCard.name}/>
            </div>

            <div style={{minWidth:0}}>
              <div className="label">Significado de la carta</div>
              <h2 style={{marginTop:"6px"}}>{zoomCard.name}</h2>

              <p>
                <strong>Significado general.</strong>{" "}
                {cardMeaning(zoomCard)}
              </p>

              <div style={{
                display:"grid",
                gap:"14px",
                marginTop:"18px"
              }}>
                <div>
                  <strong>LUZ</strong>
                  <p>{zoomCard.light}</p>
                </div>

                <div>
                  <strong>SOMBRA</strong>
                  <p>{zoomCard.shadow}</p>
                </div>

                <div>
                  <strong>CONSEJO</strong>
                  <p>{zoomCard.advice}</p>
                </div>
              </div>

              {zoomCard.keywords && (
                <p style={{opacity:0.72,marginTop:"18px"}}>
                  <strong>Ámbito:</strong> {zoomCard.keywords}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )}

    <footer>El tarot se presenta aquí como lenguaje simbólico de reflexión. La lectura abre perspectivas; tus decisiones siguen siendo tuyas.</footer>
  </main>;
}
