import React from 'react'

function Clima({resultado}){

    // extraer los valores
    const { name, main, } = resultado

    if(!name) return null;

    const kelvin = 273.15;

    return(
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>La temperatura de {name} es:</h2>
                <p className="temperatura"></p>
                <p>
                    { parseInt(main.temp - kelvin, 10) } <span> &#x2103; </span>
                </p>
            </div>
        </div>
    )
}
export default Clima;