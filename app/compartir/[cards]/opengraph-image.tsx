import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const files: Record<string,string> = {
  "00":"00-el-loco.png","01":"01-el-mago.png","02":"02-la-sacerdotisa.png","03":"03-la-emperatriz.png","04":"04-el-emperador.png","05":"05-el-sacerdote.png","06":"06-los-enamorados.png","07":"07-el-carro.png","08":"08-la-fuerza.png","09":"09-el-ermitano.png","10":"10-la-rueda-de-la-fortuna.png","11":"11-la-justicia.png","12":"12-el-colgado.png","13":"13-la-muerte.png","14":"14-la-templanza.png","15":"15-el-diablo.png","16":"16-la-torre.png","17":"17-la-estrella.png","18":"18-la-luna.png","19":"19-el-sol.png","20":"20-el-juicio.png","21":"21-el-mundo.png","22":"22-as-de-copas.png","23":"23-dos-de-copas.png","24":"24-tres-de-copas.png","25":"25-cuatro-de-copas.png","26":"26-cinco-de-copas.png","27":"27-seis-de-copas.png","28":"28-siete-de-copas.png","29":"29-ocho-de-copas.png","30":"30-nueve-de-copas.png","31":"31-diez-de-copas.png","32":"32-sota-de-copas.png","33":"33-caballero-de-copas.png","34":"34-reina-de-copas.png","35":"35-rey-de-copas.png","36":"36-as-de-espadas.png","37":"37-dos-de-espadas.png","38":"38-tres-de-espadas.png","39":"39-cuatro-de-espadas.png","40":"40-cinco-de-espadas.png","41":"41-seis-de-espadas.png","42":"42-siete-de-espadas.png","43":"43-ocho-de-espadas.png","44":"44-nueve-de-espadas.png","45":"45-diez-de-espadas.png","46":"46-sota-de-espadas.png","47":"47-caballero-de-espadas.png","48":"48-reina-de-espadas.png","49":"49-rey-de-espadas.png","50":"50-as-de-bastos.png","51":"51-dos-de-bastos.png","52":"52-tres-de-bastos.png","53":"53-cuatro-de-bastos.png","54":"54-cinco-de-bastos.png","55":"55-seis-de-bastos.png","56":"56-siete-de-bastos.png","57":"57-ocho-de-bastos.png","58":"58-nueve-de-bastos.png","59":"59-diez-de-bastos.png","60":"60-sota-de-bastos.png","61":"61-caballero-de-bastos.png","62":"62-reina-de-bastos.png","63":"63-rey-de-bastos.png","64":"64-as-de-oros.png","65":"65-dos-de-oros.png","66":"66-tres-de-oros.png","67":"67-cuatro-de-oros.png","68":"68-cinco-de-oros.png","69":"69-seis-de-oros.png","70":"70-siete-de-oros.png","71":"71-ocho-de-oros.png","72":"72-nueve-de-oros.png","73":"73-diez-de-oros.png","74":"74-sota-de-oros.png","75":"75-caballero-de-oros.png","76":"76-reina-de-oros.png","77":"77-rey-de-oros.png"
};

export default async function Image({params,request}:{params:Promise<{cards:string}>;request:NextRequest}){
  const {cards} = await params;
  const ids = cards.split("-").filter(id => files[id]).slice(0,7);
  const origin = new URL(request.url).origin;
  const q = new URL(request.url).searchParams.get("q");
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",background:"#f7f3ec",padding:40,fontFamily:"sans-serif"}}>
    <div style={{display:"flex",fontSize:28,letterSpacing:4}}>TAROT AO</div>
    {q && <div style={{display:"flex",fontSize:24,marginTop:20,maxWidth:1050}}>{q}</div>}
    <div style={{display:"flex",gap:14,marginTop:30,flex:1,alignItems:"center"}}>
      {ids.map(id => <img key={id} src={`${origin}/cards/${files[id]}`} style={{height:440,width:"auto",objectFit:"contain",borderRadius:8}} />)}
    </div>
    <div style={{display:"flex",fontSize:18,opacity:.65}}>Mi tirada · Tarot simbólico para la reflexión</div>
  </div>, {width:1200,height:630});
}
