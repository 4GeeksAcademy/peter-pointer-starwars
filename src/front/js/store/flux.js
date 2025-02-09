const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        { title: "FIRST", background: "white", initial: "white" },
        { title: "SECOND", background: "white", initial: "white" },
      ],
      contacts: [],
      currentContacts: {},
      user: "pedro88",
      characters: [],
      planets: [],
      starships: [],
    },
    actions: {
      getCharacters: async () => {
        const uri = `${process.env.STARWARS_URL}people/`;
        const options = { method: "GET"};
        const response = await fetch (uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response. statusText);
          return;
        }
        const data = await response.json();
        setStore({ characters: data.results })
      },
      getPlanets: async () => {
        const uri = `${process.env.STARWARS_URL}planets/`;
        const options = { method: "GET"};
        const response = await fetch (uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response. statusText);
          return;
        }
        const data = await response.json();
        setStore({ planets: data.results }) 
      },
      getStarships: async () => {
        const uri = `${process.env.STARWARS_URL}starships/`;
        const options = { method: "GET"};
        const response = await fetch (uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response. statusText);
          return;
        }
        const data = await response.json();
        setStore({ starships: data.results }) 
      },
      setCurrentContacts: (contact) => {
        setStore({ currentContacts: contact });
      },
      getContacts: async () => {
        // GET Method
        const uri = `${process.env.CONTACTS_URL}/agendas/${getStore().user}/contacts`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        setStore({ contacts: data.contacts });
      },
      addContact: async (dataToSend) => {
        // POST Method
        const uri = `${process.env.CONTACTS_URL}/agendas/${getStore().user}/contacts`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        getActions().getContacts();
      },
      updateContact: async (contact, id) => {
        // PUT Method
        const dataToSend = contact
        const uri = `${process.env.CONTACTS_URL}/agendas/${getStore().user}/contacts/${id}`;
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        getActions().getContacts();
        setStore({ currentContacts: {} });
      },
      deleteContact: async (id) => {
        // DELETE Method
        const uri = `${process.env.CONTACTS_URL}/agendas/${getStore().user}/contacts/${id}`;
        const options = { method: "DELETE" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        getActions().getContacts();
      },
      exampleFunction: () => {
        // Use getActions to call a function within a fuction
        getActions().changeColor(0, "green");
      },
      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
