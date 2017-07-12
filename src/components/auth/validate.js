const validate = values => {
  const errors = {}
  if (!values.fname) {
    errors.fname = 'Please enter first name.'
  }
  if (!values.lname) {
    errors.lname = 'Please enter last name.'
  }
  if (!values.dob) {
    errors.dob = 'Please select DOB.'
  }
  if (!values.email) {
    errors.email = 'Please enter email.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.homezip) {
    errors.homezip = 'Please enter home zipcode.'
  }
  if (!values.password) {
    errors.password = 'Please enter password.'
  }
  if (!values.gender) {
    errors.gender = 'Please specify your gender.'
  }
  if (!values.lang) {
    errors.lang = 'Please select preferred language.'
  }
  return errors
}
export default validate
