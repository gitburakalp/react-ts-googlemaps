import React, { InputHTMLAttributes } from "react";

interface ContactProps {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <input id={name} {...rest} />
    </div>
  );
};

class Contact extends React.Component<ContactProps> {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: "",
      username: "",
      email: "",
      phone: "",
      website: ""
    };
  }

  componentDidMount() {
    const url = ["https://jsonplaceholder.typicode.com/users?id=1"].join("");

    fetch(url)
      .then(res => res.json())
      .then(data => {
        data.map(el => {
          this.setState({
            id: el.id,
            name: el.name,
            username: el.username,
            email: el.email,
            phone: el.phone,
            website: el.website
          });
        });
      });
  }

  render() {
    const { id, name } = this.state;

    return (
      <div>
        <div>Form</div>
        <Input label={id} value={name} />
      </div>
    );
  }
}

export default Contact;
