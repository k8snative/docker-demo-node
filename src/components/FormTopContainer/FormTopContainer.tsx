import styles from "./FormTopContainer.module.scss";
import { Form } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const FormTopContainer = ({
  isSignIn,
  setSignIn,
  topRedTxtConditional,
  topTxt,
  setError,
  isTermChecked,
}: {
  isSignIn: Boolean;
  setSignIn: Function;
  topRedTxtConditional: Boolean;
  topTxt: String;
  setError: Function;
  isTermChecked: Function;
}) => {
  const isMobile = useMediaQuery({
    query: "(min-width: 768px)",
  });
  return (
    <div
      // style={{ border: '5px solid yellow' }}
      className={`w-100 d-flex align-items-center justify-content ${styles["formTopContainer"]}`}
    >
      <Form
      // style={{ border: '2px solid black' }}
      >
        {isMobile ? (
          <Form.Check
            onClick={() => {
              setSignIn(!isSignIn);
              if (setError) setError({});
              // isTermChecked(false)
            }}
            checked={isSignIn as boolean}
            className={styles["formstyles"]}
            // style={{ border: '2px solid red', color: 'green' }}
            type="switch"
            id="custom-switch"
          />
        ) : (
          <label className="switch" style={isMobile ? { width: "2rem" } : {}}>
            <input
              type="checkbox"
              id="custom-switch"
              onClick={() => {
                setSignIn(!isSignIn);
                if (setError) setError({});
                // isTermChecked(false)
              }}
              checked={isSignIn as boolean}
            />
            <span className="slider round"></span>
          </label>
        )}
      </Form>
      <p className={styles["topTxt"]}>
        {topTxt}
        {topRedTxtConditional && (
          <span
            onClick={() => setSignIn(!isSignIn)}
            className={styles["topTxtRed"]}
          >
            {isSignIn ? "Sign in" : "Sign up"}
            {"!"}
          </span>
        )}
      </p>
    </div>
  );
};

export default FormTopContainer;
