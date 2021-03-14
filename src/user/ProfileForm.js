import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import JoblyApi from '../api';

/*
 * Renders the ProfileForm
 *
 * props:
 * - currentUser: obj like
 *     { username, firstName, lastName, email, isAdmin, jobs }
 *
 * state:
 * - formData {username, password, firstName, lastName, email}
 *
 * App -> Routes -> ProfileForm
 */

function ProfileForm({ currentUser, update }) {
  const [formData, setFormData] = useState({
    username: currentUser ? currentUser.username : "",
    password: "",
    firstName: currentUser ? currentUser.firstName: "",
    lastName: currentUser ? currentUser.lastName: "",
    email: currentUser ? currentUser.email: "",
  });
  const [errors, setErrors] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const history = useHistory();

  console.debug(
    "ProfileForm",
    "currentUser: ", currentUser,
    "formData: ", formData,
    "errors: ", errors,
  )

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

  /** Handle submit of edit form */
  async function handleSubmit(evt) {
    evt.preventDefault();

    // username cannot be edited as per our update schema
    let editableData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    }

    let username = formData.username;
    let changedUser;

    const result = await update(username, editableData);
    
    if (result.success === true) {
      setUpdateSuccess("Successfully updated profile!")
      setErrors(null);
      setFormData( (prevData) => (
        {
          ...prevData,
          password: "",
        }
      ));
    } else {
      setErrors(result.errors.join(""));
      setUpdateSuccess(null);
    }
    
  }
  
  /* Helper function for form validation */
  function notDone() {
    const invalidInputArr = Object.keys(formData).filter((key) => {
      return formData[key].length < 1;
    });

    return invalidInputArr.length > 0;
  }

  let errorMsg = errors ? (
    <div className="alert alert-danger">{errors}</div>
  ) : null;

  let successMsg = updateSuccess ? (
    <div className="alert alert-success">{updateSuccess}</div>
  ) : null;

  if (!currentUser) return <div>Loading...</div>;
  return (
    <Container>
      <h2 className="my-4">Edit Profile!</h2>

      {errorMsg}

      {successMsg}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={true}
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

        <Button variant="primary" type="submit" disabled={notDone()}>
          Submit
        </Button>
      </Form>
      
    </Container>
  )  
}

export default ProfileForm;
