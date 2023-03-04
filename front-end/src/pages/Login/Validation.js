import { object, string} from 'yup'
let validations = object({
    email:string().email("please enter in email format").required("This field is required"),
    password:string().min(5,"Minimum character is 5").required("This field is required")
})
export default validations;