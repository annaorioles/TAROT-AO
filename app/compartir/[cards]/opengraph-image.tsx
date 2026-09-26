import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tirada compartida de Tarot AO";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://tarot-ao-new.vercel.app";

const CARD_NAMES: Record<string, { name: string; file: string }> = {
  "00": { name: "El Loco", file: "00-el-loco.png" },
  "01": { name: "El Mago", file: "01-el-mago.png" },
  "02": { name: "La Sacerdotisa", file: "02-la-sacerdotisa.png" },
  "03": { name: "La Emperatriz", file: "03-la-emperatriz.png" },
  "04": { name: "El Emperador", file: "04-el-emperador.png" },
  "05": { name: "El Sacerdote", file: "05-el-sacerdote.png" },
  "06": { name: "Los Enamorados", file: "06-los-enamorados.png" },
  "07": { name: "El Carro", file: "07-el-carro.png" },
  "08": { name: "La Fuerza", file: "08-la-fuerza.png" },
  "09": { name: "El Ermitaño", file: "09-el-ermitano.png" },
  "10": { name: "La Rueda de la Fortuna", file: "10-la-rueda-de-la-fortuna.png" },
  "11": { name: "La Justicia", file: "11-la-justicia.png" },
  "12": { name: "El Colgado", file: "12-el-colgado.png" },
  "13": { name: "La Muerte", file: "13-la-muerte.png" },
  "14": { name: "La Templanza", file: "14-la-templanza.png" },
  "15": { name: "El Diablo", file: "15-el-diablo.png" },
  "16": { name: "La Torre", file: "16-la-torre.png" },
  "17": { name: "La Estrella", file: "17-la-estrella.png" },
  "18": { name: "La Luna", file: "18-la-luna.png" },
  "19": { name: "El Sol", file: "19-el-sol.png" },
  "20": { name: "El Juicio", file: "20-el-juicio.png" },
  "21": { name: "El Mundo", file: "21-el-mundo.png" },
  "22": { name: "As de Copas", file: "22-as-de-copas.png" },
  "23": { name: "Dos de Copas", file: "23-dos-de-copas.png" },
  "24": { name: "Tres de Copas", file: "24-tres-de-copas.png" },
  "25": { name: "Cuatro de Copas", file: "25-cuatro-de-copas.png" },
  "26": { name: "Cinco de Copas", file: "26-cinco-de-copas.png" },
  "27": { name: "Seis de Copas", file: "27-seis-de-copas.png" },
  "28": { name: "Siete de Copas", file: "28-siete-de-copas.png" },
  "29": { name: "Ocho de Copas", file: "29-ocho-de-copas.png" },
  "30": { name: "Nueve de Copas", file: "30-nueve-de-copas.png" },
  "31": { name: "Diez de Copas", file: "31-diez-de-copas.png" },
  "32": { name: "Sota de Copas", file: "32-sota-de-copas.png" },
  "33": { name: "Caballero de Copas", file: "33-caballero-de-copas.png" },
  "34": { name: "Reina de Copas", file: "34-reina-de-copas.png" },
  "35": { name: "Rey de Copas", file: "35-rey-de-copas.png" },
  "36": { name: "As de Espadas", file: "36-as-de-espadas.png" },
  "37": { name: "Dos de Espadas", file: "37-dos-de-espadas.png" },
  "38": { name: "Tres de Espadas", file: "38-tres-de-espadas.png" },
  "39": { name: "Cuatro de Espadas", file: "39-cuatro-de-espadas.png" },
  "40": { name: "Cinco de Espadas", file: "40-cinco-de-espadas.png" },
  "41": { name: "Seis de Espadas", file: "41-seis-de-espadas.png" },
  "42": { name: "Siete de Espadas", file: "42-siete-de-espadas.png" },
  "43": { name: "Ocho de Espadas", file: "43-ocho-de-espadas.png" },
  "44": { name: "Nueve de Espadas", file: "44-nueve-de-espadas.png" },
  "45": { name: "Diez de Espadas", file: "45-diez-de-espadas.png" },
  "46": { name: "Sota de Espadas", file: "46-sota-de-espadas.png" },
  "47": { name: "Caballero de Espadas", file: "47-caballero-de-espadas.png" },
  "48": { name: "Reina de Espadas", file: "48-reina-de-espadas.png" },
  "49": { name: "Rey de Espadas", file: "49-rey-de-espadas.png" },
  "50": { name: "As de Bastos", file: "50-as-de-bastos.png" },
  "51": { name: "Dos de Bastos", file: "51-dos-de-bastos.png" },
  "52": { name: "Tres de Bastos", file: "52-tres-de-bastos.png" },
  "53": { name: "Cuatro de Bastos", file: "53-cuatro-de-bastos.png" },
  "54": { name: "Cinco de Bastos", file: "54-cinco-de-bastos.png" },
  "55": { name: "Seis de Bastos", file: "55-seis-de-bastos.png" },
  "56": { name: "Siete de Bastos", file: "56-siete-de-bastos.png" },
  "57": { name: "Ocho de Bastos", file: "57-ocho-de-bastos.png" },
  "58": { name: "Nueve de Bastos", file: "58-nueve-de-bastos.png" },
  "59": { name: "Diez de Bastos", file: "59-diez-de-bastos.png" },
  "60": { name: "Sota de Bastos", file: "60-sota-de-bastos.png" },
  "61": { name: "Caballero de Bastos", file: "61-caballero-de-bastos.png" },
  "62": { name: "Reina de Bastos", file: "62-reina-de-bastos.png" },
  "63": { name: "Rey de Bastos", file: "63-rey-de-bastos.png" },
  "64": { name: "As de Oros", file: "64-as-de-oros.png" },
  "65": { name: "Dos de Oros", file: "65-dos-de-oros.png" },
  "66": { name: "Tres de Oros", file: "66-tres-de-oros.png" },
  "67": { name: "Cuatro de Oros", file: "67-cuatro-de-oros.png" },
  "68": { name: "Cinco de Oros", file: "68-cinco-de-oros.png" },
  "69": { name: "Seis de Oros", file: "69-seis-de-oros.png" },
  "70": { name: "Siete de Oros", file: "70-siete-de-oros.png" },
  "71": { name: "Ocho de Oros", file: "71-ocho-de-oros.png" },
  "72": { name: "Nueve de Oros", file: "72-nueve-de-oros.png" },
  "73": { name: "Diez de Oros", file: "73-diez-de-oros.png" },
  "74": { name: "Sota de Oros", file: "74-sota-de-oros.png" },
  "75": { name: "Caballero de Oros", file: "75-caballero-de-oros.png" },
  "76": { name: "Reina de Oros", file: "76-reina-de-oros.png" },
  "77": { name: "Rey de Oros", file: "77-rey-de-oros.png" },
};

export default async function Image({
  params,
  searchParams,
}: {
  params: Promise<{ cards: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { cards } = await params;
  const { q } = await searchParams;

  const selected = cards
    .split("-")
    .map((id) => CARD_NAMES[id])
    .filter(Boolean)
    .slice(0, 7);

  const question = q || "Mi tirada de Tarot AO";

  const cardWidth = selected.length <= 3 ? 150 : 112;
  const cardHeight = selected.length <= 3 ? 225 : 168;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#edf6f7",
          color: "#173f4b",
          padding: "42px 54px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            letterSpacing: "0.18em",
            fontWeight: 700,
            color: "#0f7288",
            marginBottom: 14,
          }}
        >
          TAROT AO · ANNA ORIOL
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 10,
          }}
        >
          Mi tirada
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#587b84",
            maxWidth: 1040,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            marginBottom: 28,
          }}
        >
          {question}
        </div>

        <div
          style={{
            display: "flex",
            gap: selected.length <= 3 ? 34 : 18,
            alignItems: "flex-start",
            flex: 1,
          }}
        >
          {selected.map((card) => (
            <div
              key={card.file}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={`${SITE_URL}/cards/${card.file}`}
                width={cardWidth}
                height={cardHeight}
                style={{
                  objectFit: "cover",
                  borderRadius: 12,
                  border: "1px solid #c8e0e4",
                }}
              />
              <div
                style={{
                  display: "flex",
                  marginTop: 9,
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#173f4b",
                  maxWidth: cardWidth,
                  textAlign: "center",
                }}
              >
                {card.name}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 15,
            color: "#78949b",
            marginTop: 12,
          }}
        >
          Lectura simbólica para la reflexión personal · Ver lectura completa
        </div>
      </div>
    ),
    { ...size }
  );
}
