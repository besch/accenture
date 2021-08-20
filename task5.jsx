import React, { useEffect, useState } from 'react';

const css = {
  fontSize: "12px"
}

function CarsFuuel(props){
  return <h1 style={css}>Car's fuel consumed: {props.children}</h1>
}

function Alert(props){
  const fuel = props.fuel;
  const [state, setState] = useState(0);

  useEffect(() => {
    if (fuel > 1200){
      setState(1);
    }
  });

  if (state){
    return <h2 style={{color:"red"}}>Alert</h2>;
  } else {
    return <h2>All is fine</h2>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    
    // We declare the state
    this.state = {                       
      x: 1,    
      f: 0
    }
  }

  updateCoordinates() {
    setInterval(()=> {this.setState(prevState => ({x: prevState.x + 1, f: 1 + prevState.f + prevState.x * 10}))}, 1000)
  }

  componentDidMount(){
    this.updateCoordinates();
  }

  render() {
    var x1 = this.state.x;
    var fuel = this.state.f;

    return (
      <div>
        <h1>Position - {x1}</h1>
        <CarsFuuel>{fuel}</CarsFuuel>
        <Alert fuel={fuel}/>
      </div>
    );
  }
}

export default App;



// 7 typo; props.fule can be destructed fucntion CarsFuel({ children })
// 13 state naame is too generic, try using eg. setFuelState
// 15 add dependancy to useEffect(() => {}, [fuel])
// 21 function Alert could be refactored to:

// const getAlert = state => {
//     if (state) {
//         return {
//             message: 'Alert',
//             style: {color:'red'}
//         }
//     } else {
//         return {
//             message: 'All is fine',
//             style: {}
//         }
//     }
// }

// return (
//     <h2 style={getAlert().style}>
//         etAlert().message
//     </h2>
// )

// 40 potentially other properties of state could be overwritten, sholud be something like

// setInterval(()=> {this.setState(prevState => ({
//     ...prevState ,
//     x: prevState.x + 1, f: 1 + prevState.f + prevState.x * 10 }))
// }, 1000)