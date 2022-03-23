import LoadingOverlay from "react-loading-overlay-ts";
import HashLoader from "react-spinners/HashLoader";

export default function Loader(props: any) {
  return (
    <LoadingOverlay
      active={props.active}
      spinner={<HashLoader color={"#7A6AF6"} size={150} />}
    >
      {props.children}
    </LoadingOverlay>
  );
}
