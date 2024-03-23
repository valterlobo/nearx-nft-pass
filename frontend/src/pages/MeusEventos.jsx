import React from 'react'
import './MeusEventos.css';
import Event from '../components/Event';

const events = [
    {
      "nome": "Webinar: Introdução ao Metaverso",
      "descricao": "Junte-se a nós para uma introdução ao conceito emergente do metaverso, suas aplicações potenciais e seu impacto na tecnologia e na sociedade.",
      "dataInicio": "20/04/2024",
      "dataFim": "20/04/2024",
      "horaInicio": "11:00",
      "horaFim": "13:00",
      "autor": "Grace Hopper",
      "local": "Online",
      "instrucoes": "O webinar será transmitido ao vivo no YouTube. Inscreva-se com antecedência para receber o link de acesso.",
      "imagem": null,
      
      "link": "www.youtube.com/webnarmetaverso",
      "tipo": "normal"
    },
    {
      "nome": "Workshop: Construindo Aplicações Descentralizadas (DApps) com React e Solidity",
      "descricao": "Aprenda a desenvolver DApps usando React para o front-end e Solidity para o back-end na blockchain Ethereum. Este workshop é adequado para desenvolvedores web interessados em blockchain.",
      "dataInicio": "25/04/2024",
      "dataFim": "25/04/2024",
      "horaInicio": "16:00",
      "horaFim": "20:00",
      "autor": "Linus Torvalds",
      "local": "Universidade Técnica Local",
      "instrucoes": "Conhecimento básico de React é recomendado. Traga seu laptop com Node.js e truffle instalados.",
      "imagem": null,
     
      "link": "www.exemplo.com",
      "tipo": "master"
    },
    {
      "nome": "Meetup de NFTs: Explorando o Mundo dos Tokens Não Fungíveis",
      "descricao": "Junte-se a outros entusiastas de blockchain e NFTs para discutir tendências, projetos recentes e o futuro dos tokens não fungíveis.",
      "dataInicio": "30/04/2024",
      "dataFim": "30/04/2024",
      "horaInicio": "18:30",
      "horaFim": "19:30",
      "autor": "Margaret Hamilton",
      "local": "Coworking Space X",
      "instrucoes": "O evento será realizado em um espaço de coworking. Confirme sua presença com antecedência.",
      "imagem": null,
      
      "link": "www.meetup.com",
      "tipo": "vip"
    }
    ];

function MeusEventos() {
  return (
    <div className="catalog">
      <h2>Meus Eventos</h2>
      <div className="events-list">
        {events.map((event, index) => (
          <Event key={index} event={event} />
        ))}
      </div>
    </div>
  )
}

export default MeusEventos