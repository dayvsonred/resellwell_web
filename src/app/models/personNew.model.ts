export class PersonNew { 
    id: string;
    name: string;
    phone: string;
    email: string;
    person: any;

    constructor( 
        id: string,
        name: string,
        phone: string,
        email: string,
        person: any
    ) { 
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.person = person;
    }
  }
