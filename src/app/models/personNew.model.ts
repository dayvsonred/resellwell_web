export class PersonNew { 
    id: string;
    name: string;
    phone: string;
    email: string;

    constructor( 
        id: string,
        name: string,
        phone: string,
        email: string
    ) { 
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
  }
