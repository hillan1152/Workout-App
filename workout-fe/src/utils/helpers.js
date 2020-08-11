export function capital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
};

export const baseURL = "https://weight-lifting-journal1.herokuapp.com";

// export const toggleDelete = (open, setOpen) => {
//   setOpen(!open)
// }

export const nameStyle = {
  display: 'flex', 
  justifyContent: 'center', 
  justifyContent: 'space-evenly'
}
export const addStyle = {
  fontSize: "3rem", 
  color:"lightGreen", 
  marginTop: "2%"
}
export const editStyle = {
  fontSize: "1.5rem", 
  color:"orange", 
  marginTop: "5%", 
  marginLeft: "5%"
}
export const deleteStyle = {
  fontSize: "1.5rem", 
  color:"red", 
  background: "none",
  marginTop: "5%",
  marginRight: "5%"
}