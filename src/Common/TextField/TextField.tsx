import { TextFieldProps } from "../Interfaces/Interfaces";

export default function TextField(props: TextFieldProps) {
  return (
    <>
      <input
        type={props.type}
        onChange={(e) =>
          props.setValue ? props.setValue(e.target.value) : null
        }
        className={`form-control rounded-pill ${props.additionalClasses}`}
        style={{ width: `${props.width}` }}
        placeholder={props.placeholder}
        value={props.defaultValue}
        disabled={props.disabled}
      />
      <div className="invalid-feedback">{props.fieldName} is required</div>
    </>
  );
}
