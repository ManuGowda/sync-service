declare module "globals" {

  export interface Message {
    app_name: string;
    app_version: string;
    tab_id: string;
    session_id: string;
    user_id: number | string;
    client_time: string | number;
    ip_addr: string;
    type: string;
  }
  
  export interface Config {
    name: string;
    port: number;
    env: string;
    version: string;
  }
}