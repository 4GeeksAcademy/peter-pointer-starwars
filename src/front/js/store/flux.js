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
      base_url: "https://playground.4geeks.com/contact",
      user: "pedro88",
    },
    actions: {
      setCurrentContacts: (contact) => {
        setStore({ currentContacts: contact });
      },

      // GET Method
      getContacts: async () => {
		const storeLocal = getStore()      
        const uri = `${storeLocal.base_url}/agendas/${storeLocal.user}/contacts`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        setStore({ contacts: data.contacts });
      },

      // POST Method
      addContacts: async (dataToSend, uri) => {
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

      // PUT Method
      updateContacts: async (contact, uri) => {
        const options = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        getActions().getContacts();
      },

      // DELETE Method
      deleteContacts: async (uri) => {
        const options = { method: "DELETE" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        getActions().getContacts();
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
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
