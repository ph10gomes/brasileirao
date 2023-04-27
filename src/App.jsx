import { useState, useEffect } from "react";
import { getCampeonato } from "./services/api";

import "./App.css";

function App() {
   const [brasileirao, setBrasileirao] = useState([]);

   async function fetchData() {
      const response = await getCampeonato("tabela");
      console.log("response", response);
      setBrasileirao(response);
   }

   useEffect(() => {
      if (brasileirao.length === 0) {
         console.log("useEffect executed");
         fetchData();
      }
   }, [brasileirao]);

   return (
      <div className="App">
         <header>
            <h1>BRASILEIRÃO 2023</h1>
            <div className="row">
               <label>TABELA DE CLASSIFICAÇÃO</label>
               {/* <label>JOGOS</label> */}
            </div>
         </header>

         {brasileirao.length === 0 ? (
            <div className="loading">Carregando...</div>
         ) : (
            <>
               <table>
                  <thead>
                     <tr>
                        <th />
                        <th />
                        <th className="txtLeft">Clube</th>
                        <th>Pts</th>
                        <th>Partidas</th>
                        <th>Vitórias</th>
                        <th>Empates</th>
                        <th>Derrotas</th>
                        <th>GM</th>
                        <th>GC</th>
                        <th>SG</th>
                        <th>AP (%)</th>
                     </tr>
                  </thead>
                  <tbody>
                     {brasileirao.map((time, index) => (
                        <tr
                           key={index}
                           className={`${index % 2 === 0 ? "odd" : "even"} 
                                       ${index < 4 && "libertadores"} 
                                       ${index >= 4 && index <= 5 && "pre-libertadores"}
                                       ${index >= 6 && index <= 11 && "sula"}
                                       ${index >= 16 && index <= 19 && "z4"}
                                    `}>
                           <td>
                              <img src={time.time.escudo} alt={time.nome} width="30" height="30" />
                           </td>
                           <td>{time.posicao}</td>
                           <td className="txtLeft">{time.time.nome_popular}</td>
                           <td>{time.pontos}</td>
                           <td>{time.jogos}</td>
                           <td>{time.vitorias}</td>
                           <td>{time.empates}</td>
                           <td>{time.derrotas}</td>
                           <td>{time.gols_pro}</td>
                           <td>{time.gols_contra}</td>
                           <td>{time.saldo_gols}</td>
                           <td>{time.aproveitamento} %</td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               <footer
                  style={{
                     fontFamily: "Segoe UI",
                     fontSize: "12px",
                     color: "#333",
                     fontWeight: "bold",
                  }}>
                  <ul
                     style={{
                        listStyle: "none",
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                     }}>
                     <li style={{ display: "flex", alignItems: "center" }}>
                        <span
                           style={{
                              backgroundColor: "#00b16a",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "5px",
                           }}></span>
                        <span>Fase de grupos da Copa Libertadores</span>
                     </li>
                     <li style={{ display: "flex", alignItems: "center" }}>
                        <span
                           style={{
                              backgroundColor: "#0077c2",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "5px",
                           }}></span>
                        <span>Pré-Libertadores</span>
                     </li>
                     <li style={{ display: "flex", alignItems: "center" }}>
                        <span
                           style={{
                              backgroundColor: "orange",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "5px",
                           }}></span>
                        <span>Fase de grupos da Copa Sul-Americana</span>
                     </li>
                     <li style={{ display: "flex", alignItems: "center" }}>
                        <span
                           style={{
                              backgroundColor: "#e74c3c",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              display: "inline-block",
                              marginRight: "5px",
                           }}></span>
                        <span>Rebaixamento</span>
                     </li>
                  </ul>
               </footer>
            </>
         )}
      </div>
   );
}

export default App;
