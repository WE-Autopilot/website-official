import { notFoundPage } from "../content/pages";
import { Button, Doodle, MarkedText, Note } from "../components/design-system";
import { usePageMeta } from "../hooks/usePageMeta";
import "./NotFound.css";

export function NotFound() {
  usePageMeta(notFoundPage.title);
  return (
    <div className="page container not-found">
      <Doodle name="wheel" size={120} className="not-found__doodle" />
      <h1>
        <MarkedText text={notFoundPage.title} />
      </h1>
      <Note arrow="left">{notFoundPage.note}</Note>
      <p className="lead">{notFoundPage.body}</p>
      <Button to="/" size="lg" arrow>
        {notFoundPage.homeButton}
      </Button>
    </div>
  );
}

export default NotFound;
