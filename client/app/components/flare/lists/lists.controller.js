class ListsController {
  constructor() {
    this.name = 'lists';

    this.organizations = this.getOrgs();
    $(document).ready(function() {
        $('#orglisttable').DataTable();
    } );
  }

  // TODO: Get from API
  getOrgs = () => {

    let orgs = [
      {
        _id: 1,
        name: "u",
        description: "none of u bidness"
      },
      {
        _id: 2,
        name: "me",
        description: "likes puppies"
      }
    ];
    return orgs;
  }
}

export default ListsController;
