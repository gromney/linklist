export const environment = {
  production: true, 
  apiUrl: 'https://link-list-api.azurewebsites.net/api',
  auth0:{
    domain:'gromney-test.us.auth0.com',
    clientId:'f9jDxIZEIeUavGcGGbDvf00LO1MVva31',
    audience: 'https://link-list.api/',
    redirectUri: window.location.origin
  }
};
