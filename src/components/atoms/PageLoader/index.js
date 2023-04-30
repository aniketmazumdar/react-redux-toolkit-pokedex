import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";

export const PageLoader = (props) => {
  const { color, text } = props;

  return (
    <div className="page-loader">
      <span>{text}</span>
      <CircularProgress color={color} />
    </div>
  );
};
