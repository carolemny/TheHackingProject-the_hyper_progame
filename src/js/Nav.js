const Nav = () => {
  return `
  <nav>
    <div class="row">
      <div class="col-lg-8">
        <h1>The Hyper Progame</h1>
      </div>
      <div class="col-lg-4" id="searchbar">
        <input type="text" id="input-search" value="" placeholder="Find a game..." class="form-control">
      </div>
    </div>
  </nav>
  `;
};

export { Nav };
