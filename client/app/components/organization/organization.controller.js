import $ from 'jquery';

class OrganizationController {

  constructor() {
    this.name = 'organization';

    this.orgs = this.getOrgs();
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

  createOrg = () => {

    // TODO: Go to API

    this.orgs.push({
      _id: 3,
      name: "new org",
      description: "this is the only new org you will ever create"
    })

    $('#orglisttable').DataTable();
  }

/*
        let createOrg = function() {
          Org.save(neworg).$promise.then(function(neworg){
            getOrgs();
          })
        };
        */
}

export default OrganizationController;
