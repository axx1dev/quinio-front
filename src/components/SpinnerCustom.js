import { Spinner, Button } from "react-bootstrap";

const SpinnerCustom = () => {
  return (
    <div>
      <Button variant="dark" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </div>
  );
};

export default SpinnerCustom;
