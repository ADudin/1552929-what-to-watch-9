function NotFoundComponent(): JSX.Element {
  return (
    <section className="catalog">
      <h1 className="catalog__title">404. Page not found</h1>
      <div className="catalog__button">
        <a href="/">Go to main page</a>
      </div>
    </section>
  );
}

export default NotFoundComponent;
