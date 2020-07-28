import React from "react";

function Home() {
    return(
        <main className="home-page">
            <h1 className="m-5">React Swapi</h1>
            <p>
                This page was made to better understand React and API consumption.
                I chose the swapi because it has multiple routes 
                to be able to use React Router.
                And the page is in English because the information from 
                the API is in English.
            </p>
            <a href="https://swapi.dev">Go to the API!</a>
        </main>
    );
}

export default Home;