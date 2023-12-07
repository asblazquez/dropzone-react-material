//import { useTranslation } from "react-i18next";
import DropFileInput from "./dropzone/DropFileInput";

export default function App(props){
  const { onFileChange, limit, accept, languaje } = props;
  return (
    <DropFileInput
    onFileChange={onFileChange}
    limit={limit}
    accept={accept}
    />
  )
}