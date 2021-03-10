import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";

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

function ProfileForm({ currentUser }) {
  const [formData, setFormData] = useState({
    username: currentUser.username,
    password: "",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  });
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

  /** Handle submit of edit form */
  async function handleSubmit(evt) {
    evt.preventDefault();
    function updateUser(data) {
      return 0;
    }
    const result = await updateUser(formData);
    setFormData({
      username: currentUser.username,
      password: "",
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    });

    if (result.success === true) {
    } else {
      // TODO: set up error handling in presentable format
      alert("Failed to edit profile");
    }
  }

  /* Helper function for form validation */
  function notDone() {
    const invalidInputArr = Object.keys(formData).filter((key) => {
      return formData[key].length < 1;
    });

    return invalidInputArr.length > 0;
  }

  return <div>ProfileForm goes here!</div>;
}

export default ProfileForm;
