import { AlertProps } from "../Interfaces/Interfaces";
import "./Alert.scss";

export default function Alert(props: AlertProps) {
  return (
    <div className="alert alert-purple mt-2 text-center" role="alert">
      {props.message}
    </div>
  );
}
