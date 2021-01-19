import { useState } from "react";

const ClientiComponent = () => {

  const [clienti] = useState(
    [
      { nome: 'Michele La Macchia', bollini: '1580', data: '02/01/2021' },
      { nome: 'Antonello Venditti', bollini: '830', data: '23/12/2020' },
      { nome: 'Carlo Verdone', bollini: '140', data: '15/01/2021' },
      { nome: 'Thomas Milian', bollini: '560', data: '18/01/2021' },
    ]
  )

  return (
    <div className="ClientiComponent">
      <h1>Clienti disponibili</h1>
      <table>
        <thead>
          <tr>
            <th>Nominativo</th>
            <th>Bollini</th>
            <th>Ultima Spesa</th>
          </tr>
        </thead>
        <tbody>
          {clienti.map(e => (
            <tr key={e.nome}>
              <td>{e.nome}</td>
              <td>{e.bollini}</td>
              <td>{e.data}</td>
            </tr>)
          )}
        </tbody>
      </table>
    </div>);
}

export default ClientiComponent;