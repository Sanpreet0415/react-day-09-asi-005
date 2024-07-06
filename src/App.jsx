// App.jsx

import React, { useReducer } from 'react';
import './App.css';

const initialState = {
  name: '',
  establishment_year: '',
  address: {
    building: '',
    street: '',
    city: {
      name: '',
      locality: {
        pinCode: '',
        landmark: ''
      }
    },
    state: '',
    coordinates: {
      latitude: '',
      longitude: ''
    }
  },
  courses_offered: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'UPDATE_ADDRESS_FIELD':
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.value
        }
      };
    case 'UPDATE_CITY_FIELD':
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            [action.field]: action.value
          }
        }
      };
    case 'UPDATE_LOCALITY_FIELD':
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.field]: action.value
            }
          }
        }
      };
    case 'ADD_COURSE':
      return {
        ...state,
        courses_offered: [...state.courses_offered, action.course]
      };
    case 'RESET_FORM':
      return initialState;
    default:
      throw new Error('Invalid action type');
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic can be added here, e.g., sending data to an API
    console.log(state); // Display submitted state in console for now
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  return (
    <div className="App">
      <h1>Add College Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          College Name:
          <input
            type="text"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'UPDATE_FIELD', field: 'name', value: e.target.value })
            }
            required
          />
        </label>
        <br />
        <label>
          Establishment Year:
          <input
            type="text"
            value={state.establishment_year}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_FIELD',
                field: 'establishment_year',
                value: e.target.value
              })
            }
            required
          />
        </label>
        <br />
        <label>
          Building:
          <input
            type="text"
            value={state.address.building}
            onChange={(e) =>
              dispatch({
                type: 'UPDATE_ADDRESS_FIELD',
                field: 'building',
                value: e.target.value
              })
            }
            required
          />
        </label>
        <br />
        {/* Add other address fields similarly */}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
      <div className="college-details">
        <h2>Entered College Details</h2>
        <p>Name: {state.name}</p>
        <p>Establishment Year: {state.establishment_year}</p>
        {/* Display other details similarly */}
      </div>
    </div>
  );
};

export default App;
