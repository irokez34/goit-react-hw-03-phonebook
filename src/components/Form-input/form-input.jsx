import React from 'react';
import './form-input.css';
class FormInput extends React.Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.sendContactData({
      name: this.state.name,
      number: this.state.number,
    });
    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-container">
          <div className="input-name">
            <h3>Name</h3>
            <input
              type="text"
              name="name"
              className="input"
              value={this.state.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-number">
            <h3>Number</h3>
            <input
              type="tel"
              name="number"
              className="input"
              value={this.state.number}
              onChange={this.handleChange}
              required
            />
          </div>
          <button className="btn" type="submit">
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

export default FormInput;
