import { object, string} from 'yup'
let validations = object({
    name:string("this field must contain only characters").required("This field is required"),
    age:string("this field must contain only characters"),
    address:string("this field must contain only characters"),
    job:string("this field must contain only characters"),
    title:string("this field must contain only characters")
})
export default validations;