import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tarot-ao-new.vercel.app";

const CARDS: Record<string, {name:string; file:string; essence:string; light:string; shadow:string; advice:string}> = {
  "00": {name:"El Loco", file:"00-el-loco.png", essence:"Inicio, libertad, aventura y salto hacia lo desconocido", light:"Espontaneidad, confianza", shadow:"Impulsividad o falta de rumbo", advice:"Atrévete a comenzar"},
  "01": {name:"El Mago", file:"01-el-mago.png", essence:"Acción, potencial y capacidad de crear y materializar", light:"Iniciativa, habilidad, creatividad", shadow:"Dispersión o manipulación", advice:"Utiliza lo que ya tienes"},
  "02": {name:"La Sacerdotisa", file:"02-la-sacerdotisa.png", essence:"Intuición, silencio y conocimiento interior", light:"Sabiduría, percepción", shadow:"Pasividad o secretos", advice:"Escucha tu intuición"},
  "03": {name:"La Emperatriz", file:"03-la-emperatriz.png", essence:"Creación, abundancia y fertilidad", light:"Creatividad, amor, expansión", shadow:"Dependencia o exceso", advice:"Nutre aquello que quieres hacer crecer"},
  "04": {name:"El Emperador", file:"04-el-emperador.png", essence:"Orden, estructura, autoridad y responsabilidad", light:"Estabilidad, liderazgo", shadow:"Rigidez o necesidad de controlar", advice:"Construye una estructura sólida"},
  "05": {name:"El Sacerdote", file:"05-el-sacerdote.png", essence:"Enseñanza, tradición y valores compartidos", light:"Guía, aprendizaje", shadow:"Dogma o conformismo", advice:"Busca conocimiento y orientación"},
  "06": {name:"Los Enamorados", file:"06-los-enamorados.png", essence:"Elección, vínculo y coherencia con los valores", light:"Amor, unión, decisión consciente", shadow:"Duda o conflicto", advice:"Elige desde tus valores"},
  "07": {name:"El Carro", file:"07-el-carro.png", essence:"Movimiento, voluntad, dirección y conquista", light:"Determinación, avance", shadow:"Prisa o falta de control", advice:"Dirige tu energía hacia un objetivo"},
  "08": {name:"La Fuerza", file:"08-la-fuerza.png", essence:"Poder interior, coraje sereno y dominio del impulso", light:"Coraje, paciencia, confianza", shadow:"Represión o inseguridad", advice:"La verdadera fuerza nace del equilibrio"},
  "09": {name:"El Ermitaño", file:"09-el-ermitano.png", essence:"Introspección, búsqueda interior y sabiduría", light:"Claridad, discernimiento", shadow:"Aislamiento o distancia", advice:"Detente para encontrar tu propia respuesta"},
  "10": {name:"La Rueda de la Fortuna", file:"10-la-rueda-de-la-fortuna.png", essence:"Cambio, ciclos y giro de las circunstancias", light:"Oportunidad, movimiento", shadow:"Inestabilidad o resistencia", advice:"Acepta el cambio y adáptate"},
  "11": {name:"La Justicia", file:"11-la-justicia.png", essence:"Equilibrio, verdad, responsabilidad y consecuencias", light:"Claridad, responsabilidad", shadow:"Rigidez o juicio", advice:"Actúa con honestidad"},
  "12": {name:"El Colgado", file:"12-el-colgado.png", essence:"Pausa, entrega y cambio de perspectiva", light:"Nueva mirada, aceptación", shadow:"Estancamiento o sacrificio inútil", advice:"Cambia tu perspectiva"},
  "13": {name:"La Muerte", file:"13-la-muerte.png", essence:"Transformación y cierre de una etapa", light:"Renovación, liberación", shadow:"Resistencia o miedo al cambio", advice:"Deja espacio para lo nuevo"},
  "14": {name:"La Templanza", file:"14-la-templanza.png", essence:"Integración, armonía y equilibrio", light:"Equilibrio, sanación", shadow:"Exceso o desequilibrio", advice:"Encuentra el punto medio"},
  "15": {name:"El Diablo", file:"15-el-diablo.png", essence:"Deseo, materia, instinto, apego y poder personal", light:"Pasión, vitalidad, poder", shadow:"Dependencia u obsesión", advice:"Reconoce aquello que te ata"},
  "16": {name:"La Torre", file:"16-la-torre.png", essence:"Ruptura y revelación de una estructura que ya no sostiene", light:"Liberación, verdad", shadow:"Crisis o resistencia", advice:"Permite que caiga lo que ya no sostiene"},
  "17": {name:"La Estrella", file:"17-la-estrella.png", essence:"Esperanza, inspiración, confianza y renovación", light:"Fe, creatividad, renovación", shadow:"Idealización o vulnerabilidad", advice:"Confía en el proceso"},
  "18": {name:"La Luna", file:"18-la-luna.png", essence:"Mundo emocional, inconsciente, intuición e incertidumbre", light:"Imaginación, intuición", shadow:"Miedo, confusión o ilusión", advice:"No confundas percepción con realidad"},
  "19": {name:"El Sol", file:"19-el-sol.png", essence:"Claridad, alegría, vitalidad y conciencia", light:"Éxito, autenticidad", shadow:"Ego o exceso de confianza", advice:"Muéstrate con claridad"},
  "20": {name:"El Juicio", file:"20-el-juicio.png", essence:"Despertar, llamada interior y revisión", light:"Renacimiento, conciencia", shadow:"Culpa o juicio excesivo", advice:"Escucha la llamada y responde"},
  "21": {name:"El Mundo", file:"21-el-mundo.png", essence:"Culminación, integración y realización", light:"Plenitud, integración", shadow:"Cierre incompleto", advice:"Reconoce lo conseguido y completa el ciclo"},
  "22": {name:"As de Copas", file:"22-as-de-copas.png", essence:"Nacimiento emocional, amor y apertura del corazón", light:"Apertura emocional, amor, sentimiento nuevo", shadow:"Bloqueo afectivo o cerrarse a sentir", advice:"Permite que tus emociones fluyan"},
  "23": {name:"Dos de Copas", file:"23-dos-de-copas.png", essence:"Unión, reciprocidad y conexión", light:"Encuentro, reciprocidad, vínculo", shadow:"Dependencia o desequilibrio", advice:"Busca un vínculo equilibrado"},
  "24": {name:"Tres de Copas", file:"24-tres-de-copas.png", essence:"Celebración, amistad y comunidad", light:"Alegría, amistad, celebración", shadow:"Dispersión o exceso social", advice:"Comparte la alegría"},
  "25": {name:"Cuatro de Copas", file:"25-cuatro-de-copas.png", essence:"Introspección y apatía emocional", light:"Contemplación y oportunidad de mirar hacia dentro", shadow:"Desconexión o ignorar una oportunidad", advice:"Observa aquello que estás dejando pasar"},
  "26": {name:"Cinco de Copas", file:"26-cinco-de-copas.png", essence:"Pérdida, tristeza y duelo", light:"Aceptación y aprendizaje", shadow:"Quedarse atrapado en la pérdida", advice:"Mira también lo que permanece"},
  "27": {name:"Seis de Copas", file:"27-seis-de-copas.png", essence:"Recuerdos, infancia y nostalgia", light:"Recuperar algo valioso del pasado", shadow:"Idealizar el pasado o quedarse en él", advice:"Recupera algo valioso del pasado sin quedarte en él"},
  "28": {name:"Siete de Copas", file:"28-siete-de-copas.png", essence:"Opciones, imaginación e ilusiones", light:"Creatividad y apertura de posibilidades", shadow:"Confusión o fantasía sin realidad", advice:"Distingue deseo de realidad"},
  "29": {name:"Ocho de Copas", file:"29-ocho-de-copas.png", essence:"Alejarse de algo que ya no satisface", light:"Búsqueda de sentido y evolución emocional", shadow:"Aferrarse a lo conocido o huir sin comprender", advice:"Busca aquello que tiene verdadero sentido"},
  "30": {name:"Nueve de Copas", file:"30-nueve-de-copas.png", essence:"Satisfacción y deseo cumplido", light:"Placer, satisfacción y disfrute", shadow:"Complacencia o exceso", advice:"Disfruta lo conseguido"},
  "31": {name:"Diez de Copas", file:"31-diez-de-copas.png", essence:"Plenitud afectiva y armonía familiar", light:"Felicidad emocional, familia, plenitud", shadow:"Idealizar la armonía o depender de ella", advice:"Construye vínculos basados en autenticidad"},
  "32": {name:"Sota de Copas", file:"32-sota-de-copas.png", essence:"Sensibilidad, intuición y mensaje emocional", light:"Curiosidad emocional, apertura", shadow:"Inmadurez o hipersensibilidad", advice:"Permanece abierto a sentir"},
  "33": {name:"Caballero de Copas", file:"33-caballero-de-copas.png", essence:"Romanticismo, propuesta y movimiento emocional", light:"Expresión afectiva, propuesta", shadow:"Idealización o impulso emocional", advice:"Expresa lo que sientes"},
  "34": {name:"Reina de Copas", file:"34-reina-de-copas.png", essence:"Empatía, profundidad y sensibilidad", light:"Comprensión emocional y cuidado", shadow:"Absorber emociones ajenas o desbordarse", advice:"Cuida tus emociones sin absorber las de otros"},
  "35": {name:"Rey de Copas", file:"35-rey-de-copas.png", essence:"Madurez emocional y equilibrio", light:"Serenidad, comprensión y dominio emocional", shadow:"Contención excesiva o distancia emocional", advice:"Siente profundamente y actúa con serenidad"},
  "36": {name:"As de Espadas", file:"36-as-de-espadas.png", essence:"Claridad, verdad y decisión", light:"Claridad mental, verdad", shadow:"Dureza o cortar sin integrar", advice:"Corta la confusión con una verdad clara"},
  "37": {name:"Dos de Espadas", file:"37-dos-de-espadas.png", essence:"Indecisión y bloqueo", light:"Pausa para reunir información", shadow:"Evitar decidir o cerrar los ojos", advice:"Permite que la información te ayude a decidir"},
  "38": {name:"Tres de Espadas", file:"38-tres-de-espadas.png", essence:"Dolor, separación y verdad difícil", light:"Reconocer la verdad y comenzar a integrar", shadow:"Quedarse en la herida", advice:"Reconoce la herida para poder integrarla"},
  "39": {name:"Cuatro de Espadas", file:"39-cuatro-de-espadas.png", essence:"Descanso, pausa y recuperación", light:"Recuperación y perspectiva", shadow:"Aislamiento prolongado o evitar actuar", advice:"Detenerse también forma parte del proceso"},
  "40": {name:"Cinco de Espadas", file:"40-cinco-de-espadas.png", essence:"Conflicto y victoria con coste", light:"Aprender de un conflicto y elegir batallas", shadow:"Enfrentamiento innecesario", advice:"Decide qué batallas merecen tu energía"},
  "41": {name:"Seis de Espadas", file:"41-seis-de-espadas.png", essence:"Transición y desplazamiento hacia aguas más tranquilas", light:"Cambio y transición", shadow:"Aferrarse a una etapa agotada", advice:"Permite que el cambio te lleve hacia una nueva etapa"},
  "42": {name:"Siete de Espadas", file:"42-siete-de-espadas.png", essence:"Estrategia, discreción y autonomía", light:"Inteligencia estratégica y autonomía", shadow:"Ocultación, evasión o falta de transparencia", advice:"Actúa con inteligencia y transparencia"},
  "43": {name:"Ocho de Espadas", file:"43-ocho-de-espadas.png", essence:"Sensación de limitación mental", light:"Cuestionar las creencias que limitan", shadow:"Sentirse atrapado sin revisar las propias creencias", advice:"Revisa las creencias que están condicionando tus opciones"},
  "44": {name:"Nueve de Espadas", file:"44-nueve-de-espadas.png", essence:"Preocupación, ansiedad y pensamientos repetitivos", light:"Tomar conciencia de los pensamientos", shadow:"Anticipación y escenarios mentales repetitivos", advice:"Separa los hechos de los escenarios mentales"},
  "45": {name:"Diez de Espadas", file:"45-diez-de-espadas.png", essence:"Final de una etapa dolorosa", light:"Liberación y nuevo comienzo", shadow:"Resistirse al cierre o identificarse con el dolor", advice:"Acepta el cierre"},
  "46": {name:"Sota de Espadas", file:"46-sota-de-espadas.png", essence:"Curiosidad, observación y comunicación", light:"Investigación y aprendizaje", shadow:"Impulsividad verbal o mirar sin comprender", advice:"Pregunta, investiga y aprende"},
  "47": {name:"Caballero de Espadas", file:"47-caballero-de-espadas.png", essence:"Acción mental rápida", light:"Determinación y decisión", shadow:"Precipitación o confrontación", advice:"Piensa antes de actuar"},
  "48": {name:"Reina de Espadas", file:"48-reina-de-espadas.png", essence:"Claridad, independencia y discernimiento", light:"Lucidez y límites sanos", shadow:"Frialdad o exceso de distancia", advice:"Establece límites desde la verdad"},
  "49": {name:"Rey de Espadas", file:"49-rey-de-espadas.png", essence:"Razón, autoridad intelectual y justicia", light:"Lógica, perspectiva y decisión", shadow:"Rigidez intelectual o abuso de autoridad", advice:"Decide con lógica y perspectiva"},
  "50": {name:"As de Bastos", file:"50-as-de-bastos.png", essence:"Nacimiento de una energía creativa", light:"Inspiración, entusiasmo, oportunidad", shadow:"Impulso sin dirección", advice:"Empieza; la energía está disponible"},
  "51": {name:"Dos de Bastos", file:"51-dos-de-bastos.png", essence:"Planificación y visión", light:"Estrategia y expansión", shadow:"Quedarse pensando sin decidir", advice:"Mira más lejos y decide tu dirección"},
  "52": {name:"Tres de Bastos", file:"52-tres-de-bastos.png", essence:"Expansión", light:"Crecimiento y resultados futuros", shadow:"Esperar demasiado", advice:"Confía en lo que has puesto en marcha"},
  "53": {name:"Cuatro de Bastos", file:"53-cuatro-de-bastos.png", essence:"Celebración y estabilidad", light:"Hogar, comunidad y alegría", shadow:"Acomodamiento", advice:"Celebra los logros"},
  "54": {name:"Cinco de Bastos", file:"54-cinco-de-bastos.png", essence:"Competencia y fricción", light:"Estímulo y aprendizaje", shadow:"Conflicto innecesario", advice:"Convierte la fricción en energía creativa"},
  "55": {name:"Seis de Bastos", file:"55-seis-de-bastos.png", essence:"Reconocimiento", light:"Éxito y confianza", shadow:"Necesidad de aprobación", advice:"Reconoce tu propio avance"},
  "56": {name:"Siete de Bastos", file:"56-siete-de-bastos.png", essence:"Defender una posición", light:"Valentía y perseverancia", shadow:"Estar siempre a la defensiva", advice:"Protege aquello que realmente importa"},
  "57": {name:"Ocho de Bastos", file:"57-ocho-de-bastos.png", essence:"Velocidad y movimiento", light:"Noticias, avance y comunicación", shadow:"Precipitación", advice:"Aprovecha el impulso"},
  "58": {name:"Nueve de Bastos", file:"58-nueve-de-bastos.png", essence:"Resistencia", light:"Perseverancia y experiencia", shadow:"Agotamiento o desconfianza", advice:"Estás cerca; administra tus fuerzas"},
  "59": {name:"Diez de Bastos", file:"59-diez-de-bastos.png", essence:"Carga y responsabilidad", light:"Compromiso y capacidad", shadow:"Sobrecarga", advice:"Aprende a delegar"},
  "60": {name:"Sota de Bastos", file:"60-sota-de-bastos.png", essence:"Curiosidad y descubrimiento", light:"Entusiasmo y aventura", shadow:"Inmadurez", advice:"Explora y aprende"},
  "61": {name:"Caballero de Bastos", file:"61-caballero-de-bastos.png", essence:"Acción apasionada", light:"Valentía y dinamismo", shadow:"Impulsividad", advice:"Avanza, pero dirige tu fuego"},
  "62": {name:"Reina de Bastos", file:"62-reina-de-bastos.png", essence:"Confianza y magnetismo", light:"Creatividad e independencia", shadow:"Orgullo o intensidad", advice:"Ocupa tu espacio con autenticidad"},
  "63": {name:"Rey de Bastos", file:"63-rey-de-bastos.png", essence:"Liderazgo creativo", light:"Visión e iniciativa", shadow:"Autoritarismo", advice:"Lidera inspirando"},
  "64": {name:"As de Oros", file:"64-as-de-oros.png", essence:"Nueva oportunidad material", light:"Oportunidad concreta y recursos", shadow:"Dejar pasar la oportunidad o no materializarla", advice:"Convierte la oportunidad en algo concreto"},
  "65": {name:"Dos de Oros", file:"65-dos-de-oros.png", essence:"Adaptación y equilibrio práctico", light:"Flexibilidad y gestión de recursos", shadow:"Desorden o intentar sostener demasiado", advice:"Organiza tus recursos"},
  "66": {name:"Tres de Oros", file:"66-tres-de-oros.png", essence:"Trabajo conjunto y aprendizaje", light:"Colaboración y desarrollo de habilidades", shadow:"Trabajar aislado o no valorar la colaboración", advice:"Construye con otros"},
  "67": {name:"Cuatro de Oros", file:"67-cuatro-de-oros.png", essence:"Seguridad y conservación", light:"Protección y estabilidad", shadow:"Apego y miedo a perder", advice:"Protege sin encerrarte"},
  "68": {name:"Cinco de Oros", file:"68-cinco-de-oros.png", essence:"Carencia y sensación de exclusión", light:"Buscar apoyo y reconocer recursos disponibles", shadow:"Aislamiento o asumir que no hay salida", advice:"Busca apoyo y recursos disponibles"},
  "69": {name:"Seis de Oros", file:"69-seis-de-oros.png", essence:"Dar, recibir y reciprocidad", light:"Generosidad e intercambio equilibrado", shadow:"Dependencia o desequilibrio entre dar y recibir", advice:"Equilibra generosidad y autonomía"},
  "70": {name:"Siete de Oros", file:"70-siete-de-oros.png", essence:"Paciencia y evaluación", light:"Observar el crecimiento y valorar resultados", shadow:"Impaciencia o abandonar demasiado pronto", advice:"Observa qué está creciendo antes de decidir el siguiente paso"},
  "71": {name:"Ocho de Oros", file:"71-ocho-de-oros.png", essence:"Trabajo, práctica y perfeccionamiento", light:"Constancia y desarrollo de maestría", shadow:"Perfeccionismo o trabajar sin sentido", advice:"La maestría nace de la constancia"},
  "72": {name:"Nueve de Oros", file:"72-nueve-de-oros.png", essence:"Independencia y prosperidad", light:"Autonomía, disfrute y prosperidad", shadow:"Aislamiento o medir el valor solo por lo material", advice:"Disfruta aquello que has construido"},
  "73": {name:"Diez de Oros", file:"73-diez-de-oros.png", essence:"Patrimonio, familia y estabilidad a largo plazo", light:"Abundancia, legado y estabilidad", shadow:"Aferrarse al patrimonio o a expectativas familiares", advice:"Piensa en lo que quieres dejar construido"},
  "74": {name:"Sota de Oros", file:"74-sota-de-oros.png", essence:"Aprendizaje práctico y oportunidad", light:"Estudio, curiosidad y oportunidad", shadow:"Inexperiencia o falta de continuidad", advice:"Estudia y experimenta"},
  "75": {name:"Caballero de Oros", file:"75-caballero-de-oros.png", essence:"Constancia, responsabilidad y progreso lento", light:"Fiabilidad y progreso sostenido", shadow:"Lentitud excesiva o rigidez", advice:"Avanza paso a paso"},
  "76": {name:"Reina de Oros", file:"76-reina-de-oros.png", essence:"Cuidado, abundancia y practicidad", light:"Bienestar, cuidado y recursos", shadow:"Sobreproteger o cargar con todo", advice:"Crea bienestar tangible"},
  "77": {name:"Rey de Oros", file:"77-rey-de-oros.png", essence:"Estabilidad, experiencia y prosperidad", light:"Administración, seguridad y visión", shadow:"Control material o identificación con el poder", advice:"Administra tus recursos con visión de futuro"}
};

const THREE_CARD_VARIANTS = [
  {label:"origen / presente / tendencia", positions:["origen","presente","tendencia"]},
  {label:"yo / el otro / el vínculo", positions:["yo","el otro","el vínculo"]},
  {label:"qué siente / qué piensa / qué intenciones", positions:["qué siente","qué piensa","qué intenciones"]},
];

function positionsForCount(count:number, variant:number) {
  if (count === 1) return ["lo esencial ahora"];
  if (count === 2) return ["situación", "orientación"];
  if (count === 5) return ["dinámica", "en juego", "lo no dicho", "dirección", "clave"];
  if (count === 7) return ["contexto", "tensión", "deseo", "miedo", "camino", "clave", "síntesis"];
  return THREE_CARD_VARIANTS[variant]?.positions || THREE_CARD_VARIANTS[0].positions;
}

function directAnswer(c:typeof CARDS[string], i:number, positions:string[], question:string) {
  const position = positions[i];
  const q = question.toLowerCase();
  if(position === "tendencia") return `En la tendencia, ${c.name} señala ${c.essence.toLowerCase()}. Si la dinámica actual continúa, puede expresarse como ${c.light.toLowerCase()}. No es un resultado cerrado: muestra una dirección posible.`;
  if(position === "orientación") return `Como orientación para tu pregunta, ${c.name} te propone ${c.advice.toLowerCase()}.`;
  if(position === "clave") return `Como clave, ${c.name} concentra el mensaje en ${c.essence.toLowerCase()}. La acción que propone es clara: ${c.advice.toLowerCase()}.`;
  const relational = /amor|relación|vínculo|pareja|siente|persona/.test(q);
  if(relational) return `En «${position}», ${c.name} pone el foco en ${c.essence.toLowerCase()}. Mira cómo esta energía aparece realmente en el vínculo y qué diferencia hay entre lo que observas y lo que imaginas.`;
  return `En «${position}», ${c.name} pone el foco en ${c.essence.toLowerCase()}. Para tu pregunta, observa dónde aparece ${c.light.toLowerCase()} y qué parte de ${c.shadow.toLowerCase()} necesita atención.`;
}

function synthesis(selected:any[], question:string) {
  const first=selected[0], last=selected[selected.length-1];
  const names=selected.map(c=>c.name).join(" → ");
  const relational=/relación|vínculo|pareja|amor|persona/.test(question.toLowerCase());
  if(relational) return `Tu pregunta es «${question}». La secuencia ${names} muestra distintas capas de la situación. ${first.name} abre el tema con ${first.essence.toLowerCase()} y ${last.name} lo lleva hacia ${last.essence.toLowerCase()}. La lectura simbólica te ayuda a distinguir lo que sientes, lo que observas y lo que necesitas hablar o decidir.`;
  return `Para «${question}», la secuencia ${names} va de ${first.essence.toLowerCase()} hacia ${last.essence.toLowerCase()}. La lectura muestra el proceso que aparece ahora y qué puedes hacer con él, sin convertir la tendencia en un resultado inevitable.`;
}

function evolutionaryReading(selected:any[]) {
  return `Desde una mirada evolutiva, la tirada te invita a comprender esta secuencia: ${selected.map(c=>c.advice.toLowerCase()).join(" · ")}. El aprendizaje está en reconocer qué te muestra cada carta y qué puedes transformar conscientemente en tu manera de actuar.`;
}

function spreadReading(selected:any[], positions:string[]) {
  const pieces=selected.map((c,i)=>`${positions[i]}: ${c.name} aporta ${c.essence.toLowerCase()}`);
  return `La interpretación conjunta conecta ${pieces.join("; ")}. Las cartas no se leen como frases aisladas: la posición modifica su sentido y la pregunta da dirección a todo el conjunto.`;
}

function practicalKey(selected:any[]) {
  const lead=selected[0], end=selected[selected.length-1];
  return `Quédate con esto: ${lead.advice}. Después, observa qué te pide ${end.name} y conviértelo en un paso concreto que dependa de ti.`;
}

export async function generateMetadata({params,searchParams}:{params:Promise<{cards:string}>;searchParams:Promise<{q?:string;s?:string;v?:string} >}):Promise<Metadata> {
  const {cards}=await params; const {q}=await searchParams;
  const title="Tarot AO · Mi tirada";
  const description=q?`Pregunta: ${q}`:"Una lectura completa de Tarot AO.";
  const image=new URL(`/compartir/${cards}/opengraph-image`,SITE_URL).toString();
  return {metadataBase:new URL(SITE_URL),title,description,openGraph:{title,description,type:"website",images:[{url:image,width:1200,height:630,alt:"Tirada compartida de Tarot AO"}]},twitter:{card:"summary_large_image",title,description,images:[image]}};
}

export default async function SharedReading({params,searchParams}:{params:Promise<{cards:string}>;searchParams:Promise<{q?:string;s?:string;v?:string}>}) {
  const {cards}=await params; const {q,s,v}=await searchParams;
  const selected=cards.split("-").map(id=>CARDS[id]).filter(Boolean);
  const spreadCount=Number(s)||selected.length;
  const variant=Number(v)||0;
  const positions=positionsForCount(spreadCount,variant);
  const question=q||"Mi tirada de Tarot AO";
  const central=synthesis(selected,question);
  const interpretation=spreadReading(selected,positions);
  const evolution=evolutionaryReading(selected);
  const key=practicalKey(selected);
  return <main style={{minHeight:"100vh",background:"#edf6f7",color:"#1b4652",fontFamily:"Arial,sans-serif",padding:"38px 5.5vw 70px"}}>
    <style>{`
      .shared-shell{box-sizing:border-box;width:100%;max-width:100%;overflow-x:hidden;}
      .shared-header{display:flex;justify-content:space-between;align-items:flex-end;gap:24px;margin-bottom:28px}
      .shared-card-row{display:grid;grid-template-columns:48px 160px 220px minmax(0,1fr);gap:20px;align-items:center;padding:26px 0;border-bottom:1px solid #c8e0e4}
      .shared-card-answer{grid-column:auto;min-width:0;overflow-wrap:anywhere}
      @media (max-width:700px){
        .shared-shell{padding:22px 16px 50px!important}
        .shared-header{display:block;margin-bottom:22px}
        .shared-header h1{font-size:42px!important}
        .shared-header p{font-size:17px!important;line-height:1.5}
        .shared-badge{display:inline-block;margin-top:16px}
        .shared-central{padding:20px!important;border-radius:16px!important}
        .shared-central p{font-size:17px!important;line-height:1.65!important}
        .shared-card-row{display:grid;grid-template-columns:34px 92px minmax(0,1fr);gap:12px;padding:20px 0;align-items:start}
        .shared-card-row img{width:92px!important;height:138px!important}
        .shared-card-title{font-size:22px!important}
        .shared-card-answer{grid-column:1 / -1;font-size:16px!important;line-height:1.65!important;margin-top:8px!important}
        .shared-reading{padding:20px!important;border-radius:16px!important}
        .shared-reading p{font-size:16px!important;line-height:1.7!important}
      }
    `}</style>
    <div className="shared-shell" style={{maxWidth:1400,margin:"0 auto"}}>
      <div style={{fontSize:13,letterSpacing:".14em",fontWeight:700,color:"#0f7288",marginBottom:14}}>04 · LA REVELACIÓN</div>
      <header className="shared-header">
        <div><h1 style={{fontSize:"clamp(40px,6vw,72px)",lineHeight:1.02,margin:"0 0 14px",color:"#173f4b"}}>Ahora mira la historia.</h1><p style={{fontSize:20,color:"#08758c",margin:0}}>“{question}”</p></div>
        <div className="shared-badge" style={{padding:"10px 18px",borderRadius:24,background:"#d9eef1",fontWeight:700,fontSize:13,whiteSpace:"nowrap"}}>Lectura {spreadCount} cartas</div>
      </header>

      <section className="shared-central" style={{background:"rgba(255,255,255,.52)",border:"1px solid #c8e0e4",borderRadius:22,padding:"28px 30px",marginBottom:34}}>
        <div style={{fontSize:12,letterSpacing:".16em",fontWeight:700,color:"#71939c",marginBottom:14}}>LA IDEA CENTRAL DE TU CONSULTA</div>
        <p style={{fontSize:20,lineHeight:1.8,margin:0,color:"#587b84"}}>{central}</p>
      </section>

      <div style={{fontSize:12,letterSpacing:".16em",fontWeight:700,color:"#71939c",paddingBottom:14,borderBottom:"1px solid #c8e0e4",marginBottom:0}}>LECTURA CARTA A CARTA</div>
      <section>
        {selected.map((c:any,i:number)=><article className="shared-card-row" key={c.name+String(i)}>
          <div style={{fontSize:13,fontWeight:700,color:"#0f7288"}}>{String(i+1).padStart(2,"0")}</div>
          <img src={`/cards/${c.file}`} alt={c.name} style={{width:160,height:240,objectFit:"cover",borderRadius:14,display:"block"}} />
          <div><div style={{fontSize:11,letterSpacing:".15em",color:"#78949b",marginBottom:8}}>{positions[i]||"carta"}</div><h2 className="shared-card-title" style={{fontSize:27,margin:"0 0 8px",color:"#173f4b"}}>{c.name}</h2><div style={{fontSize:13,color:"#08758c"}}>{Number(c.id)<22?"Arcano Mayor":Number(c.id)<36?"Copas":Number(c.id)<50?"Espadas":Number(c.id)<64?"Bastos":"Oros"}</div></div>
          <p className="shared-card-answer" style={{fontSize:19,lineHeight:1.75,color:"#587b84",margin:0}}>{directAnswer(c,i,positions,question)}</p>
        </article>)}
      </section>

      <section className="shared-reading" style={{background:"#dff1f3",border:"1px solid #c1dfe4",borderRadius:22,padding:"30px",marginTop:32}}>
        <div style={{fontSize:12,letterSpacing:".16em",fontWeight:700,color:"#71939c",marginBottom:14}}>INTERPRETACIÓN DE LA TIRADA</div>
        <p style={{fontSize:19,lineHeight:1.8,color:"#587b84",margin:"0 0 24px"}}>{interpretation}</p>
        <div style={{fontSize:12,letterSpacing:".16em",fontWeight:700,color:"#71939c",marginBottom:14}}>MIRADA EVOLUTIVA</div>
        <p style={{fontSize:19,lineHeight:1.8,color:"#587b84",margin:"0 0 24px"}}>{evolution}</p>
        <p style={{fontSize:19,lineHeight:1.8,color:"#587b84",margin:0}}><strong>La clave para ti:</strong> {key}</p>
      </section>

      <footer style={{marginTop:34,paddingTop:20,borderTop:"1px solid #c8e0e4",fontSize:13,color:"#78949b"}}>Tarot AO · Anna Oriol · Lectura simbólica para la reflexión personal.</footer>
    </div>
  </main>;
}
