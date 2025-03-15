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
      user: "",
      characters: [],
      planets: [],
      starships: [],
      character: {},
      planet: {},
      starship: {},
      favorites: [],
      isLogged: false,
      isAdmin: false,
      alert: {text:'', visible: false, background: 'primary' },
    },
    actions: {
      setUser: (newUser) => { setStore({ user: newUser }) },
      setAlert: (newAlert) => { setStore({ alert: newAlert }) },
      setIsLogged: (value) => { setStore({ isLogged: value }) },
      setIsAdmin: (value) => { setStore({ isAdmin: value }) },
      login: async (dataToSend) => {
        const uri = `${process.env.BACKEND_URL}/api/login`;
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "Application/json"
          },
          body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options)
        if (!response.ok) {
          console.log('Error login:', response.status, response.statusText)
          return
        }
        const data = await response.json();
        setStore({
          user: data.results,
          isAdmin: data.results.is_admin,
          isLogged: true,
          alert: { text: data.message, visible: true, background: 'success' },
        })
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.results))
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        //volver el store a valores de no logeado( user, is logged, is adim , alert)
        getActions().setAlert({ text: '', visible: false, background: 'primary' });
        setStore({
          user: '',
          isLogged: false,
          isAdmin: false,
          alert: { text: "User left!", visible: true, background: 'danger' },
        })
      },
      register: async (dataToSend) => {
        const uri = `${process.env.BACKEND_URL}/api/users`;
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "Application/json"
          },
          body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options)
        if (!response.ok) {
          console.log('Error registering:', response.status, response.statusText)
          return
        }
        const data = await response.json();
        setStore({
          user: data.results,
          isAdmin: data.results.is_admin,
          isLogged: true,
          alert: { text: data.message, visible: true, background: 'success' },
        })
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.results))
      },
      getPost: async (postId) => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/posts/${postId}`;
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Berear ${token}`
          }
        }
        const response = await fetch(uri, options)
      },
      updatePost: async (postId, dataToSend) => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/posts/${postId}`;
        const options = {
          method: 'PUT',
          headers: {
            Authorization: `Berear ${token}`,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options)
        if (!response.ok) {
          console.log("Error", response.status, response.statusText);
          return
        }
        const data = await response.json()
      },
      getUser: async (userId) => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/users/${userId}`;
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataToSend)
        };

        const response = await fetch(uri, options);
        if (!response.ok) {
          console.error('Error getting profile', response.status, response.statusText);
          return;
        }
        const data = await response.json();
      },
      updateProfile: async (updatedUser) => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/users`;
        const options = {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "Application/json"
          },
          body: JSON.stringify(updatedUser)
        };

        const response = await fetch(uri, options);
        if (!response.ok) {
          console.error('Error editing profile', response.status, response.statusText);
          return;
        }

        const data = await response.json();
        setStore({user: data.results})
      },
      setCategory: (cat) => {
        setStore({ category: cat })
      },
      setSelectedItem: (category, uid) => {
        fetch(`${base}/${category}/${uid}`)
          .then(response => response.json())
          .then(data => {
            if (data.result) {
              setStore({ selectedItem: data.result.properties });
            } else {
              console.error("Invalid response from API", data);
            }
          })
          .catch(error => console.error("Error fetching details:", error));


      },
      addFavorite: (item) => {
        const store = getStore();
        if (!store.favorites.some((fav) => fav.uid === item.uid)) {
          setStore({ favorites: [...store.favorites, item] });
        }
      },
      removeFavorite: (uid) => {
        const store = getStore();
        setStore({
          favorites: store.favorites.filter((fav) => fav.uid !== uid),
        });
      },
      getCharacters: async () => {
        const uri = `${process.env.STARWARS_URL}people/`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        setStore({ characters: data.results });
      },
      getPlanets: async () => {
        const uri = `${process.env.STARWARS_URL}planets/`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        setStore({ planets: data.results });
      },
      getStarships: async () => {
        const uri = `${process.env.STARWARS_URL}starships/`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        setStore({ starships: data.results });
      },
      getCharacter: async (uid) => {
        const uri = `${process.env.STARWARS_URL}people/${uid}`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        data.result.properties.uid = uid;
        setStore({ character: data.result.properties });
      },
      getPlanet: async (uid) => {
        const uri = `${process.env.STARWARS_URL}planets/${uid}`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        data.result.properties.uid = uid;
        setStore({ planet: data.result.properties });
      },
      getStarship: async (uid) => {
        const uri = `${process.env.STARWARS_URL}starships/${uid}`;
        const options = { method: "GET" };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status, response.statusText);
          return;
        }
        const data = await response.json();
        data.result.properties.uid = uid;
        setStore({ starship: data.result.properties });
      },
      setCurrentContacts: (contact) => {
        setStore({ currentContacts: contact });
      },
      getContacts: async () => {
        // GET Method
        const uri = `${process.env.CONTACTS_URL}/agendas/${getStore().user
          }/contacts`;
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
        const uri = `${process.env.CONTACTS_URL}/agendas/${getStore().user
          }/contacts`;
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
        const dataToSend = contact;
        const uri = `${process.env.CONTACTS_URL}/agendas/${getStore().user
          }/contacts/${id}`;
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
        const uri = `${process.env.CONTACTS_URL}/agendas/${getStore().user
          }/contacts/${id}`;
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
