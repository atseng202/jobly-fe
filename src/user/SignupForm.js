import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/*
 * Renders the signup form
 *
 * props:
 * -signup: fn to be called in parent
 *
 * state:
 * - formData {username, password, firstName, lastName, email}
 *
 * App -> Routes -> SignupForm
 */

const initialFormData = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

function SignupForm({ signup }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(null);
  const history = useHistory();

  /** Handle input changes and show them on input */

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  /** Handle submitting the Signup Form */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);
    setFormData(initialFormData);

    if (result.success === true) {
      history.push("/");
    } else {
      setErrors(result.errors.join(""));
    }
  }

  /* Helper function for form validation */

  function notDone() {
    const invalidInputArr = Object.keys(formData).filter((key) => {
      return formData[key].length < 1;
    });

    return invalidInputArr.length > 0;
  }

  let errorMsg = errors ? <div className="alert alert-danger">{errors}</div> : null;

  return (
    <Container>
      <h2 className="my-4">Sign Up</h2>

      {errorMsg}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="firstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={notDone()}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default SignupForm;
