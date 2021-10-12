import React, { useRef } from "react";
import { generate } from "shortid";
import { useState } from "react";
import styles from "./Form.module.css";
import FormData from "../Phonebook/formData";

const Form = ({ onSubmit }) => {
  const [state, setState] = useState({ name: "", number: "" });

  const nameInputIdRef = useRef(generate());
  const numberInputIdRef = useRef(generate());

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    reset();
  };

  const reset = () => {
    setState({
      name: "",
      number: "",
    });
  };

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.FormContainer}>
        <div className={styles.Name}>
          <label className={styles.Label} htmlFor={nameInputIdRef.current}>
            Name
            <input
              {...FormData.name}
              className={styles.Input}
              required
              value={state.name}
              onChange={handleChange}
              id={nameInputIdRef.current}
            />
          </label>
        </div>
        <div className={styles.Tel}>
          <label className={styles.Label} htmlFor={numberInputIdRef.current}>
            Number
            <input
              {...FormData.number}
              className={styles.Input}
              required
              value={state.number}
              onChange={handleChange}
              id={numberInputIdRef.current}
            />
          </label>
        </div>
        <button type="submit" className={styles.NameBtn}>
          Add contact
        </button>
      </div>
    </form>
  );
};

export default Form;
// class Form extends Component {
//   state = {
//     name: "",
//     number: "",
//   };

//   nameInputId = generate();
//   numberInputId = generate();

//   handleChange = (e) => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.onSubmit(this.state);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({
//       name: "",
//       number: "",
//     });
//   };

//   render() {
//     const { name, number } = this.state;
//     const { handleSubmit, handleChange } = this;
//     return (
//       <form className={styles.Form} onSubmit={handleSubmit}>
//         <div className={styles.FormContainer}>
//           <div className={styles.Name}>
//             <label className={styles.Label} htmlFor={this.nameInputId}>
//               Name
//               <input
//                 {...FormData.name}
//                 className={styles.Input}
//                 required
//                 value={name}
//                 onChange={handleChange}
//                 id={this.nameInputId}
//               />
//             </label>
//           </div>
//           <div className={styles.Tel}>
//             <label className={styles.Label} htmlFor={this.numberInputId}>
//               Number
//               <input
//                 {...FormData.number}
//                 className={styles.Input}
//                 required
//                 value={number}
//                 onChange={handleChange}
//                 id={this.numberInputId}
//               />
//             </label>
//           </div>
//           <button type="submit" className={styles.NameBtn}>
//             Add contact
//           </button>
//         </div>
//       </form>
//     );
//   }
// }
