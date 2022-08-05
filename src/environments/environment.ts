// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrlGateWay : "http://localhost:8765",
  baseUrlBFF : "/api/resell-bff",
  baseUrlOauth : "/resell-oauth",
  oauth_token : "/oauth/token",
  PERSON_customer_list : "/customer/list",
  person : {
    path: "/resell-person",
    customer:
    { 
     list : "/customer/list",
     add : "/customer/insert",
     dell : "/customer/deleting/",
    }
  }


};
