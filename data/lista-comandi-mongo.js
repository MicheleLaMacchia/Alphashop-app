// creare un utente
db.createUser({
  user: "WebClient",
  pwd: "WebClient",
  roles: [{ role: "readWrite", db: "gestfid" }],
});
// inserire un documento nella collection (in questo caso la collection 'clienti')
db.clienti.insertOne({
  codfid: "67100947",
  nominativo: "Michele La Macchia",
  indirizzo: "Via dei Mille, 52",
  comune: "Roma",
  cap: "00143",
  prov: "RM",
  mail: "michele_lamacchia@xantrix.it",
  attivo: true,
  spese: { numero: 10, valore: 150.69 },
  datacreazione: new Date(),
  cards: { bollini: 180, ultimaspesa: "2020-01-01" },
});
// inserire più documenti nella collection (in questo caso la collection 'clienti')
db.clienti.insertMany([
  { codfid: "67100920", nominativo: "NADIA BIANCHI", attivo: true },
  {
    codfid: "67100900",
    nominativo: "ARTURO VIRDIS",
    mail: "",
    attivo: true,
    cards: { bollini: 100, ultimaspesa: new Date() },
  },
  {
    codfid: "67100876",
    nominativo: "CATRINA DEMARTIS",
    indirizzo: "P.ZZA GIOVANNI XXIII",
    mail: "dema@test.it",
    attivo: true,
    cards: { bollini: 100, ultimaspesa: new Date() },
  },
  {
    codfid: "000473202",
    nominativo: "BARILLA CORNETTI INTEGRALI 240 GR.",
    attivo: true,
    cards: { bollini: 100, ultimaspesa: new Date() },
  },
]);
// effettuare un update di un document. Il primo parametro è il campo sul quale effettuare la ricerca il secondo parametro $set descrive l'update da fare
db.clienti.updateOne(
  { codfid: "67100920" },
  {
    $set: {
      cards: { bollini: 360, ultimaspesa: new Date() },
    },
  }
);
// effettuare la ricerca di un document tramite un campo
db.clienti.findOne({
  codfid: "67100920",
});
// effettuare la ricerca di un document tramite un campo; nel secondo parametro indico quali campi non voglio visualizzare nella ricerca (0 non lo visualizzo, 1 lo visualizzo)
db.clienti.findOne(
  {
    codfid: "67100920",
  },
  {
    _id: 0,
    // nominativo:1
  }
);
// effettuare una ricerca con un filtro (il find() restituisce tutto). Il secondo parametro indica quali campi voglio visualizzare per i risultati (0 non lo visualizzo, 1 lo visualizzo)
db.clienti.find(
  {
    nominativo: /VIRDIS/,
  },
  {
    _id: 0,
  }
);
// la stessa ricerca di prima ordinata per codfid (eliminare gli 'a capo' tra i punti perchè nella barra dei comandi del mongo viene visto come un invio)
db.clienti
  .find(
    {
      nominativo: /VIRDIS/,
    },
    {
      _id: 0,
    }
  )
  .sort({ codfid: 1 });
// effettuare un filtro in base ad un oggetto interno ($gt sta per maggiore (greater than))
db.clienti
  .find(
    {
      "cards.bollini": { $gt: 1000 },
    },
    {
      _id: 0,
    }
  )
  .sort({ "cards.bollini": 1 /*con -1 va in ordine inverso*/ });
// stessa ricerca di prima ma con ricerca less than 500($lt) e greater than 1000($gt) come range e visualizzazione dei soli primi 2 risultati con limit
db.clienti
  .find(
    {
      "cards.bollini": { $gt: 50, $lt: 500 },
    },
    {
      _id: 0,
    }
  )
  .sort({ "cards.bollini": 1 })
  .limit(2);
// eliminare un documento
db.clienti.deleteOne({ codfid: "67000095" });
// eliminare più documenti in base ad un criterio
db.clienti.deleteMany({
  "cards.bollini": { $lt: 100 },
});
// eliminare tutti i documenti
db.clienti.drop();
