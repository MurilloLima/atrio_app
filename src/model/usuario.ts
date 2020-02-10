export class Usuario{

  id: number;
  name: String;
  email: String;
  image: String = null;
  image_extension: String;
  tenant_id: number;
  academic_resp: any;
  token: any = {  access_token: null,
            expires_at: null
        };
  roles : Array<any> = [];
  tenant: any = {};
  permissions: Array<any>=[];
  /*roles=[
        {
            id: null,
            name: null,
            role: null,
            created_at: null,
            updated_at: null,
            pivot: {
                user_id: null,
                role_id: null
              }
        }]
    ;
    tenant: {
        id: number,
        name: String,
        registernumber: number,
        email: String,
        logo: String,
        tutor_default: number,
        theme_default: number,
        uuid: String,
        created_at: any,
        updated_at: any
    };*/

}
