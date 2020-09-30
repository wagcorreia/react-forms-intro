import React from "react";
import "bulma/css/bulma.css";

import TextInput from "./TextInput";

const bootcamps = ["Web Dev", "UX/UI Design", "Data Analytics"];

function checkErrors(state) {
  const errors = {};

  if (!state.name) {
    errors.name = "Name is required!";
  }

  if (
    !state.email ||
    !state.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
  ) {
    errors.email = "Email is required and should be a valid email";
  }

  if (
    !state.password ||
    !state.password.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/)
  ) {
    errors.password =
      "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.";
  }

  return errors;
}

class Form extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    rememberMe: false,
    allowNewsletter: "NO",
    bootcamp: "Web Dev",
    touched: {
      name: false,
      email: false,
      password: false,
    },
  };

  // // Executa este método toda vez que o state é alterado
  // componentDidUpdate() {
  //   this.errors = { ...this.checkErrors(this.state) };
  //   console.log(this.state);
  // }

  handleChange = (event) => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  // handleFocus = (event) => {
  //   this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  // };

  handleBlur = (event) => {
    this.setState({
      touched: { ...this.state.touched, [event.target.name]: true },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;

    if (!name || !email || !password) {
      for (let key in this.state.touched) {
        this.setState((prevState) => {
          return {
            touched: { ...prevState.touched, [key]: true },
          };
        });
      }
      return;
    }

    console.log(this.state);
  };

  render() {
    const errors = checkErrors(this.state);

    const shouldMarkError = (name, errors) => {
      if (this.state.touched[name]) {
        return errors[name];
      }

      return null;
    };

    return (
      <div className="container mt-5">
        <form onSubmit={this.handleSubmit}>
          {/* Name field */}
          <TextInput
            type="text"
            label="Name"
            error={shouldMarkError("name", errors)}
            name="name"
            value={this.state.name}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
          />
          {/* Email field */}
          <TextInput
            type="email"
            label="E-mail"
            error={shouldMarkError("email", errors)}
            name="email"
            value={this.state.email}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
          />
          {/* Password field */}
          <TextInput
            type="password"
            label="Password"
            error={shouldMarkError("password", errors)}
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
          />

          {/* Checkbox example */}
          <label className="checkbox">
            <input
              type="checkbox"
              name="rememberMe"
              onChange={() =>
                this.setState((prevState) => ({
                  rememberMe: !prevState.rememberMe,
                }))
              }
              checked={this.state.rememberMe}
            />
            Remember me
          </label>

          {/* Radio button example */}
          {/* ATENÇĀO: A propriedade 'name' dos radios precisa ser a mesma, e o value dos radios NĀO vai apontar para o state, e sim conter um valor fixo */}
          <div className="control">
            <label>Would you like to receive our newsletter?</label>
            <label className="radio">
              <input
                type="radio"
                name="allowNewsletter"
                value="YES"
                onChange={this.handleChange}
              />
              Yes
            </label>
            <label className="radio">
              <input
                type="radio"
                name="allowNewsletter"
                value="NO"
                onChange={this.handleChange}
              />
              No
            </label>
          </div>

          {/* Select (dropdown) example */}
          <div className="control">
            <label>Select your bootcamp</label>
            <div className="select">
              <select
                name="bootcamp"
                onChange={this.handleChange}
                value={this.state.bootcamp}
              >
                {bootcamps.map((bootcamp, i) => (
                  <option key={i} value={bootcamp}>
                    {bootcamp}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit button */}
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
